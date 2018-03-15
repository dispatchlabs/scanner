import {Pipe, PipeTransform} from '@angular/core';

/**
 * M2CurrencyPipe
 */
@Pipe({
    name: 'm2Currency',
    pure: true
})
export class M2CurrencyPipe implements PipeTransform {

    /**
     *
     * @param value
     * @returns {string}
     */
    transform(value: number): string {
        return '$' + (value / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
}
