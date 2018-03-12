import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {M2Module} from '../../m2-angular/m2.module';
import {NewsPageComponent} from './news-page.component';

/**
 *
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: NewsPageComponent
        }]),
        M2Module
    ],
    declarations: [NewsPageComponent]
})
export class NewsModule {
}
