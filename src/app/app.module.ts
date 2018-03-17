import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule, MatSnackBarModule, MatRadioModule, MatSlideToggleModule, MatAutocompleteModule, MatMenuModule,
    MatSliderModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule
} from '@angular/material';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ActionReducer, ActionReducerMap, MetaReducer, StoreModule} from '@ngrx/store';
import {environment} from '../environments/environment';
import {AppService} from './app.service';
import {NotFoundPageComponent} from './pages/not-found/not-found-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SignInDialogComponent} from './dialogs/sign-in/sign-in-dialog.component';
import {FileUploadModule} from 'ng2-file-upload';
import {M2Action} from './m2-angular/store/reducers/m2.reducer';
import {CdkTableModule} from '@angular/cdk/table';
import {AppState} from './app.state';
import {BlogListPageComponent} from './pages/blog/blog-list-page.component';
import {M2Module} from './m2-angular/m2.module';
import {APP_CLEAR_ALL_STATES} from './m2-angular/services/m2.service';
import {MetaPageComponent} from './pages/meta/meta-page.component';
import {NewsListPageComponent} from './pages/news/news-list-page.component';
import {WalletDialogComponent} from './dialogs/wallet/wallet-dialog.component';
import {ConfigAction} from './store/reducers/config.reducer';
import {SendTokensDialogComponent} from './dialogs/send-tokens/send-tokens-dialog.component';

/**
 *
 */
export const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/home/home.module#HomeModule'
    },
    {path: 'meta', component: MetaPageComponent, pathMatch: 'full'},
    {path: 'blog', component: BlogListPageComponent, pathMatch: 'full'},
    {
        path: 'blog/:slug',
        loadChildren: './pages/blog/blog.module#BlogModule'
    },
    {path: 'news', component: NewsListPageComponent},
    {
        path: 'news/:slug',
        loadChildren: './pages/news/news.module#NewsModule'
    },
    {path: '**', component: NotFoundPageComponent}
];

/**
 * reducers
 */
const reducers: ActionReducerMap<AppState> = {
    m2: M2Action.reducer,
    config: ConfigAction.reducer
};

/**
 *
 * @param {ActionReducer<AppState>} reducer
 * @returns {ActionReducer<AppState>}
 */
export function localStorageReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state: AppState, action: any): AppState {
        if (typeof localStorage !== 'undefined') {
            if (action.type === '@ngrx/store/init') {
                return reducer(Object.assign({}, JSON.parse(localStorage.getItem(environment.m2AppId))), action);
            } else if (action.type === APP_CLEAR_ALL_STATES) {
                return reducer(Object.create({}), action);
            }
            localStorage.setItem(environment.m2AppId, JSON.stringify(state));
        }
        return reducer(state, action);
    };
}

const metaReducers: MetaReducer<AppState>[] = [localStorageReducer];

/**
 *
 */
@NgModule({
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    declarations: [
        // App
        AppComponent,
        // Pages
        NotFoundPageComponent,
        BlogListPageComponent,
        MetaPageComponent,
        NewsListPageComponent,
        // Components
        // Dialogs
        SignInDialogComponent,
        WalletDialogComponent,
        SendTokensDialogComponent
    ],
    imports: [
        // Angular
        BrowserModule.withServerTransition({appId: environment.m2AppId}),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        RouterModule.forRoot(routes, {useHash: false}),
        // M2
        M2Module.forRoot(environment),
        // NGRX
        StoreModule.forRoot(reducers, {metaReducers}),
        // Material
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatTabsModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatMenuModule,
        MatSliderModule,
        MatTableModule,
        MatPaginatorModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        // Other.
        CdkTableModule,
        FileUploadModule,
        environment.browserModulesOnly
    ],
    entryComponents: [
        SignInDialogComponent,
        WalletDialogComponent
    ],
    providers: [{provide: 'AppService', useClass: AppService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
