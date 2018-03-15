import {Component, ViewEncapsulation, Inject, forwardRef, OnInit, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * M2ConfirmComponent
 */
@Component({
    selector: 'm2-confirm',
    templateUrl: './m2-confirm.component.html',
    styleUrls: ['./m2-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class M2ConfirmComponent implements OnInit {

    /**
     * Class level-declarations.
     */
    public title: string;
    // public title = M2Module.config.appName;
    public message: string;
    public ok: any;
    @Input()
    public imageUrl: string;

    /**
     *
     * @param mdDialogRef
     * @param data
     */
    constructor(@Inject('AppConfig') private appConfig: any, private mdDialogRef: MatDialogRef<M2ConfirmComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
        this.message = this.data.message;
        this.ok = this.data.ok;

        if (this.appConfig.m2ConfirmUrl) {
            this.imageUrl = this.appConfig.m2ConfirmUrl;
        }
    }

    /**
     *
     */
    ngOnInit() {
    }

    /**
     *
     */
    public close(result: boolean) {
        this.mdDialogRef.close();
        if (result === true && this.ok) {
            this.ok();
        }
    }
}

