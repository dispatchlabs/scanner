import {Action} from '@ngrx/store';
import {Dispatch} from '../states/dispatch';

/**
 *
 */
export class DispatchAction implements Action {

    /**
     * Class level-declarations.
     */
    public static DISPATCH_INITIAL_STATE = 'DISPATCH_INITIAL_STATE';
    public static DISPATCH_UPDATE = 'DISPATCH_UPDATE';
    public readonly type: string;
    public dispatch: Dispatch;

    /**
     *
     * @param {Dispatch} state
     * @param {DispatchAction} action
     * @returns {any}
     */
    public static reducer(state: Dispatch = DispatchAction.getInitialState(), action: DispatchAction) {
        switch (action.type) {
            case DispatchAction.DISPATCH_INITIAL_STATE:
                return DispatchAction.getInitialState();
            case DispatchAction.DISPATCH_UPDATE:
                return Object.assign({}, action.dispatch);
            default:
                return state;
        }
    }

    /**
     *
     * @returns {Dispatch}
     */
    public static getInitialState(): Dispatch {
        return {
            nodeIp: 'localhost'
        };
    }

    /**
     *
     * @param {string} type
     * @param {Dispatch} dispatch
     */
    constructor(type: string, dispatch?: Dispatch) {
        if (!this) {
            return;
        }
        this.type = type;
        this.dispatch = dispatch;
    }
}
