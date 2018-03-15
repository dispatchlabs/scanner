import {Pipe, PipeTransform} from '@angular/core';
import {Post, PostStatus} from '../store/states/post';

/**
 * M2PostStatusPipe
 */
@Pipe({
    name: 'm2PostStatus',
    pure: true
})
export class M2PostStatusPipe implements PipeTransform {

    /**
     *
     * @param post
     * @returns {any}
     */
    transform(post: Post): string {
        switch (post.status) {
            case PostStatus.Draft:
                return 'Draft';
            case PostStatus.Published:
                return 'Published';
            case PostStatus.Deleted:
                return 'Deleted';
            case PostStatus.Expired:
                return 'Expired';
            case PostStatus.PublishPending:
                return 'Publish Pending';
            case PostStatus.PublishError:
                return 'Publish Error';
            default:
                return 'Unknown';
        }
    }
}
