import {NgxChartsModule} from '@swimlane/ngx-charts';

export const environment = {
    name: 'amazon',
    production: true,
    m2AppName: 'M2App',
    m2AppId: 'b1117f51-71d6-43f1-8acc-ffcdbd18316c',
    m2AppVersion: '1.0',
    m2Url: 'https://www.dispatchfinancial.com:9500',
    m2SessionTimeToLive: 20,
    m2SpinnerUrl: 'assets/images/wheel-white.svg',
    m2SpinnerWidth: 40,
    m2ButtonMinWidth: '180px',
    m2WebsiteUrl: 'https://www.dispatchfinancial.com',
    m2WebProxyPort: 3001,
    m2InfoUrl: 'assets/images/blue-bear.svg',
    m2ConfirmUrl: 'assets/images/blue-bear.svg',
    m2PostListImageUrl: 'assets/images/dispatch-icon-white.svg',
    stripePublishableKey: 'pk_live_kjXN5NY3A4zKnibgE2gLCJAF',
    googleApiKey: 'AIzaSyA8KexBx7KwxEUikqfvUg0T4GTAmjIZcaI',
    plaidPublicKey: '817f602baf5a09feeb8f67f38ef94e',
    plaidEnv: 'production',
    browserModulesOnly: [NgxChartsModule]
};
