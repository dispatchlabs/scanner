import {Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef, Inject} from '@angular/core';
import {AppService} from '../../app.service';

/**
 * MetaPageComponent
 */
@Component({
    templateUrl: './meta-page.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MetaPageComponent implements OnInit, AfterViewInit {

    /**
     *
     * @param {AppService} appService
     */
    constructor(@Inject('AppService') public appService: any) {
    }

    /**
     *
     */
    ngOnInit() {
        if (!this.appService.isSignedIn()) {
            this.appService.info('You must be signed in to view your account.');
            this.appService.navigateToHome();
            this.appService.openSignIn();
            return;
        }

        if (!this.appService.isAppAdmin()) {
            this.appService.info('Access denied.');
            this.appService.navigateToHome();
            return;
        }
    }

    /**
     *
     */
    ngAfterViewInit() {
    }
}
