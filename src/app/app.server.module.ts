import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {environment} from '../environments/environment';

/**
 *
 */
@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {

    /**
     * Class level-declarations.
     */
    public static environment = environment;
}
