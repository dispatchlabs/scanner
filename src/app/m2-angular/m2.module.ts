import {ModuleWithProviders, NgModule} from '@angular/core';
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
    MatSliderModule, MatTableModule, MatPaginatorModule, MatGridListModule, MatFormFieldModule
} from '@angular/material';
import {M2MetaUpdateComponent} from './components/meta/m2-meta-update.component';
import {M2ConfirmComponent} from './dialogs/m2-confirm.component';
import {M2NotificationComponent} from './components/notification/m2-notification.component';
import {M2SignInComponent} from './components/account/m2-sign-in.component';
import {M2CardComponent} from './components/stripe/m2-card.component';
import {M2CardUpdateComponent} from './components/stripe/m2-card-update.component';
import {M2ChangePasswordComponent} from './components/account/m2-change-password.component';
import {M2OAuthComponent} from './components/oauth/m2-oauth.component';
import {M2UploadComponent} from './components/upload/m2-upload.component';
import {M2BankAccountComponent} from './components/stripe/m2-bank-account.component';
import {M2BankAccountUpdateComponent} from './components/stripe/m2-bank-account-update.component';
import {M2ButtonComponent} from './components/button/m2-button.component';
import {M2SpinnerComponent} from './components/spinner/m2-spinner.component';
import {M2AlertsComponent} from './components/alert/m2-alerts.component';
import {M2CurrencyPipe} from './pipes/m2-currency.pipe';
import {M2SimpleDateTimePipe} from './pipes/m2-simple-date-time.pipe';
import {M2SimpleDatePipe} from './pipes/m2-simple-date.pipe';
import {M2DayOfWeekPipe} from './pipes/m2-day-of-week.pipe';
import {M2DeliveryProviderNamePipe} from './pipes/m2-delivery-provider-name.pipe';
import {M2DeliveryStatusPipe} from './pipes/m2-delivery-status.pipe';
import {M2PostStatusPipe} from './pipes/m2-post-status.pipe';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk/table';
import {FileUploadModule} from 'ng2-file-upload';
import {M2MetaComponent} from './components/meta/m2-meta.component';
import {RouterModule} from '@angular/router';
import {M2InfoComponent} from './dialogs/m2-info.component';
import {M2PostListComponent} from './components/post/m2-post-list.component';
import {M2PostComponent} from './components/post/m2-post.component';
import {M2ApiDocumentationComponent} from './components/api-documentation/m2-api-documentation.component';
import {M2CardBrandPipe} from './pipes/m2-card-brand.pipe';
import {M2MobileInputComponent} from './components/input/m2-mobile-input.component';
import {M2SsnInputComponent} from './components/input/m2-ssn-input.component';
import {M2DateInputComponent} from './components/input/m2-date-input.component';
import {M2CurrencyInputComponent} from './components/input/m2-currency-input.component';

/**
 * M2Module
 */
@NgModule({
    imports: [
        // Angular
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        // Material
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
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
        CdkTableModule,
        FileUploadModule,
        MatPaginatorModule,
    ],
    declarations: [
        // Components
        M2NotificationComponent,
        M2ConfirmComponent,
        M2InfoComponent,
        M2SignInComponent,
        M2CardComponent,
        M2CardUpdateComponent,
        M2ChangePasswordComponent,
        M2OAuthComponent,
        M2UploadComponent,
        M2BankAccountComponent,
        M2BankAccountUpdateComponent,
        M2ButtonComponent,
        M2SpinnerComponent,
        M2PostListComponent,
        M2PostComponent,
        M2MetaComponent,
        M2MetaUpdateComponent,
        M2AlertsComponent,
        M2ApiDocumentationComponent,
        M2MobileInputComponent,
        M2SsnInputComponent,
        M2DateInputComponent,
        M2CurrencyInputComponent,
        // Pipes
        M2CurrencyPipe,
        M2SimpleDateTimePipe,
        M2SimpleDatePipe,
        M2DayOfWeekPipe,
        M2DeliveryProviderNamePipe,
        M2DeliveryStatusPipe,
        M2PostStatusPipe,
        M2CardBrandPipe
    ],
    exports: [
        // Components
        M2NotificationComponent,
        M2ConfirmComponent,
        M2SignInComponent,
        M2CardComponent,
        M2CardUpdateComponent,
        M2ChangePasswordComponent,
        M2OAuthComponent,
        M2UploadComponent,
        M2BankAccountComponent,
        M2BankAccountUpdateComponent,
        M2ButtonComponent,
        M2SpinnerComponent,
        M2PostListComponent,
        M2PostComponent,
        M2MetaComponent,
        M2MetaUpdateComponent,
        M2AlertsComponent,
        M2ApiDocumentationComponent,
        M2MobileInputComponent,
        M2SsnInputComponent,
        M2DateInputComponent,
        M2CurrencyInputComponent,
        // Pipes
        M2CurrencyPipe,
        M2SimpleDateTimePipe,
        M2SimpleDatePipe,
        M2DayOfWeekPipe,
        M2DeliveryProviderNamePipe,
        M2DeliveryStatusPipe,
        M2PostStatusPipe,
        M2CardBrandPipe
    ],
    entryComponents: [
        M2NotificationComponent,
        M2ConfirmComponent,
        M2CardUpdateComponent,
        M2BankAccountUpdateComponent,
        M2MetaUpdateComponent,
        M2InfoComponent
    ]
})
export class M2Module {

    /**
     *
     * @param appConfig
     * @returns {ModuleWithProviders}
     */
    public static forRoot(appConfig: any): ModuleWithProviders {
        return {ngModule: M2Module, providers: [{provide: 'AppConfig', useValue: appConfig}]};
    }
}
