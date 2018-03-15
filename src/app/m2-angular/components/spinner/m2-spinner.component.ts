import {Component, Inject, Input, OnInit} from '@angular/core';

/**
 * M2SpinnerComponent
 */
@Component({
    selector: 'm2-spinner',
    templateUrl: './m2-spinner.component.html',
    styleUrls: ['./m2-spinner.component.scss']
})
export class M2SpinnerComponent implements OnInit {

    /**
     * Class level-declarations.
     */
    @Input()
    public url: string;
    @Input()
    public width = 20;
    @Input()
    public strokeWidth = 3;

    /**
     *
     * @param appConfig
     * @param appService
     */
    constructor(@Inject('AppConfig') private appConfig: any, @Inject('AppService') public appService: any) {
        if (this.appConfig.m2SpinnerUrl) {
            this.url = this.appConfig.m2SpinnerUrl;
        }
        if (this.appConfig.m2SpinnerWidth) {
            this.width = this.appConfig.m2SpinnerWidth;
        }
        if (this.appConfig.m2SpinnerStrokeWidth) {
            this.strokeWidth = this.appConfig.m2SpinnerStrokeWidth;
        }
    }

    /**
     *
     */
    ngOnInit() {
    }
}
