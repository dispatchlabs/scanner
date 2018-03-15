import {Pipe, PipeTransform} from '@angular/core';
import {Delivery, DeliveryStatus} from '../store/states/delivery';

/**
 * M2DeliveryStatusPipe
 */
@Pipe({
    name: 'm2DeliveryStatus',
    pure: true
})
export class M2DeliveryStatusPipe implements PipeTransform {

    /**
     *
     * @param delivery
     * @returns {any}
     */
    transform(delivery: Delivery): string {
        switch (delivery.status) {
            case DeliveryStatus.Pending:
                return 'Pending';
            case DeliveryStatus.Assigned:
                return 'Assigned';
            case DeliveryStatus.InTransit:
                return 'In Transit';
            case DeliveryStatus.MovingToDropoff:
                return 'Moving to Drop-off';
            case DeliveryStatus.Canceled:
                return 'Delivered';
            case DeliveryStatus.Delivered:
                return 'Delivered';
            case DeliveryStatus.Returned:
                return 'Returned';
            default:
                return 'Unknown';
        }
    }
}
