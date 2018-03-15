import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Post, PostType} from '../../store/states/post';


/**
 * M2PostListComponent
 */
@Component({
    selector: 'm2-post-list',
    templateUrl: './m2-post-list.component.html',
    styleUrls: ['./m2-post-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class M2PostListComponent implements OnInit {

    /**
     * Class level-declarations.
     */
    @Input()
    public type = 0;
    @Input()
    public imageUrl: string;
    public page = 0;
    public perPage = 10;
    public count = 0;
    public posts = [];
    public loading = true;

    /**
     *
     * @param appService
     */
    constructor(@Inject('AppConfig') private appConfig: any, @Inject('AppService') public appService: any) {
        if (this.appConfig.m2PostListImageUrl) {
            this.imageUrl = this.appConfig.m2PostListImageUrl;
        }
    }

    /**
     *
     */
    ngOnInit() {
        this.find();
    }

    /**
     *
     * @returns {string}
     */
    public getTitle(): string {
        switch (this.type) {
            case PostType.News:
                return 'News Article Posts';
            default:
                return 'Blog Posts';
        }
    }

    /**
     *
     * @param {Post} post
     * @returns {string}
     */
    public getRouterLink(post: Post): string {
        switch (post.type) {
            case PostType.News:
                return '/news/' + post.slug;
            default:
                return '/blog/' + post.slug;
        }
    }

    /**
     *
     */
    public find(): void {
        this.loading = true;
        this.appService.post('m2.action.post.FindByTypeAction', {type: this.type, page: this.page, perPage: this.perPage}).subscribe(response => {
            this.loading = false;
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.count = response.count;
                this.posts = response.posts;
            }
        });
    }

    /**
     *
     */
    public onPageIndexChange(event: any): void {
        this.page = event.pageIndex;
        this.perPage = event.pageSize;
        this.find();
    }
}
