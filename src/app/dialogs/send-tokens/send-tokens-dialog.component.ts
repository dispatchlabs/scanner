import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppService} from '../../app.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../store/states/config';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {APP_REFRESH} from '../../app.component';

declare const Buffer

@Component({
    selector: 'app-send-tokens-dialog',
    templateUrl: './send-tokens-dialog.component.html',
    styleUrls: ['./send-tokens-dialog.component.scss']
})
export class SendTokensDialogComponent implements OnInit, OnDestroy {

    /**
     * Class Level Declarations
     */
    public formGroup: FormGroup;
    public spinner = false;
    public configState: Observable<Config>;
    public config: Config;
    public configSubscription: any;

    /**
     *
     * @param appService
     * @param {MatDialogRef<SendTokensDialogComponent>} mdDialogRef
     * @param {FormBuilder} formBuilder
     * @param {Http} http
     * @param {Store<AppState>} store
     */
    constructor(@Inject('AppService') public appService: any, private mdDialogRef: MatDialogRef<SendTokensDialogComponent>, private formBuilder: FormBuilder, private http: Http, private store: Store<AppState>) {
        this.formGroup = formBuilder.group({
            to: new FormControl('', Validators.compose([Validators.required, Validators.minLength(40)])),
            tokens: new FormControl(0, Validators.compose([Validators.required, Validators.min(1)])),
        });
        this.configState = this.store.select('config');
        this.configSubscription = this.configState.subscribe((config: Config) => {
            this.config = config;
            this.formGroup.get('privateKey').setValue(this.config.privateKey);
            this.formGroup.get('address').setValue(this.config.address);
        });
    }

    /**
     *
     */
    ngOnInit() {
    }

    /**
     *
     */
    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    /**
     *
     */
    public close(): void {
        this.mdDialogRef.close();
    }

    /**
     *
     */
    public send(): void {
        this.appService.confirm('Are you sure you want to send ' + this.formGroup.get('numberOfTokens').value + ' tokens to ' + this.formGroup.get('recipientAddress').value + '?', () => {
            const json = {
                privateKey: this.config.privateKey,
                from: this.config.address,
                to: this.formGroup.get('to').value,
                value: parseInt(this.formGroup.get('tokens').value, 10),
            }
            this.spinner = true;
            this.post(this.config.delegateIps[0] + '/v1/test_transaction', json).subscribe( () => {
                this.close();
                this.appService.appEvents.emit({type: APP_REFRESH});
            });
        });
    }

    /**
     *
     * @param {string} url
     * @param json
     * @returns {Observable<any>}
     */
    public post(url: string, json: any) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const requestOptions = new RequestOptions({headers: headers});

        // Post.
        return this.http.post(url, JSON.stringify(json), requestOptions).map(response => response.json()).do(response => {
        }).catch(e => {
            this.spinner = false;
            if (e.status === 0) {
                this.spinner = false;
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
