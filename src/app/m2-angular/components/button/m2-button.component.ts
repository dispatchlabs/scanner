import {Component, OnInit, AfterViewInit, Input, OnDestroy, Inject} from '@angular/core';

/**
 * M2UploadComponent
 */
@Component({
    selector: 'm2-button',
    templateUrl: './m2-button.component.html',
    styleUrls: ['./m2-button.component.scss']
})
export class M2ButtonComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
    @Input()
    public text: string;
    @Input()
    public disabled = false;
    @Input()
    public className = 'mat-button primary';
    @Input()
    public spinner = false;
    @Input()
    public minWidth = 'initial';
    @Input()
    public iconClass: string;

    /**
     *
     * @param appConfig
     */
    constructor(@Inject('AppConfig') private appConfig: any) {
        if (this.appConfig.m2ButtonMinWidth) {
            this.minWidth = this.appConfig.m2ButtonMinWidth;
        }
    }

    /**
     *
     */
    ngOnInit() {
        if (this.className !== 'mat-button primary') {
            this.className = 'mat-button ' + this.className;
        }
        this.iconClass = 'fa ' + this.iconClass;
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
    public onClick(): void {
        if (this.disabled || this.spinner) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}


