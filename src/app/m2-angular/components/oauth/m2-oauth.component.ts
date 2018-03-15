import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter, forwardRef, Inject, OnDestroy} from '@angular/core';
import {OAuthVendor, OAuth} from '../../store/states/oauth';
import {M2Service} from '../../services/m2.service';

/**
 * M2OAuthComponent
 */
@Component({
    selector: 'm2-oauth',
    templateUrl: './m2-oauth.component.html',
    styleUrls: ['./m2-oauth.component.scss'],
})
export class M2OAuthComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
            // TODO: Change any to OAuth for warning messages
    @Input()
    public twitterOAuth: any;
    @Input()
    public facebookOAuth: any;
    @Input()
    public pinterestOAuth: any;
    @Input()
    public squareOAuth: any;
    @Input()
    public wordpressOAuth: any;
    @Input()
    public mediumOAuth: any;
    @Input()
    public linkedInOAuth: any;
    @Input()
    public googleOAuth: any;
    @Input()
    public vendors: number[];
    @Input()
    public color = '#E24301';
    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();
    public window: any;
    public twitterSpinner = false;
    public facebookSpinner = false;
    public pinterestSpinner = false;
    public squareSpinner = false;
    public wordpressSpinner = false;
    public mediumSpinner = false;
    public linkedInSpinner = false;
    public googleSpinner = false;
    public connectingOAuth: OAuth;

    /**
     *
     * @param appConfig
     * @param appService
     */
    constructor(@Inject('AppConfig') private appConfig: any, @Inject('AppService') public appService: any) {
    }

    /**
     *
     */
    ngOnInit() {
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
    }

    /**
     *
     * @returns {boolean}
     */
    public isIncluded(vendor: number): boolean {

        if (!this.vendors) {
            return false;
        }

        for (const _vendor of this.vendors) {
            if (vendor === _vendor) {
                return true;
            }
        }

        return false;
    }

    /**
     *
     * @param vendor
     * @returns {any}
     */
    public isConnected(vendor: number): string {

        let oauth: OAuth;

        // Vendor?
        switch (vendor) {
            case OAuthVendor.Twitter:
                oauth = this.twitterOAuth;
                break;
            case OAuthVendor.Facebook:
                oauth = this.facebookOAuth;
                break;
            case OAuthVendor.Pinterest:
                oauth = this.pinterestOAuth;
                break;
            case OAuthVendor.Square:
                oauth = this.squareOAuth;
                break;
            case OAuthVendor.Wordpress:
                oauth = this.wordpressOAuth;
                break;
            case OAuthVendor.Medium:
                oauth = this.mediumOAuth;
                break;
            case OAuthVendor.LinkedIn:
                oauth = this.linkedInOAuth;
                break;
            case OAuthVendor.Google:
                oauth = this.googleOAuth;
                break;
        }
        if (oauth && oauth.accessToken) {
            return 'completed';
        }

        return '';
    }

    /**
     *
     */
    public close(): void {
        if (!this.window) {
            return;
        }
        this.window.close();
        this.window = null;
    }

    /**
     *
     * @param vendor
     */
    public connectOrDisconnect(vendor: number): void {

        const connectingUrl = this.appService.getUrl(this.appConfig.m2Url) + '/Splash?appId=' + this.appConfig.m2AppId + '&message=' + encodeURIComponent('Connecting to ' + this.appService.getOAuthVendor(vendor) + '...');
        let windowOptions: string;

        // Vendor?
        switch (vendor) {
            case OAuthVendor.Twitter:
                if (this.twitterOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from Twitter?', () => {
                        this.delete(this.twitterOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 450);
                break;
            case OAuthVendor.Facebook:
                if (this.facebookOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from Facebook?', () => {
                        this.delete(this.facebookOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 450);
                break;
            case OAuthVendor.Pinterest:
                if (this.pinterestOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from Pinterest?', () => {
                        this.delete(this.pinterestOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 700);
                break;
            case OAuthVendor.Square:
                if (this.twitterOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from Square?', () => {
                        this.delete(this.squareOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 450);
                break;
            case OAuthVendor.Wordpress:
                if (this.wordpressOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from Wordpress?', () => {
                        this.delete(this.wordpressOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 750);
                break;
            case OAuthVendor.Medium:
                if (this.mediumOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from Medium?', () => {
                        this.delete(this.mediumOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 450);
                break;
            case OAuthVendor.LinkedIn:
                if (this.linkedInOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from LinkedIn?', () => {
                        this.delete(this.linkedInOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 650);
                break;
            case OAuthVendor.Google:
                if (this.googleOAuth) {
                    this.appService.confirm('Are you sure you want to disconnect from Google?', () => {
                        this.delete(this.googleOAuth);
                    });
                    return;
                }
                windowOptions = this.getWindowOptions(450, 650);
                break;
        }
        if (typeof window !== 'undefined') {
            this.window = window.open(connectingUrl, this.appService.getOAuthVendor(vendor), windowOptions);
        }

        // Get authorizationUrl.
        setTimeout(() => {
            const redirectUrl = this.appService.getUrl(this.appConfig.m2Url) + '/Splash?appId=' + this.appConfig.m2AppId + '&message=' + encodeURIComponent('Connected to ' + this.appService.getOAuthVendor(vendor) + '.<br>Redirecting to ' + this.appConfig.m2AppName + '...');
            this.appService.post('m2.action.oauth.GetAuthorizationUrlAction', {'vendor': vendor, 'redirectUrl': redirectUrl}).subscribe(response => {
                if (response.status === 'OK') {
                    this.connectingOAuth = response.oauth;
                    this.window.location.href = response.url;
                    this.find();
                } else {
                    this.close();
                    this.appService.error(response.humanReadableStatus);
                }
            });
        }, 1250);
    }

    /**
     *
     * @param width
     * @param height
     * @returns {string}
     */
    public getWindowOptions(width: number, height: number): string {

        const top = typeof window !== 'undefined' ? window.screenTop + 90 : 0;
        const left = typeof window !== 'undefined' ? window.screenLeft + (window.innerWidth / 2) - (width / 2) + 10 : 0;

        return 'status=no,height=' + height + ',width=' + width + ',resizable=yes,left=' + left + ',top=' + top + ',screenX=' + left + ',screenY=' + top + ',toolbar=no,menubar=no,scrollbars=no,location=no,directories=no';
    }

    /**
     *
     */
    public find(): void {

        if (!this.connectingOAuth) {
            return;
        }

        // Find oauth.
        this.appService.post('m2.action.oauth.FindAction', {'oauthId': this.connectingOAuth.oauthId}).subscribe(response => {
            if (response.status === 'OK') {

                // Vendor?
                switch (response.oauth.vendor) {
                    case OAuthVendor.Twitter:
                        this.twitterOAuth = response.oauth;
                        break;
                    case OAuthVendor.Facebook:
                        this.facebookOAuth = response.oauth;
                        break;
                    case OAuthVendor.Pinterest:
                        this.pinterestOAuth = response.oauth;
                        break;
                    case OAuthVendor.Square:
                        this.squareOAuth = response.oauth;
                        break;
                    case OAuthVendor.Wordpress:
                        this.wordpressOAuth = response.oauth;
                        break;
                    case OAuthVendor.Medium:
                        this.mediumOAuth = response.oauth;
                        break;
                    case OAuthVendor.LinkedIn:
                        this.linkedInOAuth = response.oauth;
                        break;
                    case OAuthVendor.Google:
                        this.googleOAuth = response.oauth;
                        break;
                }
                this.connectingOAuth = null;
                setTimeout(() => {
                    this.close();
                    this.onChange.emit({vendor: response.oauth.vendor, oauth: response.oauth});
                }, 2000);
            } else if (response.status === 'OAUTH_NOT_FOUND') {
                if (this.window != null && this.window.opener && !this.window.opener.closed) {
                    setTimeout(() => {
                        this.find();
                    }, 750);
                }
            } else {
                this.appService.error(response.humanReadableStatus);
            }
        });
    }

    /**
     *
     * @param oauth
     */
    public delete(oauth: OAuth): void {

        // vendor?
        switch (oauth.vendor) {
            case OAuthVendor.Twitter:
                this.twitterOAuth = null;
                this.twitterSpinner = true;
                break;
            case OAuthVendor.Facebook:
                this.facebookOAuth = null;
                this.facebookSpinner = true;
                break;
            case OAuthVendor.Pinterest:
                this.pinterestOAuth = null;
                this.pinterestSpinner = true;
                break;
            case OAuthVendor.Square:
                this.squareOAuth = null;
                this.squareSpinner = true;
                break;
            case OAuthVendor.Wordpress:
                this.wordpressOAuth = null;
                this.wordpressSpinner = true;
                break;
            case OAuthVendor.Medium:
                this.mediumOAuth = null;
                this.mediumSpinner = true;
                break;
            case OAuthVendor.LinkedIn:
                this.linkedInOAuth = null;
                this.linkedInSpinner = true;
                break;
            case OAuthVendor.Google:
                this.googleOAuth = null;
                this.googleSpinner = true;
                break;
        }

        // Update oauth.
        this.appService.post('m2.action.oauth.DeleteAction', {'oauthId': oauth.oauthId}).subscribe(response => {
            this.turnOffSpinners();
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.appService.success('You have been disconnected from ' + this.appService.getOAuthVendor(oauth.vendor) + '.');
                this.onChange.emit({vendor: oauth.vendor, oauth: null});
            }
        });
    }

    /**
     *
     * @param oauth
     */
    public update(oauth: OAuth): void {

        // vendor?
        switch (oauth.vendor) {
            case OAuthVendor.Twitter:
                this.twitterSpinner = true;
                oauth = this.twitterOAuth;
                break;
            case OAuthVendor.Facebook:
                oauth = this.facebookOAuth;
                this.facebookSpinner = true;
                break;
            case OAuthVendor.Pinterest:
                oauth = this.pinterestOAuth;
                this.pinterestSpinner = true;
                break;
            case OAuthVendor.Square:
                this.squareSpinner = true;
                oauth = this.squareOAuth;
                break;
            case OAuthVendor.Wordpress:
                this.wordpressSpinner = true;
                oauth = this.wordpressOAuth;
                break;
            case OAuthVendor.Medium:
                this.mediumSpinner = true;
                oauth = this.mediumOAuth;
                break;
            case OAuthVendor.LinkedIn:
                this.linkedInSpinner = true;
                oauth = this.linkedInOAuth;
                break;
            case OAuthVendor.Google:
                this.googleSpinner = true;
                oauth = this.googleOAuth;
                break;
        }

        // Update oauth.
        this.appService.post('m2.action.oauth.CreateOrUpdateAction', {'oauth': oauth}).subscribe(response => {
            this.turnOffSpinners();
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.onChange.emit({vendor: oauth.vendor, oauth: oauth});
            }
        });
    }

    /**
     *
     */
    public turnOffSpinners(): void {
        this.twitterSpinner = false;
        this.facebookSpinner = false;
        this.pinterestSpinner = false;
        this.squareSpinner = false;
        this.wordpressSpinner = false;
        this.mediumSpinner = false;
        this.linkedInSpinner = false;
        this.googleSpinner = false;
    }
}
