/**
 * DeliveryWindow
 */
export interface DeliveryWindow {

    /**
     * Interface level-declarations.
     */
    id: string;
    carrier: string;
    service: string;
    starts_at: string;
    ends_at: string;
    expires_at: string;
    fee: number;
    window: string;
}