import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppService} from '../../app.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as secp256k1 from 'secp256k1';

declare const Buffer

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

    /**
     *
     */
    ngOnInit() {
    }

    /**
     *
     */
    public close(): void {
        this.mdDialogRef.close();
    }

    /**
     *
     */
    public generateWallet() {
        const privateKey = new Buffer(32);
        do {
            crypto.getRandomValues(privateKey);
        } while (!secp256k1.privateKeyVerify(privateKey));
        const hexPrivateKey = Buffer.from(privateKey).toString('hex');

        const publicKey = secp256k1.publicKeyCreate(privateKey);
        const address = new Buffer(20);
        for (let i = 0; i < address.length; i++) {
            address[i] = publicKey[i + 12];
        }
        const hexAddress = Buffer.from(address).toString('hex');

        this.formGroup.get('privateKey').setValue(hexPrivateKey);
        this.formGroup.get('address').setValue(hexAddress);



    }

}
