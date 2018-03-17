import {Component, OnInit, AfterViewInit, OnDestroy, Inject, ViewChild} from '@angular/core';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Rx';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Config} from '../../store/states/config';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {Transaction} from '../../store/states/transaction';
import {APP_REFRESH} from '../../app.component';

/**
 *
 */
class Delegate {
    public ip;
    public transactions: Transaction [];
    public balance: number;
}

/**
 * HomePageComponent
 */
@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class Level Declarations
     */
    @ViewChild('getStartedDiv')
    public getStartedDiv: any;
    public loading = true;
    public configState: Observable<Config>;
    public config: Config;
    public configSubscription: any;
    public delegates = [];
    private appEventSubscription: any;

    /**
     *
     * @param appService
     * @param {Router} router
     * @param {Http} http
     * @param {Store<AppState>} store
     */
    constructor(@Inject('AppService') public appService: any, private router: Router, private http: Http, private store: Store<AppState>) {
        this.configState = this.store.select('config');
        this.configSubscription = this.configState.subscribe((config: Config) => {
            this.config = config;
        });
        for (let i = 0; i < 4; i++) {
            this.delegates.push(new Delegate());
        }
        this.appEventSubscription = this.appService.appEvents.subscribe((event: any) => {
            switch (event.type) {
                case APP_REFRESH:
                    this.refresh();
                    return;
            }
        });
    }

    /**
     *
     */
    ngOnInit() {
        this.refresh();
    }

    /**
     *
     */
    ngAfterViewInit() {
    }

    /**
     *
     */
    ngOnDestroy() {
        this.configSubscription.unsubscribe();
        this.appEventSubscription.unsubscribe();
    }

    /**
     *
     */
    public refresh(): void {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 1000 * 5);
        for (let i = 0; i < 4; i++) {
            this.delegates[i].ip = this.config.delegateIps[i];
            const getBalance = (index) => {
                this.get('http://' + this.config.delegateIps[index] + ':1975/v1/balance/' + this.config.address).subscribe(response => {
                    this.delegates[index].balance = response.balance;
                });

            };
            getBalance(i);

            const getTransactions = (index) => {
                this.get('http://' + this.config.delegateIps[index] + ':1975/v1/transactions/' + this.config.address).subscribe(response => {
                    this.delegates[index].transactions = response.transactions;
                });
            };
            getTransactions(i);
        }
    }

    /**
     *
     */
    public scrollDown() {
        this.getStartedDiv.nativeElement.scrollIntoView({block: 'start', behavior: 'smooth'});
    }


    /**
     *
     * @param {string} url
     * @returns {Observable<any>}
     */
    public get(url: string): any {
        const headers = new Headers({'Content-Type': 'application/json'});
        const requestOptions = new RequestOptions({headers: headers});

        // Post.
        return this.http.get(url, requestOptions).map(response => response.json()).do(response => {
        }).catch(e => {
            this.loading = false;
            if (e.status === 0) {
                this.appService.error('Dispatch node is currently down for maintenance.');
            } else {
                const response = e.json();
                return new Observable(observer => {
                    observer.next(response);
                    observer.complete();
                });
            }
        });
    }
}
