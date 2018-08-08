/**
 * Transaction
 */
export interface Transaction {

    /**
     * Interface level-declarations.
     */
    hash: string;
    type: any;
    from: string;
    to: string;
    value: number;
    code: string;
    abi: string;
    method: string;
    params: any;
    time: number;
    signature: string;
    hertz: number;
    // Transients.
    fromName: string;
    toName: string;
}

