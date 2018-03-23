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
import * as keccak from 'keccak';
import {M2Util} from '../../m2-angular/utils/m2-util';
import * as secp256k1 from 'secp256k1';
import {Transaction} from '../../store/states/transaction';
import * as moment from 'moment/moment';
declare const Buffer;

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
        if (M2Util.isNullOrEmpty(this.config.privateKey) || M2Util.isNullOrEmpty(this.config.address)) {
            this.appService.error('Please generate a wallet before sending tokens.');
            return;
        }

        this.appService.confirm('<p>Are you sure you want to send <b>' + this.formGroup.get('tokens').value + '</b> tokens to:</p> ' + this.formGroup.get('to').value + '?', () => {
            const date = new Date();
            const type = this.numberToBuffer(0);
            const from = Buffer.from(this.config.address, 'hex');
            const to = Buffer.from(this.formGroup.get('to').value, 'hex');
            const tokens = this.numberToBuffer(parseInt(this.formGroup.get('tokens').value, 10));
            const time = this.numberToBuffer(date.getTime());
            const hash = keccak('keccak256').update(Buffer.concat([type, from, to, tokens, time])).digest();
            const signature = secp256k1.sign(hash, Buffer.from(this.config.privateKey, 'hex'));
            const transaction: Transaction = {
                hash: hash.toString('hex'),
                type: 0,
                from: from.toString('hex'),
                to: to.toString('hex'),
                value: parseInt(this.formGroup.get('tokens').value, 10),
                time: date.getTime(),
                signature: new Buffer(signature.signature).toString('hex') + '00',
            };
            this.spinner = true;
            this.post('http://' + this.config.delegateIps[0] + ':1975/v1/transactions', transaction).subscribe(() => {
                this.close();
                this.appService.appEvents.emit({type: APP_REFRESH});
            });
        });
    }

    /**
     *
     * @param {number} value
     * @returns {any}
     */
    private numberToBuffer(value: number): any {
        const bytes = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < bytes.length; i++) {
            const byte = value & 0xff;
            bytes [i] = byte;
            value = (value - byte) / 256;
        }
        return new Buffer(bytes);
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

        console.log(url)

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
