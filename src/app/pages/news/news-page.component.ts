import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

/**
 *
 */
@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

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
