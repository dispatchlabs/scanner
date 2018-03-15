import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {Meta} from '../../store/states/meta';

/**
 *
 */
@Component({
    selector: 'app-m2-content',
    templateUrl: './m2-meta-update.component.html',
    styleUrls: ['./m2-meta-update.component.scss']
})
export class M2MetaUpdateComponent implements OnInit {

    /**
     * Class level-declarations.
     */
    @Input()
    public meta: Meta;
    @Input()
    public onFinished: any;
    public spinner = false;
    public cssClassName: string;

    /**
     *
     * @param appService
     */
    constructor(@Inject('AppService') public appService: any) {
    }

    /**
     *
     */
    ngOnInit() {
        this.cssClassName = 'm2-slide-in-form';
        this.meta = Object.assign({}, this.meta);
    }

    /**
     *
     * @param {Meta} meta
     */
    public close(meta: Meta): void {
        this.cssClassName = 'm2-slide-in-form m2-dismiss-form';
        setTimeout(() => {
            this.onFinished(meta);
        }, 300);
    }

    /**
     *
     */
    public update(): void {
        this.spinner = true;
        this.appService.post('m2.action.meta.UpdateAction', {meta: this.meta}).subscribe(response => {
            this.spinner = false;
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.close(response.meta);
            }
        });
    }
}
