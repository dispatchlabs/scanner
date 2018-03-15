import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {AppService} from '../../app.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as secp256k1 from 'secp256k1';
import * as keccak from 'keccak';
import {Observable} from 'rxjs/Rx';
import {Headers, Http, RequestOptions} from '@angular/http';

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
    public spinner = false;
    public loading = false;
    public balance = 0;

    /**
     *
     * @param appService
     * @param {MatDialogRef<WalletDialogComponent>} mdDialogRef
     * @param {FormBuilder} formBuilder
     * @param {Http} http
     */
    constructor(@Inject('AppService') public appService: any, private mdDialogRef: MatDialogRef<WalletDialogComponent>, private formBuilder: FormBuilder, private http: Http) {
        this.formGroup = formBuilder.group({
            privateKey: new FormControl('dbb9eb135089c47e7ae678eed35933e13efa79c88731794add26c1a370b9efc9', Validators.compose([Validators.required, Validators.minLength(64)])),
            address: new FormControl('9d6fa5845833c42e1aa4b768f944c5e09fe968b0', Validators.compose([Validators.required, Validators.minLength(40)])),
            recipientAddress: new FormControl('c296220327589dc04e6ee01bf16563f0f53895bb', Validators.compose([Validators.required, Validators.minLength(40)])),
            numberOfTokens: new FormControl(0, Validators.compose([Validators.required, Validators.min(1)])),
        });
    }

    /**
     *
     */
    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.get('http://mcgregor.io:1975/v1/balance/' + this.formGroup.get('address').value).subscribe( response => {
                this.loading = false;
                this.balance = response.balance;
                console.log(response);
            });
        }, 2 * 1000);

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
    public generateWallet(): void {
        const privateKey = new Buffer(32);
        do {
            crypto.getRandomValues(privateKey);
        } while (!secp256k1.privateKeyVerify(privateKey));
        const publicKey = secp256k1.publicKeyCreate(privateKey);
        const address = new Buffer(20);
        for (let i = 0; i < address.length; i++) {
            address[i] = publicKey[i + 12];
        }
        this.balance = 0;
        this.formGroup.get('privateKey').setValue(Buffer.from(privateKey).toString('hex'));
        this.formGroup.get('address').setValue(Buffer.from(address).toString('hex'));
    }

    /**
     *
     */
    public sendTokens(): void {

        const privateKey = new Buffer('2093fde230170efc92b2c122b8b831b30f916dd5568b50a427caa76e13e7effd', 'hex')
        const hashBytes = new Buffer('FOOK ME')
        const hash = keccak('keccak256').update(hashBytes).digest();
        console.log(keccak('keccak256').update('Hello world!').digest('hex'))
        console.log(hashBytes);
        console.log(hash);

        /*
        console.log(hex);

        console.log(Buffer.from(hex, 'hex'));
        */

        this.appService.confirm('Are you sure you want to send ' + this.formGroup.get('numberOfTokens').value + ' tokens to ' + this.formGroup.get('recipientAddress').value + '?', () => {
            const json = {
                privateKey: this.formGroup.get('privateKey').value,
                from: this.formGroup.get('address').value,
                to: this.formGroup.get('recipientAddress').value,
                value: parseInt(this.formGroup.get('numberOfTokens').value, 10),
            }
            this.spinner = true;
            this.post('http://mcgregor.io:1975/v1/test_transaction', json).subscribe( () => {
                setTimeout(() => {
                    this.get('http://mcgregor.io:1975/v1/balance/' + this.formGroup.get('address').value).subscribe( response => {
                        this.spinner = false;
                        this.balance = response.balance;
                        this.appService.success('Tokens sent! Your new balance is ' + this.balance);
                    });
                }, 5 * 1000);
            });
        });


    }

    /**
     *
     */
    public reset(): void {
        this.loading = true;
        this.formGroup.get('privateKey').setValue('dbb9eb135089c47e7ae678eed35933e13efa79c88731794add26c1a370b9efc9');
        this.formGroup.get('address').setValue('9d6fa5845833c42e1aa4b768f944c5e09fe968b0');
        this.formGroup.get('recipientAddress').setValue('c296220327589dc04e6ee01bf16563f0f53895bb');
        setTimeout(() => {
            this.get('http://mcgregor.io:1975/v1/balance/' + this.formGroup.get('address').value).subscribe( response => {
                this.loading = false;
                this.balance = response.balance;
            });
        }, 2 * 1000);
    }

    /**
     *
     * @param {string} url
     * @param json
     * @returns {Observable<any>}
     */
    public post(url: string, json: any) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const requestOptions = new RequestOptions({headers: headers});

        // Post.
        return this.http.post(url, JSON.stringify(json), requestOptions).map(response => response.json()).do(response => {
        }).catch(e => {
            this.spinner = false;
            this.loading = false;
            if (e.status === 0) {
                this.spinner = false;
                this.appService.error('Dispatch node is currently down for maintenance.');
            } else {
                const response = e.json();
                return new Observable(observer => {
                    observer.next(response);
                    observer.complete();
                });
            }
        });
    }

    /**
     *
     * @param {string} url
     * @returns {Observable<any>}
     */
    public get(url: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const requestOptions = new RequestOptions({headers: headers});

        // Post.
        return this.http.get(url, requestOptions).map(response => response.json()).do(response => {
        }).catch(e => {
            this.spinner = false;
            this.loading = false;
            if (e.status === 0) {
                this.spinner = false;
                this.appService.error('Dispatch node is currently down for maintenance.');
            } else {
                const response = e.json();
                return new Observable(observer => {
                    observer.next(response);
                    observer.complete();
                });
            }
        });
    }
}
