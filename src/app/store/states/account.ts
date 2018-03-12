import {Account as M2Account} from '../../m2-angular/store/states/account';

/**
 * Account
 */
export interface Account extends M2Account {

    /**
     * Interface level-declarations.
     */
    monthlyIncome: number;
}
