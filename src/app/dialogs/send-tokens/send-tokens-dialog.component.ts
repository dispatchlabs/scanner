import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppService} from '../../app.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../store/states/config';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {APP_REFRESH} from '../../app.component';
import * as keccak from 'keccak';
import {M2Util} from '../../m2-angular/utils/m2-util';
import * as secp256k1 from 'secp256k1';
import {Transaction} from '../../store/states/transaction';

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
    private actionId: any;

    /**
     *
     * @param appService
     * @param {MatDialogRef<SendTokensDialogComponent>} mdDialogRef
     * @param {FormBuilder} formBuilder
     * @param {Http} http
     * @param {Store<AppState>} store
     */
    constructor(@Inject('AppService') public appService: any, private mdDialogRef: MatDialogRef<SendTokensDialogComponent>, private formBuilder: FormBuilder, private store: Store<AppState>) {
        this.formGroup = formBuilder.group({
            privateKey: new FormControl('e7181240095e27679bf38e8ad77d37bedb5865b569157b4c14cdb1bebb7c6e2b', Validators.compose([Validators.required, Validators.minLength(64)])),
            address: new FormControl('79db55dd1c8ae495c267bde617f7a9e5d5c67719', Validators.compose([Validators.required, Validators.minLength(40)])),
            to: new FormControl('43f603c04610c87326e88fcd24152406d23da032', Validators.compose([Validators.required, Validators.minLength(40)])),
            tokens: new FormControl(45, Validators.compose([Validators.required, Validators.min(1)])),
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
        /*
        this.appService.confirm('<p>Are you sure you want to send <b>' + this.formGroup.get('tokens').value + '</b> tokens to:</p> ' + this.formGroup.get('to').value + '?', () => {
            const privateKey = this.formGroup.get('privateKey').value;
            const date = new Date();
            const type = this.numberToBuffer(0);
            const from = Buffer.from(this.formGroup.get('address').value, 'hex');
            const to = Buffer.from(this.formGroup.get('to').value, 'hex');
            const tokens = this.numberToBuffer(parseInt(this.formGroup.get('tokens').value, 10));
            const time = this.numberToBuffer(date.getTime());
            const hash = keccak('keccak256').update(Buffer.concat([type, from, to, tokens, time])).digest();
            const signature = secp256k1.sign(hash, Buffer.from(privateKey, 'hex'));
            const transaction = {
                hash: hash.toString('hex'),
                type: 0,
                from: from.toString('hex'),
                to: to.toString('hex'),
                value: parseInt(this.formGroup.get('tokens').value, 10),
                time: date.getTime(),
                signature: new Buffer(signature.signature).toString('hex') + '00',
            };

            this.spinner = true;
            const send = this.post('http://' + this.config.delegates[0].endpoint.host + ':1975/v1/transactions', transaction).subscribe(response => {
                this.actionId = response.id;
                this.getStatus();
            });
        });
        */
    }

    /**
     *
     */
    private getStatus(): void {
        /*
        setTimeout(() => {
            const send = this.get('http://' + this.config.delegates[0].endpoint.host + ':1975/v1/actions/' + this.actionId).subscribe(response => {


                if (response.data.status === 'PENDING') {
                    this.getStatus();
                    return;
                }

                if (response.data.status === 'OK') {
                    this.close();
                    this.appService.success('Tokens sent.');
                    this.appService.appEvents.emit({type: APP_REFRESH});
                }else {
                    this.close();
                    this.appService.error(response.data.status);
                }
            });
        }, 500);
        */
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
     */
    public generatePrivateKeyAndAddress(): void {

    }

    /**
     *
     * @param {string} url
     * @param json
     * @returns {Observable<any>}
     */
    public post(url: string, json: any): any {

    }

    /**
     *
     * @param {string} url
     * @returns {Observable<any>}
     */
    public get(url: string): any {
    }
}
