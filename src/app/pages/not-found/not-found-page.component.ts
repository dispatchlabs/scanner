import {Component, OnInit, AfterViewInit, Inject, forwardRef} from '@angular/core';
import {AppService} from '../../app.service';

/**
 *
 */
@Component({
    templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent implements OnInit, AfterViewInit {

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
    }

    /**
     *
     */
    ngAfterViewInit() {
    }
}
