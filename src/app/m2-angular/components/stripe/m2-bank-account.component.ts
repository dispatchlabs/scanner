import {Component, OnInit, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef, Inject, Input, forwardRef, OnDestroy} from '@angular/core';

import {M2Service} from '../../services/m2.service';
import {M2BankAccountUpdateComponent} from './m2-bank-account-update.component';

/**
 * M2BankAccountComponent
 */
@Component({
    selector: 'm2-bank-account',
    templateUrl: './m2-bank-account.component.html',
    styleUrls: ['./m2-stripe.component.scss']
})
export class M2BankAccountComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
    @Input()
    public stripeAccount: any;
    @Output()
    public onUpdate: EventEmitter<any> = new EventEmitter<any>();
    public bankAccount: any;
    private handle: any;
    @ViewChild('bankAccount')
    public bankAccountRef: any;

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
        this.setBankAccount();
    }

    /**
     *
     */
    private setBankAccount(): void {
        if (!this.stripeAccount) {
            return;
        }

        for (const bankAccount of this.stripeAccount.external_accounts.data) {
            if (bankAccount.object === 'bank_account') {
                this.bankAccount = Object.assign({}, bankAccount);
                break;
            }
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
        if (this.handle) {
            this.handle.destroy();
        }
    }

    /**
     *
     */
    public update(): void {
        this.handle = this.appService.createComponent(M2BankAccountUpdateComponent, {stripeAccount: this.stripeAccount, onFinished: (stripeAccount) => {
            if (stripeAccount) {
                this.stripeAccount = stripeAccount;
                this.setBankAccount();
                this.appService.success('Your bank account has been updated!');
                this.onUpdate.emit(stripeAccount);
            }
            this.handle.destroy();
        }});
    }
}
