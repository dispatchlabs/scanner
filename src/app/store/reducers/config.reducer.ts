import {Action} from '@ngrx/store';
import {Config} from '../states/config';
import {environment} from '../../../environments/environment';

/**
 *
 */
export class ConfigAction implements Action {

    /**
     * Class level-declarations.
     */
    public static CONFIG_INITIAL_STATE = 'CONFIG_INITIAL_STATE';
    public static CONFIG_UPDATE = 'CONFIG_UPDATE';
    public readonly type: string;
    public config: Config;

    /**
     *
     * @param {Config} state
     * @param {ConfigAction} action
     * @returns {any}
     */
    public static reducer(state: Config = ConfigAction.getInitialState(), action: ConfigAction) {
        switch (action.type) {
            case ConfigAction.CONFIG_INITIAL_STATE:
                return ConfigAction.getInitialState();
            case ConfigAction.CONFIG_UPDATE:
                return Object.assign({}, action.config);
            default:
                return state;
        }
    }

    /**
     *
     * @returns {Config}
     */
    public static getInitialState(): Config {
        return {
            delegates: environment.delegates,
            selectedDelegate: null,
            account: {
                privateKey: '0f86ea981203b26b5b8244c8f661e30e5104555068a4bd168d3e3015db9bb25a',
                address: '3ed25f42484d517cdfc72cafb7ebc9e8baa52c2c',
                balance: 0,
                name: ''
            }
        };
    }

    /**
     *
     * @param {string} type
     * @param {Config} config
     */
    constructor(type: string, config?: Config) {
        if (!this) {
            return;
        }
        this.type = type;
        this.config = config;
    }
}
