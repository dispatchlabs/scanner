import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-smart-contract-page',
    templateUrl: './smart-contract-page.component.html',
    styleUrls: ['./smart-contract-page.component.scss']
})
export class SmartContractPageComponent implements OnInit {

    /**
     * Class Level Declarations
     */
    public errorMessage = 'ERROR: Fook you';
    public errorMessageTwo = 'ERROR: Fook me';
    public byteCode = '';

    /**
     *
     */
    constructor() {
    }

    ngOnInit() {
    }

    /**
     *
     * @param code
     */
    public onChange(code) {
        console.log('new code', code);
    }

}
