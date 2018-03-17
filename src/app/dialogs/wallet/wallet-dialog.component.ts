import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppService} from '../../app.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as secp256k1 from 'secp256k1';
import * as keccak from 'keccak';
import {Observable} from 'rxjs/Rx';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Config} from '../../store/states/config';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {ConfigAction} from '../../store/reducers/config.reducer';

declare const Buffer;

@Component({
    selector: 'app-wallet-dialog',
    templateUrl: './wallet-dialog.component.html',
    styleUrls: ['./wallet-dialog.component.scss']
})
export class WalletDialogComponent implements OnInit, OnDestroy {

    /**
     * Class Level Declarations
     */
    public formGroup: FormGroup;
    public spinner = false;
    public loading = false;
    public balance = 0;
    public configState: Observable<Config>;
    public config: Config;
    public configSubscription: any;

    /**
     *
     * @param appService
     * @param {MatDialogRef<WalletDialogComponent>} mdDialogRef
     * @param {FormBuilder} formBuilder
     * @param {Http} http
     * @param {Store<AppState>} store
     */
    constructor(@Inject('AppService') public appService: any, private mdDialogRef: MatDialogRef<WalletDialogComponent>, private formBuilder: FormBuilder, private http: Http, private store: Store<AppState>) {
        this.formGroup = formBuilder.group({
            privateKey: new FormControl('', Validators.compose([Validators.required, Validators.minLength(64)])),
            address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(40)])),
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
    public generateWallet(): void {
        const privateKey = new Buffer(32);
        do {
            crypto.getRandomValues(privateKey);
        } while (!secp256k1.privateKeyVerify(privateKey));
        const publicKey = secp256k1.publicKeyCreate(privateKey);
        const address = new Buffer(20);
        for (let i = 0; i < address.length; i++) {
            address[i] = publicKey[i + 12];
        }
        this.balance = 0;
        this.formGroup.get('privateKey').setValue(Buffer.from(privateKey).toString('hex'));
        this.formGroup.get('address').setValue(Buffer.from(address).toString('hex'));
        this.config.privateKey = this.formGroup.get('privateKey').value;
        this.config.address = this.formGroup.get('address').value;
        this.store.dispatch(new ConfigAction(ConfigAction.CONFIG_UPDATE, this.config));
    }
}
