import {Component, OnInit, AfterViewInit, Inject, Input, OnDestroy, OnChanges, forwardRef} from '@angular/core';
import {M2Service} from '../../services/m2.service';
import {M2CardUpdateComponent} from './m2-card-update.component';

/**
 * M2CardComponent
 */
@Component({
    selector: 'm2-card',
    templateUrl: './m2-card.component.html',
    styleUrls: ['./m2-stripe.component.scss']
})
export class M2CardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    /**
     * Class level-declarations.
     */
    @Input()
    public stripeCustomer: any;
    public card: any;
    private handle: any;

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
        this.setCard();
    }

    /**
     *
     */
    ngAfterViewInit() {
    }

    /**
     *
     */
    ngOnChanges() {
        this.setCard();
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
    private setCard(): void {
        if (!this.stripeCustomer) {
            return;
        }

        for (const card of this.stripeCustomer.sources.data) {
            if (card.id === this.stripeCustomer.default_source) {
                this.card = card;
                this.card.brand = this.card.brand.toLowerCase().replace(' ', '_');
                break;
            }
        }
    }

    /**
     *
     */
    public update(): void {
        this.handle = this.appService.createComponent(M2CardUpdateComponent, {stripeCustomer: this.stripeCustomer, onFinished: (stripeCustomer) => {
                if (stripeCustomer) {
                    this.stripeCustomer = stripeCustomer;
                    this.setCard();
                    this.appService.success('Your credit card has been updated!');
                }
                this.handle.destroy();
            }
        });
    }
}
