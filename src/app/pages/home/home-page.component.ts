import {Component, OnInit, AfterViewInit, OnDestroy, Inject, ViewChild, ElementRef} from "@angular/core";
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
import {Meta} from '../../m2-angular/store/states/meta';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';

/**
 *
 */
class Delegate {
    public ip;
    public transactions: Transaction [];
    public balance: number;
}

/**
 *
 */
class MetaDatabase {

    public metaBehaviorSubject: BehaviorSubject<Meta[]> = new BehaviorSubject<Meta[]>([]);

    get data(): Meta[] {
        return this.metaBehaviorSubject.value;
    }

    /**
     *
     * @param {Meta[]} metas
     */
    constructor(metas: Meta[]) {
        this.metaBehaviorSubject.next(metas);
    }
}

/**
 *
 */
class MetaDataSource extends DataSource<any> {
    filterBehaviorSubject = new BehaviorSubject('');

    get filter(): string {
        return this.filterBehaviorSubject.value;
    }

    set filter(filter: string) {
        this.filterBehaviorSubject.next(filter);
    }

    constructor(private _exampleDatabase: MetaDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Meta[]> {
        const displayDataChanges = [
            this._exampleDatabase.metaBehaviorSubject,
            this.filterBehaviorSubject,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this._exampleDatabase.data.slice().filter((meta: Meta) => {
                const searchString = meta.url.toLowerCase();
                return searchString.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() {
    }
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
    displayedColumns = ['url', 'name', 'content'];
    dataSource: MetaDataSource | null;
    @ViewChild('filter') filter: ElementRef;
    private contentHandle: any;
    private metas: Meta[];
    public page = 0;
    public perPage = 10;
    public count = 0;

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
        this.find();
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
    public find(): void {
        this.appService.post('m2.action.meta.FindStaticByAppAction', {page: this.page, perPage: this.perPage}).subscribe(response => {
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.count = response.count;
                this.metas = response.metas;
                this.dataSource = new MetaDataSource(new MetaDatabase(response.metas));
                Observable.fromEvent(this.filter.nativeElement, 'keyup')
                    .debounceTime(150)
                    .distinctUntilChanged()
                    .subscribe(() => {
                        if (!this.dataSource) {
                            return;
                        }
                        this.dataSource.filter = this.filter.nativeElement.value;
                    });
            }
        });
    }

    /**
     *
     */
    public onPageIndexChange(event: any): void {
        this.page = event.pageIndex;
        this.perPage = event.pageSize;
        this.find();
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
