import {Component, ViewEncapsulation, Inject, forwardRef, OnInit, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * M2ConfirmComponent
 */
@Component({
    selector: 'm2-info',
    templateUrl: './m2-info.component.html',
    styleUrls: ['./m2-info.component.scss']
})
export class M2InfoComponent implements OnInit {

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
    constructor(@Inject('AppConfig') private appConfig: any, private mdDialogRef: MatDialogRef<M2InfoComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
        this.message = this.data.message;
        this.ok = this.data.ok;
        if (this.appConfig.m2InfoUrl) {
            this.imageUrl = this.appConfig.m2InfoUrl;
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
    public close() {
        this.mdDialogRef.close();
    }
}

