import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppService} from '../../app.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-wallet-dialog',
    templateUrl: './wallet-dialog.component.html',
    styleUrls: ['./wallet-dialog.component.scss']
})
export class WalletDialogComponent implements OnInit {

    /**
     * Class Level Declarations
     */
    public formGroup: FormGroup;

    /**
     *
     * @param appService
     * @param {MatDialogRef<WalletDialogComponent>} mdDialogRef
     */
    constructor(@Inject('AppService') public appService: any, private mdDialogRef: MatDialogRef<WalletDialogComponent>, private formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({
            privateKey: new FormControl('', Validators.compose([Validators.required])),
            address: new FormControl('', Validators.compose([Validators.required])),
            recipientAddress: new FormControl('', Validators.compose([Validators.required])),
            numberOfTokens: new FormControl('', Validators.compose([Validators.required])),
        });
    }

    ngOnInit() {
    }

    /**
     *
     */
    public close(): void {
        this.mdDialogRef.close();
    }

}
