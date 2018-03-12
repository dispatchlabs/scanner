import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

/**
 *
 */
@Component({
    selector: 'app-blog-page',
    templateUrl: './blog-page.component.html',
    styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

    /**
     *
     * @param {Location} location
     */
    constructor(public location: Location) {
    }

    /**
     *
     */
    ngOnInit() {
    }
}
