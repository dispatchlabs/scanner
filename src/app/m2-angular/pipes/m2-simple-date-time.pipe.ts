import {Pipe, PipeTransform} from '@angular/core';

/**
 * M2SimpleDateTimePipe
 */
@Pipe({
    name: 'm2SimpleDateTime',
    pure: true
})
export class M2SimpleDateTimePipe implements PipeTransform {

    /**
     *
     * @param value
     * @returns {string}
     */
    transform(isoDateString: string): string {
        return moment(isoDateString).format('MM/DD/YYYY hh:mm:ssa');
    }
}
