import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment/moment';

/**
 * M2SimpleDatePipe
 */
@Pipe({
    name: 'm2SimpleDate',
    pure: true
})
export class M2SimpleDatePipe implements PipeTransform {

    /**
     *
     * @param value
     * @returns {string}
     */
    transform(isoDateString: string): string {
        return moment(isoDateString).format('MM/DD/YYYY');
    }
}
