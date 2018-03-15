import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {Post} from '../../store/states/post';
import {ActivatedRoute} from '@angular/router';

/**
 * M2PostComponent
 */
@Component({
    selector: 'm2-post',
    templateUrl: './m2-post.component.html',
    styleUrls: ['./m2-post.component.scss']
})
export class M2PostComponent implements OnInit {

    /**
     * Class level-declarations.
     */
    public post: Post = null;
    public loading = true;

    /**
     *
     * @param appService
     * @param {ActivatedRoute} activatedRoute
     */
    constructor(@Inject('AppService') public appService: any, private activatedRoute: ActivatedRoute) {
    }

    /**
     *
     */
    ngOnInit() {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }

        // Find blog.
        this.activatedRoute.params.subscribe(params => {
            this.loading = true;
            this.appService.post('m2.action.post.FindBySlugAction', {slug: params['slug']}).subscribe(response => {
                this.loading = false;
                if (response.status !== 'OK') {
                    this.appService.error(response.humanReadableStatus);
                } else {
                    this.post = response.post;
                }
            });
        });
    }
}
