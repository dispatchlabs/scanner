import {Media} from './media';

/**
 * DestinationType
 */
export enum DestinationType {
    Twitter = 0,
    FacebookTimeline = 1,
    FacebookPage = 2,
    PinterestBoard = 3,
    Instagram = 4,
    Medium = 5
}


/**
 * Destination
 */
export interface Destination {

    destinationId: string;
    media: Media;
    type: number;
    status: number;
    id: string;
    url: string;
    updated: string;
    created: string;
}

