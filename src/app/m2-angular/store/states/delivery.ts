import {DeliveryWindow} from './delivery-window';

/**
 * DeliveryType
 */
export enum DeliveryType {
    SameDay = 0
}

/**
 * DeliveryStatus
 */
export enum DeliveryStatus {
    Pending = 0,
    Assigned  = 1,
    InTransit = 2,
    MovingToDropoff = 3,
    Canceled = 4,
    Delivered = 5,
    Returned = 6
}

/**
 * DeliveryProvider
 */
export enum DeliveryProvider {
    Postmates = 0,
    Deliv  = 1,
    Easypost = 2
}

/**
 *
 * Delivery
 */
export interface Delivery {

    /**
     * Interface level-declarations.
     */
    deliveryId: string;
    type: number;
    status: number;
    live: boolean;
    provider: number;
    providerEstimateId: string;
    providerDeliveryId: string;
    providerDeliveryWindowId: string;
    providerDeliveryWindow: string;
    manifest: string;
    trackingCode: string;
    pickupAddress: string;
    pickupName: string;
    pickupPhone: string;
    pickupNotes: string;
    dropoffAddress: string;
    dropoffFirstName: string;
    dropoffLastName: string;
    dropoffPhone: string;
    dropoffEmail: string;
    dropoffNotes: string;
    parcelLength: number;
    parcelWidth: number;
    parcelHeight: number;
    parcelWeight: number;
    pickupEta: string;
    dropoffEta: string;
    courierName: string;
    courierImageUrl: string;
    courierLongitude: number;
    courierLatitude: number;
    delivered: string;
    fee: number;
    currency: string;
    updated: string;
    created: string;
    // Joins.
    deliveryWindows: DeliveryWindow[];
}