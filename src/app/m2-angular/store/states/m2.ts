import {Alert} from './alert';

/**
 * M2
 */
export interface M2 {

    /**
     * Interface level-declarations.
     */
    sessionId: string;
    account: any;
    alerts: Alert[];
    timestamp: string;
}
