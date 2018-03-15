import {NgxChartsModule} from '@swimlane/ngx-charts';

export const environment = {
    name: 'dev',
    production: false,
    m2AppName: 'M2App',
    m2AppId: 'b1117f51-71d6-43f1-8acc-ffcdbd18316c',
    m2AppVersion: 'x.x',
    m2Url: 'https://www.mcgregor.io:9500',
    m2SessionTimeToLive: 20,
    m2SpinnerUrl: null,
    m2SpinnerWidth: 30,
    m2ButtonMinWidth: '180px',
    m2WebsiteUrl: 'http://outside.mcgegor.io',
    m2WebProxyPort: 3001,
    m2InfoUrl: 'assets/images/blue-bear.svg',
    m2ConfirmUrl: 'assets/images/blue-bear.svg',
    m2PostListImageUrl: 'assets/images/outside-icon-white.svg',
    stripePublishableKey: 'pk_test_2ub2SvNkrXpT9u2gKNoUYr1R',
    googleApiKey: 'AIzaSyA8KexBx7KwxEUikqfvUg0T4GTAmjIZcaI',
    plaidPublicKey: '817f602baf5a09feeb8f67f38ef94e',
    plaidEnv: 'sandbox',
    browserModulesOnly: [NgxChartsModule]
};
