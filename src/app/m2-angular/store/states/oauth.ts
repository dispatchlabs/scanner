import {FacebookPage} from './facebook-page';
import {PinterestBoard} from './pinterest-board';

/**
 * OAuthVendor
 */
export enum OAuthVendor {
    Twitter = 0,
    Facebook  = 1,
    Pinterest = 2,
    Lightspeed = 3,
    Square = 4,
    Wordpress = 5,
    Medium = 6,
    LinkedIn = 7,
    Google = 8
}

/**
 * OAuth
 */
export interface OAuth {

    /**
     * Interface level-declarations.
     */
    oauthId: string;
    vendor: number;
    accessToken: string;
    accessTokenSecret: string;
    callbackId: string;
    expires: string;
    postToFacebookTimeline: boolean;
    updated: string;
    created: string;
    // Joins.
    facebookPages: FacebookPage[];
    pinterestBoards: PinterestBoard[];
}

