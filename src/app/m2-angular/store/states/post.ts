import {Media} from './media';
import {Destination} from './destination';

/**
 * PostType
 */
export enum PostType {
    Blog = 0,
    Marketing = 1,
    News = 2
}

/**
 * PostStatus
 */
export enum PostStatus {
    Draft = 0,
    Published  = 1,
    Deleted = 2,
    Expired = 3,
    PublishPending = 4,
    PublishError = 5
}

/**
 * Post
 */
export interface Post {

    /**
     * Interface level-declarations.
     */
    postId: string;
    media: Media;
    authorAvatarMedia: Media;
    wordpressId: string;
    type: number;
    status: number;
    title: string;
    slug: string;
    excerpt: string;
    keywords: string;
    description: string;
    author: string;
    content: string;
    published: string;
    expires: string;
    errorMessage: string;
    updated: string;
    created: string;
    // Joins.
    destinations: Destination[];
}
