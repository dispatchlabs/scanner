import {AppState as M2AppState} from './m2-angular/app.state';
import {Dispatch} from './store/states/dispatch';

/**
 * AppState
 */
export interface AppState extends M2AppState {
    dispatch: Dispatch;
}

