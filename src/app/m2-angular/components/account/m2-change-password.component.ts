import {Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, Inject, Input, forwardRef, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

/**
 * M2ChangePasswordComponent
 */
@Component({
    selector: 'm2-change-password',
    templateUrl: './m2-change-password.component.html',
    styleUrls: ['./m2-change-password.component.scss']
})
export class M2ChangePasswordComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
    public group: FormGroup;
    public spinner: boolean;

    /**
     *
     * @param appService
     * @param {FormBuilder} formBuilder
     */
    constructor(@Inject('AppService') public appService: any, private formBuilder: FormBuilder) {
        this.group = formBuilder.group({
            currentPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            newPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirmNewPassword: new FormControl('', Validators.compose([Validators.required, function (control: FormControl) {
                if (!control.root.get('newPassword') || !control.root.get('confirmNewPassword')) {
                    return null;
                }
                return control.root.get('newPassword').value === control.root.get('confirmNewPassword').value ? null : {'mismatch': true};
            }]))
        });
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
    public reset(): void {
        this.spinner = false;
        this.group.reset();
    }

    /**
     *
     */
    public changePassword(): void {

        // Change password.
        this.spinner = true;
        this.appService.post('m2.action.account.ChangePasswordAction', {
            'currentPassword': this.group.controls['currentPassword'].value,
            'newPassword': this.group.controls['newPassword'].value
        }).subscribe(response => {
            this.spinner = false;
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.group.reset();
                this.appService.success('Your password has been changed.');
            }
        });
    }
}
