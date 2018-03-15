import {Component, OnInit, AfterViewInit, Output, EventEmitter, Inject, Input, OnDestroy, forwardRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {M2Validators} from '../../validators/m2-validators';
import {Store} from '@ngrx/store';
import {M2Action} from '../../store/reducers/m2.reducer';
import {AppState} from '../../app.state';
import {APP_SIGN_IN} from '../../services/m2.service';

/**
 * M2SignInComponent
 */
@Component({
    selector: 'm2-sign-in',
    templateUrl: './m2-sign-in.component.html',
})
export class M2SignInComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
    @Input()
    public signInClassName = 'm2.action.account.SignInAction';
    @Input()
    public hideRegister = false;
    @Output()
    public register: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    public onSignIn: EventEmitter<void> = new EventEmitter<void>();
    public formGroup: FormGroup;
    public spinner = false;

    /**
     *
     * @param appService
     * @param store
     * @param formBuilder
     */
    constructor(@Inject('AppService') public appService: any, private store: Store<AppState>, private formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({
            email: new FormControl('', Validators.compose([Validators.required, M2Validators.email])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
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
        this.formGroup.reset();
    }

    /**
     *
     */
    public signIn(): void {
        this.spinner = true;
        this.appService.post(this.signInClassName, {email: this.formGroup.get('email').value, password: this.formGroup.get('password').value}).subscribe(response => {
            this.spinner = false;
            if (response.status === 'OK') {
                this.appService.m2.account = response.account;
                this.store.dispatch(new M2Action(M2Action.M2_UPDATE, this.appService.m2));
                this.appService.appEvents.emit({type: APP_SIGN_IN, account: response.account});
                this.onSignIn.emit();
            } else {
                this.appService.error(response.humanReadableStatus);
            }
        });
    }

    /**
     *
     */
    public forgotPassword(): void {

        // Valid email?
        if (!this.formGroup.get('email').valid) {
            this.appService.info('Enter a valid email to reset your password.');
            return;
        }

        // Reset password.
        this.appService.post('m2.action.account.ResetPasswordAction', {email: this.formGroup.get('email').value}).subscribe(response => {
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.appService.success('A temporary password has been emailed to you.');
            }
        });
    }
}
