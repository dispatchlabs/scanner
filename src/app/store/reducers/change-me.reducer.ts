import {Action} from '@ngrx/store';

/**
 *
 */
export class ChangeMeAction implements Action {

    /**
     * Class level-declarations.
     */
    public static CHANGE_ME_CLEAR = 'CHANGE_ME_CLEAR';
    public static CHANGE_ME_UPDATE = 'CHANGE_ME_UPDATE';
    public readonly type: string;
    public foo: any;

    /**
     *
     * @param foo
     * @param {ChangeMeAction} action
     * @returns {any}
     */
    public static reducer(foo: any, action: ChangeMeAction) {
        return null;
    }

    /**
     *
     * @param {string} type
     * @param foo
     */
    constructor(type: string, foo?: any) {
        if (!this) {
            return;
        }
        this.type = type;
        this.foo = foo;
    }
}

