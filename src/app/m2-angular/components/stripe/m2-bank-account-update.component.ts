import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import 'rxjs/add/operator/catch';

/**
 *
 */
@Component({
    selector: 'app-m2-bank-account-update',
    templateUrl: './m2-bank-account-update.component.html',
    styleUrls: ['./m2-stripe.component.scss']
})
export class M2BankAccountUpdateComponent implements OnInit {

    /**
     * Class level-declarations.
     */
    @Input()
    public stripeAccount: any;
    @Input()
    public onFinished: any;
    public cssClassName = 'm2-slide-in-form';
    public formGroup: FormGroup;
    public spinner = false;

    /**
     *
     * @param appConfig
     * @param appService
     * @param {FormBuilder} formBuilder
     */
    constructor(@Inject('AppConfig') private appConfig: any, @Inject('AppService') public appService: any, private formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({
            routingNumber: new FormControl('', Validators.compose([Validators.required])),
            accountNumber: new FormControl('', Validators.compose([Validators.required])),
            taxType: new FormControl('company', Validators.compose([Validators.required])),
            stripeTerms: new FormControl(false, Validators.compose([Validators.required, Validators.requiredTrue]))
        });
    }

    /**
     *
     */
    ngOnInit() {
        // Dev or QA?
        if (this.appConfig.name === 'dev' || this.appConfig.name === 'qa') {
            this.formGroup.controls['routingNumber'].setValue('110000000');
            this.formGroup.controls['accountNumber'].setValue('000123456789');
        }
    }

    /**
     *
     * @param stripeAccount
     */
    public close(stripeAccount: any): void {
        this.cssClassName = 'm2-slide-in-form m2-dismiss-form';
        setTimeout(() => {
            this.onFinished(stripeAccount);
        }, 300);
    }

    /**
     *
     */
    public update(): void {
        if (!this.formGroup.valid) {
            return;
        }
        this.spinner = true;
        this.appService.createStripeBankToken('US', this.formGroup.controls['routingNumber'].value, this.formGroup.controls['accountNumber'].value, this.formGroup.controls['taxType'].value).subscribe(tokenId => {
                this.appService.post('m2.action.stripe.AddBankAccountAction', {
                    stripeAccountId: this.stripeAccount.id,
                    stripeTokenId: tokenId,
                    type: this.formGroup.controls['taxType'].value
                }).subscribe(response => {
                    this.spinner = false;
                    if (response.status !== 'OK') {
                        this.appService.error(response.humanReadableStatus);
                    } else {
                        this.close(response.stripeAccount);
                    }
                });
            },
            error => {
                this.spinner = false;
                this.appService.error(error.json().error.message);
            });
    }
}
