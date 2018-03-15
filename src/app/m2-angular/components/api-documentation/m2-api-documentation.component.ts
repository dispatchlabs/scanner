import {Component, OnInit, AfterViewInit, Input, OnDestroy, Inject} from '@angular/core';

/**
 * M2ApiDocumentationComponent
 */
@Component({
    selector: 'm2-api-documentation',
    templateUrl: './m2-api-documentation.component.html',
    styleUrls: ['./m2-api-documentation.component.scss']
})
export class M2ApiDocumentationComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
    public loading = true;
    public actionContexts = [];
    public m2ActionContexts = [];

    /**
     *
     * @param appService
     * @param appConfig
     */
    constructor(@Inject('AppService') public appService: any, @Inject('AppConfig') private appConfig: any) {
    }

    /**
     *
     */
    ngOnInit() {
        this.appService.post('m2.action.app.GetAppContextAction', {}).subscribe(response => {
            this.loading = false;
            if (response.status === 'OK') {
                this.actionContexts = response.appContext.actionContexts;
                this.m2ActionContexts = response.m2ActionContexts;
            } else {
                this.appService.error(response.humanReadableStatus);
            }
        });
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
     * @param scrollElement
     */
    public scrollTo(scrollElement: any) {
        scrollElement.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
}


