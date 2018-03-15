import {AccountProfile} from './account-profile';

/**
 * AccountType
 */
export enum AccountType {
    General = 0,
    Admin = 1,
    AppAdmin = 2
}

/**
 * Account
 */
export interface Account {

    /**
     * Interface level-declarations.
     */
    accountId: string;
    accountProfile: AccountProfile;
    type: number;
    status: number;
    email: string;
    mobile: string;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    dobYear: number;
    dobMonth: number;
    dobDay: number;
    last4Ssn: string;
    last4DriverLicense: string;
    age: number;
    stripeCustomerActive: boolean;
    plaidActive: boolean;
    updated: string;
    created: string;
}
