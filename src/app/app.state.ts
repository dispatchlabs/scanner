import {AppState as M2AppState} from './m2-angular/app.state';
import {Config} from './store/states/config';

/**
 * AppState
 */
export interface AppState extends M2AppState {
    config: Config;
}

