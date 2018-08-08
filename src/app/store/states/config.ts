import {Account} from './account';
import {Node} from './node';

/**
 * Config
 */
export interface Config {

    /**
     * Interface level-declarations.
     */
    delegates: Node[];
    selectedDelegate: Node;
    account: Account;
}
