import {Component, OnInit, AfterViewInit, Inject, Input, OnDestroy, forwardRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {M2Validators} from '../../validators/m2-validators';

/**
 * M2CardComponent
 */
@Component({
    selector: 'm2-card-update',
    templateUrl: './m2-card-update.component.html',
    styleUrls: ['./m2-stripe.component.scss']
})
export class M2CardUpdateComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
    @Input()
    public stripeCustomer: any;
    @Input()
    public onFinished: any;
    public cssClassName = 'm2-slide-in-form';
    public formGroup: FormGroup;
    public years = [];
    public spinner = false;

    /**
     *
     * @param appConfig
     * @param appService
     * @param {FormBuilder} formBuilder
     */
    constructor(@Inject('AppConfig') private appConfig: any, @Inject('AppService') public appService: any, private formBuilder: FormBuilder) {

        // Set years.
        const currentYear = new Date().getFullYear();
        for (let i = 0; i < 10; i++) {
            this.years.push('' + (currentYear + i));
        }

        // Set group.
        this.formGroup = formBuilder.group({
            creditCard: new FormControl('', Validators.compose([Validators.required, M2Validators.creditCard])),
            cvc: new FormControl('', Validators.compose([Validators.required, M2Validators.cvc])),
            expMonth: new FormControl('', Validators.compose([Validators.required])),
            expYear: new FormControl('' + currentYear, Validators.compose([Validators.required])),
        });
    }

    /**
     *
     */
    ngOnInit() {
        // QA and dev only.
        if (this.appConfig.name === 'dev' || this.appConfig.name === 'qa') {
            this.formGroup.controls['creditCard'].setValue('4000000000000077');
            this.formGroup.controls['cvc'].setValue('123');
            this.formGroup.controls['expMonth'].setValue('12');
            this.formGroup.controls['expYear'].setValue('' + new Date().getFullYear());
        }
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
    public close(stripeCustomer: any): void {
        this.cssClassName = 'slide-in-form dismiss-form';
        this.cssClassName = 'm2-slide-in-form m2-dismiss-form';
        setTimeout(() => {
            this.onFinished(stripeCustomer);
        }, 300);
    }

    /**
     *
     */
    public update(): void {
        this.spinner = true;
        this.appService.createStripeCardToken(this.formGroup.controls['creditCard'].value, this.formGroup.controls['cvc'].value, this.formGroup.controls['expMonth'].value, this.formGroup.controls['expYear'].value).subscribe(tokenId => {
                    // Create card.
                    this.appService.post('m2.action.stripe.AddCardAction', {stripeCustomerId: this.stripeCustomer.id, stripeTokenId: tokenId}).subscribe(response => {
                        this.spinner = false;
                        if (response.status !== 'OK') {
                            this.appService.error(response.humanReadableStatus);
                        } else {
                            this.close(response.stripeCustomer);
                        }
                    });
                },
                error => {
                    this.spinner = false;
                    this.appService.error(error);
                });
    }
}
