import {Pipe, PipeTransform} from '@angular/core';
import {Delivery, DeliveryProvider} from '../store/states/delivery';

/**
 * M2DeliveryProviderNamePipe
 */
@Pipe({
    name: 'm2DeliveryProviderName',
    pure: true
})
export class M2DeliveryProviderNamePipe implements PipeTransform {

    /**
     *
     * @param delivery
     * @returns {any}
     */
    transform(delivery: Delivery): string {
        switch (delivery.provider) {
            case DeliveryProvider.Postmates:
                return 'Postmates';
            case DeliveryProvider.Deliv:
                return 'Deliv';
            case DeliveryProvider.Easypost:
                return 'Easypost';
            default:
                return null;
        }
    }
}
