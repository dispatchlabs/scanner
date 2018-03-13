import {ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, OnDestroy, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from './app.state';
import {APP_SERVER_DOWN_FOR_MAINTENANCE, APP_SIGN_OUT, M2Service} from './m2-angular/services/m2.service';
import {SignInDialogComponent} from './dialogs/sign-in/sign-in-dialog.component';
import {routes} from './app.module';
import {environment} from '../environments/environment';
import {WalletDialogComponent} from './dialogs/wallet/wallet-dialog.component';

/**
 * Events
 */
export const APP_PRE_QUALIFY_NEXT_STEP = 'APP_PRE_QUALIFY_NEXT_STEP';

/**
 *
 */
@Injectable()
export class AppService extends M2Service {

    /**
     * Class level-declarations.
     */
    private mdDialogRef: any;
    private appEventSubscription: any;

    /**
     *
     * @param appConfig
     * @param {Title} title
     * @param {Meta} meta
     * @param {Router} router
     * @param {Http} http
     * @param {DomSanitizer} domSanitizer
     * @param {MatDialog} mdDialog
     * @param {MatSnackBar} mdSnackBar
     * @param {Store<AppState>} store
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {ApplicationRef} applicationRef
     * @param {Injector} injector
     * @param platformId
     */
    constructor(@Inject('AppConfig') protected appConfig: any, protected title: Title, protected meta: Meta, protected router: Router, protected http: Http, protected domSanitizer: DomSanitizer, protected mdDialog: MatDialog, protected mdSnackBar: MatSnackBar, protected store: Store<AppState>, protected componentFactoryResolver: ComponentFactoryResolver, protected applicationRef: ApplicationRef, protected injector: Injector, @Inject(PLATFORM_ID) protected platformId: any) {
        super(appConfig, title, meta, router, http, domSanitizer, mdDialog, mdSnackBar, store, componentFactoryResolver, applicationRef, injector, platformId);
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
        this.createMetas(routes);
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
     * @returns {MatDialogRef<WalletDialogComponent>}
     */
    public openWallet() {
        return this.mdDialogRef = this.mdDialog.open(WalletDialogComponent, {
            width: '600px',
            height: '',
            position: {
                top: '16px',
                bottom: '',
                left: '',
                right: ''
            },
        });
    }
}

