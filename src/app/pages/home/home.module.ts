import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page.component';
import {MatButtonModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NodeInfoComponent} from "../../components/node/node-info.component";

/**
 *
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: HomePageComponent
        }]),
        MatButtonModule,
        FlexLayoutModule
    ],
    declarations: [
        HomePageComponent,
        NodeInfoComponent
    ]
})
export class HomeModule {
}
