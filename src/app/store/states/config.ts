import {Contact} from './contact';

/**
 * Config
 */
export interface Config {

    /**
     * Interface level-declarations.
     */
    seedNodeIp: string[];
    delegates: Contact[];
}
