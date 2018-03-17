import {Component, OnInit, AfterViewInit, OnDestroy, Inject, ViewChild} from '@angular/core';
import {AppService} from '../../app.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

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
    public loading = false;
    public delegateIps: string [];

    /**
     *
     * @param appService
     * @param {Router} router
     */
    constructor(@Inject('AppService') public appService: any, private router: Router) {
        this.delegateIps = environment.delegateIps;
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
     */
    public scrollDown() {
        this.getStartedDiv.nativeElement.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
}
