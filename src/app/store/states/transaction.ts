/**
 * Transaction
 */
export interface Transaction {

    /**
     * Interface level-declarations.
     */
    hash: string;
    type: number;
    from: string;
    fromName: string;
    to: string;
    toName: string;
    value: number;
    time: number;
    signature: string;
}
