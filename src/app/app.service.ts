import {ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, OnDestroy, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from './app.state';
import {APP_SERVER_DOWN_FOR_MAINTENANCE, APP_SIGN_OUT, M2Service} from './m2-angular/services/m2.service';
import {SignInDialogComponent} from './dialogs/sign-in/sign-in-dialog.component';
import {SendTokensDialogComponent} from './dialogs/send-tokens/send-tokens-dialog.component';
import {TransactionDialogComponent} from './dialogs/transaction/transaction-dialog.component';
import {Transaction} from './store/states/transaction';
import {Observable} from 'rxjs';
import {Config} from './store/states/config';
import * as keccak from 'keccak';
import * as secp256k1 from 'secp256k1';
import {ConfigAction} from './store/reducers/config.reducer';
import {Account} from './store/states/account';
import {HttpClient} from '@angular/common/http';
import {M2Action} from './m2-angular/store/reducers/m2.reducer';
import {environment} from '../environments/environment';
import {Node} from './store/states/node';
import {TransactionType} from './store/states/transaction-type';


declare const Buffer;
declare const BrowserSolc: any;

/**
 * Events
 */
export const APP_PRE_QUALIFY_NEXT_STEP = 'APP_PRE_QUALIFY_NEXT_STEP';

/**
 *
 */
@Injectable()
export class AppService extends M2Service implements OnDestroy {

    /**
     * Class level-declarations.
     */
    private mdDialogRef: any;
    private appEventSubscription: any;
    public configState: Observable<Config>;
    public config: Config;
    public configSubscription: any;

    /**
     *
     * @param appConfig
     * @param {Title} title
     * @param {Meta} meta
     * @param {Router} router
     * @param {HttpClient} httpClient
     * @param {DomSanitizer} domSanitizer
     * @param {MatDialog} mdDialog
     * @param {MatSnackBar} mdSnackBar
     * @param {Store<AppState>} store
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {ApplicationRef} applicationRef
     * @param {Injector} injector
     * @param platformId
     * @param {ActivatedRoute} activatedRoute
     */
    constructor(@Inject('AppConfig') protected appConfig: any, protected title: Title, protected meta: Meta, protected router: Router, protected httpClient: HttpClient, protected domSanitizer: DomSanitizer, protected mdDialog: MatDialog, protected mdSnackBar: MatSnackBar, protected store: Store<AppState>, protected componentFactoryResolver: ComponentFactoryResolver, protected applicationRef: ApplicationRef, protected injector: Injector, @Inject(PLATFORM_ID) protected platformId: any, protected activatedRoute: ActivatedRoute) {
        super(appConfig, title, meta, router, httpClient, domSanitizer, mdDialog, mdSnackBar, store, componentFactoryResolver, applicationRef, injector, platformId, activatedRoute);
        this.appEventSubscription = this.appEvents.subscribe((data: any) => {
            if (!data || !data.type) {
                return;
            }
            switch (data.type) {
                case APP_SIGN_OUT:
                    if (this.mdDialogRef) {
                        this.mdDialogRef.close();
                    }
                    this.navigateToHome();
                    break;
                case APP_SERVER_DOWN_FOR_MAINTENANCE:
                    if (this.mdDialogRef) {
                        this.mdDialogRef.close();
                    }
                    this.navigateToHome();
                    // this.error(environment.m2AppName + ' server is down for maintenance. Please try again later.');
                    break;
            }
        });
        this.configState = this.store.select('config');
        this.configSubscription = this.configState.subscribe((config: Config) => {
            this.config = config;
        });
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
    public navigateToHome() {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        this.router.navigate(['/']);
    }

    /**
     *
     */
    public navigateToSmartContract(): void {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        this.router.navigate(['/smart-contract']);
    }

    /**
     *
     */
    public navigateToMeta() {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        this.router.navigate(['/meta']);
    }

    /**
     *
     */
    public navigatetoBlog() {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        this.router.navigate(['/blog']);
    }

    /**
     *
     */
    public closeCurrentDialog(): void {
        if (this.mdDialogRef) {
            this.mdDialogRef.close();
        }
    }

    /**
     *
     * @returns {any}
     */
    public openSignIn(): any {
        return this.mdDialogRef = this.mdDialog.open(SignInDialogComponent, {
            disableClose: false,
            width: '600px',
            height: '',
            position: {
                top: '16px',
                bottom: '',
                left: '',
                right: ''
            },
            data: {}
        });
    }

    /**
     *
     * @returns {MatDialogRef<SendTokensDialogComponent>}
     */
    public openSendTokens(): any {
        return this.mdDialogRef = this.mdDialog.open(SendTokensDialogComponent, {
            width: '600px',
            height: '',
            position: {
                top: '16px',
                bottom: '',
                left: '',
                right: ''
            },
        });


        // BrowserSolc.getVersions(function(soljsonSources, soljsonReleases) {
        //     console.log(soljsonSources);
        //     console.log(soljsonReleases);
        // });

        // BrowserSolc.loadVersion('soljson-v0.4.6+commit.2dabbdf0.js', function (compiler) {
        //     const source = 'contract x { function g() {} }';
        //
        //     console.log(source);
        //     const optimize = 1;
        //     const result = compiler.compile(source, optimize);
        //
        //     console.log(result);
        // });
    }

    /**
     *
     * @param {Transaction} transaction
     * @returns {any}
     */
    public openTransaction(transaction: Transaction): any {
        return this.mdDialogRef = this.mdDialog.open(TransactionDialogComponent, {
            width: '600px',
            height: '',
            position: {
                top: '16px',
                bottom: '',
                left: '',
                right: ''
            },
            data: {
                transaction: transaction
            }
        });
    }

    /**
     *
     */
    public generateNewAccount(): void {
        const privateKey = new Buffer(32);
        do {
            crypto.getRandomValues(privateKey);
        } while (!secp256k1.privateKeyVerify(privateKey));
        const publicKey = secp256k1.publicKeyCreate(privateKey, false);

        const account: Account = {
            address: Buffer.from(this.toAddress(publicKey)).toString('hex'),
            privateKey: Buffer.from(privateKey).toString('hex'),
            balance: 0,
            name: 'New Wallet'
        };
        this.config.account = account;
        this.store.dispatch(new ConfigAction(ConfigAction.CONFIG_UPDATE, this.config));
    }

    /**
     *
     * @param publicKey
     * @returns {any}
     */
    public toAddress(publicKey: any): any {

        // Hash publicKey.
        const hashablePublicKey = new Buffer(publicKey.length - 1);
        for (let i = 0; i < hashablePublicKey.length; i++) {
            hashablePublicKey[i] = publicKey[i + 1];
        }
        const hash = keccak('keccak256').update(hashablePublicKey).digest();

        // Create address.
        const address = new Buffer(20);
        for (let i = 0; i < address.length; i++) {
            address[i] = hash[i + 12];
        }
        return address;
    }

    /**
     *
     * @param {string} privateKey
     * @param {Transaction} transaction
     */
    public hashAndSign(privateKey: string, transaction: Transaction): void {

        // Set time.
        transaction.time = new Date().getTime();

        // Create hash.
        let hash: any;
        const type = this.numberToBuffer(0);
        const from = Buffer.from(transaction.from, 'hex');
        const to = Buffer.from(transaction.to, 'hex');
        const value = this.numberToBuffer(transaction.value);
        const time = this.numberToBuffer(transaction.time);

        // Type?
        switch (transaction.type) {
            case TransactionType.TransferTokens:
                hash = keccak('keccak256').update(Buffer.concat([type, from, to, value, time])).digest();
                break;
            case TransactionType.DeploySmartContract:
                break;
            case TransactionType.ExecuteSmartContract:
                break;
        }



        const abi = this.stringToBuffer(transaction.abi);
        const method = this.stringToBuffer(transaction.method);



        // TODO: params.
        //const hash = keccak('keccak256').update(Buffer.concat([type, from, to, value, code, abi, method, time])).digest();
        const signature = secp256k1.sign(hash, Buffer.from(privateKey, 'hex'));

        transaction.hash = hash.toString('hex');
        transaction.signature = new Buffer(signature.signature).toString('hex') + '00';
    }

    /**
     *
     * @param {string} value
     * @returns {any}
     */
    private stringToBuffer(value: string): any {
        const bytes = [];
        for (let i = 0; i < value.length; i++) {
            bytes.push(value.charCodeAt(i));
        }
        return new Buffer(bytes);
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
     * @returns {any}
     */
    public getTransactions(): any {
        const url = 'http://' + this.config.selectedDelegate.endpoint.host + ':' + this.config.selectedDelegate.endpoint.port + '/v1/transactions';
        return this.httpClient.get(url, {headers: {'Content-Type': 'application/json'}});
    }
}

