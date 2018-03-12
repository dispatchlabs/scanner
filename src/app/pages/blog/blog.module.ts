import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BlogPageComponent} from './blog-page.component';
import {M2Module} from '../../m2-angular/m2.module';

/**
 *
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: BlogPageComponent
        }]),
        M2Module
    ],
    declarations: [BlogPageComponent]
})
export class BlogModule {
}
