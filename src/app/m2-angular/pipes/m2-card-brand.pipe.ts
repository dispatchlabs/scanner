import {Pipe, PipeTransform} from '@angular/core';

/**
 * M2CardBrandPipe
 */
@Pipe({
    name: 'm2CardBrand',
    pure: true
})
export class M2CardBrandPipe implements PipeTransform {

    /**
     *
     * @param value
     * @returns {string}
     */
    transform(value: string): string {
        switch (value) {
            case 'Visa':
                return 'visa';
            case 'American Express':
                return 'american_express';
            case 'MasterCard':
                return 'mastercard';
            case 'Discover':
                return 'discover';
            case 'JCB':
                return 'jcb';
            case 'Diners Club':
                return 'diners_club';
            default:
                return 'stripe';
        }
    }
}
