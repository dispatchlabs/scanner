import {Component, ViewEncapsulation, Inject, OnInit, AfterViewInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppService} from '../app.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

/**
 * SignInDialogComponent
 */
@Component({
    templateUrl: './sign-in-dialog.component.html',
    styleUrls: ['./sign-in-dialog.component.scss']
})
export class SignInDialogComponent implements OnInit, AfterViewInit {

    /**
     *
     * @param appService
     * @param {MatDialogRef<SignInDialogComponent>} mdDialogRef
     * @param data
     * @param {Router} router
     */
    constructor(@Inject('AppService') public appService: any, private mdDialogRef: MatDialogRef<SignInDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private router: Router) {
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
    public close(): void {
        this.mdDialogRef.close();
    }

    /**
     *
     */
    public onSignIn(): void {
        this.close();
        this.appService.success('Welcome back to ' + environment.m2AppName + '!');
        if (this.router.url !== '/pre-qualify') {
            this.appService.navigateToLoan();
        }
    }
}



