import {Pipe, PipeTransform} from '@angular/core';

/**
 * M2DayOfWeekPipe
 */
@Pipe({
    name: 'm2DayOfWeek',
    pure: true
})
export class M2DayOfWeekPipe implements PipeTransform {

    /**
     *
     * @param value
     * @returns {string}
     */
    transform(day: number): string {
        switch (day) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            case 7:
                return 'Sunday';
            default:
                return 'Invalid Day';
        }
    }
}
