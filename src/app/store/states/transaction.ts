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
    to: string;
    value: number;
    time: number;
    signature: string;
}
