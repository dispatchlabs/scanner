/**
 *
 */
export interface Media {

    /**
     * Interface level-declarations.
     */
    mediaId: string;
    status: number;
    extension: string;
    size: number;
    name: string;
    description: string;
    resolution: string;
    checksum: number;
    encrypted: boolean;
    updated: string;
    created: string;
    url: string;
    urls: string[];
}