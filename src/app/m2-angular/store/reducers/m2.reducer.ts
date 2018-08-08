import {Action} from '@ngrx/store';
import {M2} from '../states/m2';

/**
 *
 */
export class M2Action implements Action {

    /**
     * Class level-declarations.
     */
    public static M2_INITIAL_STATE = 'M2_INITIAL_STATE';
    public static M2_UPDATE = 'M2_UPDATE';
    public readonly type: string;
    public m2: M2;

    /**
     *
     * @param {M2} state
     * @param {M2Action} action
     * @returns {any}
     */
    public static reducer(state: M2 = M2Action.getInitialState(), action: M2Action) {
        switch (action.type) {
            case M2Action.M2_INITIAL_STATE:
                return M2Action.getInitialState();
            case M2Action.M2_UPDATE:
                return Object.assign({}, action.m2);
            default:
                return state;
        }
    }

    /**
     *
     * @returns {M2}
     */
    public static getInitialState(): M2 {
        return {
            sessionId: null,
            account: null,
            alerts: []
        };
    }

    /**
     *
     * @param {string} type
     * @param {M2} m2
     */
    constructor(type: string, m2?: M2) {
        if (!this) {
            return;
        }
        this.type = type;
        this.m2 = m2;
    }
}
