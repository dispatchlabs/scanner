import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, HostBinding, Input, OnDestroy, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';
import {KeyHelper} from '../../helpers/key-helper';
import {M2Util} from '../../utils/m2-util';

// TODO: When tabbing to this component the placeholder does not float! MAO!

/**
 * M2CurrencyInputComponent
 */
@Component({
    selector: 'm2-currency-input',
    templateUrl: './m2-currency-input.component.html',
    styleUrls: ['m2-currency-input.component.scss'],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: M2CurrencyInputComponent
        }]
})
export class M2CurrencyInputComponent implements ControlValueAccessor, MatFormFieldControl<number>, OnDestroy {

    /**
     * Class level-declarations.
     */
    private static nextId = 0;
    @Input()
    public readonly = false;
    stateChanges = new Subject<void>();
    focused = false;
    private _disabled = false;
    private _placeholder: string;
    private _required = false;
    controlType = 'm2-currency-input';
    public KeyHelper = KeyHelper;
    @ViewChild('dayInput')
    public dayInputElement: ElementRef;
    @ViewChild('yearInput')
    public yearInputElement: ElementRef;
    private _errorState = false;
    @HostBinding()
    id = `m2-currency-input-${M2CurrencyInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby')
    describedBy = '';
    @ViewChild('input')
    public input: any;
    public currency: string;
    public position = 0;

    /**
     *
     * @param {FormBuilder} formBuilder
     * @param {FocusMonitor} focusMonitor
     * @param {ElementRef} elementRef
     */
    constructor(public ngControl: NgControl, formBuilder: FormBuilder, private focusMonitor: FocusMonitor, private elementRef: ElementRef) {
        focusMonitor.monitor(elementRef.nativeElement, true).subscribe((origin) => {
            if (!origin) {
                this._errorState = this.value == null ? true : false;
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });
        ngControl.valueAccessor = this;
    }

    /**
     *
     */
    ngOnDestroy() {
        this.stateChanges.complete();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }

    /**
     *
     */
    public onFocus(): void {
        if (this.currency === '0') {
            this.currency = '';
        }
        setTimeout(() => {
            this.input.nativeElement.selectionStart = 0;
            this.input.nativeElement.selectionEnd = 0;
        }, 1);
    }

    /**
     *
     */
    private propagateChange: any = () => {
    }

    /**
     *
     * @param value
     */
    writeValue(value: any) {
        this.value = value;
    }

    /**
     *
     * @param callback
     */
    registerOnChange(callback) {
        this.propagateChange = callback;
    }

    /**
     *
     * @param {() => void} callback
     */
    registerOnTouched(callback: () => void): void {
    }

    /**
     *
     * @returns {boolean}
     */
    get empty() {
        return !this.currency ? true : false;
    }

    /**
     *
     * @returns {boolean}
     */
    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    /**
     *
     * @returns {boolean}
     */
    @Input()
    get errorState() {
        return this._errorState;
    }

    /**
     *
     * @returns {string}
     */
    @Input()
    get placeholder() {
        return this._placeholder;
    }

    /**
     *
     * @param placeholder
     */
    set placeholder(placeholder) {
        this._placeholder = placeholder;
        this.stateChanges.next();
    }

    /**
     *
     * @returns {boolean}
     */
    @Input()
    get required() {
        return this._required;
    }

    /**
     *
     * @param required
     */
    set required(required) {
        this._required = coerceBooleanProperty(required);
        this.stateChanges.next();
    }

    /**
     *
     * @returns {boolean}
     */
    @Input()
    get disabled() {
        return this._disabled;
    }

    /**
     *
     * @param disable
     */
    set disabled(disable: boolean) {
        this._disabled = coerceBooleanProperty(disable);
        this.stateChanges.next();
    }

    /**
     *
     * @returns {string | null}
     */
    @Input()
    get value(): number | null {
        if (M2Util.isNullOrEmpty(this.currency)) {
            return 0;
        } else if (this.currency.indexOf('.') === -1) {
            return parseInt(this.currency.replace(/[^0-9]/g, ''), 10) * 100;
        } else {
            switch (this.currency.split('.')[1].length) {
                case 0:
                    return parseInt(this.currency.replace(/[^0-9]/g, ''), 10) * 100;
                case 1:
                    return parseInt(this.currency.replace(/[^0-9]/g, ''), 10) * 10;
                case 2:
                    return parseInt(this.currency.replace(/[^0-9]/g, ''), 10);
                default:
                    return 0;
            }
        }
    }

    /**
     *
     * @param {string | null} mobile
     */
    set value(value: number | null) {
        if (M2Util.isNullOrNaN(value)) {
            this.currency = '';
        } else {
            this.currency = this.formatCurrency((value / 100).toString());
        }
        this.stateChanges.next();
    }

    /**
     *
     * @param {string[]} ids
     */
    public setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    /**
     *
     * @param {MouseEvent} event
     */
    public onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    }

    /**
     *
     * @param {string} value
     */
    private update(value: string): void {
        this.currency = this.formatCurrency(value);
        this.propagateChange(this.value);

        // Set cursor position.
        setTimeout(() => {
            this.input.nativeElement.selectionStart = this.position;
            this.input.nativeElement.selectionEnd = this.position;
        }, 1);
    }

    /**
     *
     * @param key
     * @returns {boolean}
     */
    public onKeyDown(key: any): boolean {
        if (this.readonly) {
            return false;
        }

        let maskedValue = this.currency;
        this.position = this.input.nativeElement.selectionStart;
        const endPosition = this.input.nativeElement.selectionEnd;

        // key?
        switch (key) {
            case 'Tab':
            case 'ArrowRight':
            case 'Enter':
                return true;
            case 'Backspace':
                if (this.position === endPosition) {
                    this.position--;
                    maskedValue = this.replaceAt(maskedValue, this.position, '');
                } else {
                    for (let i = endPosition; i >= this.position; i--) {
                        maskedValue = this.replaceAt(maskedValue, i, '');
                    }
                    this.position -= (endPosition - this.position);
                }
                this.update(maskedValue);
                return false;
            default:
                if (!/^[0-9.]+$/.test(key)) {
                    return false;
                }
                break;
        }

        if (!maskedValue) {
            maskedValue = '';
        }

        if (endPosition > this.position) {
            maskedValue = maskedValue.substring(0, this.position);
        }

        if (maskedValue.length === 1 && maskedValue[0] === '0' && key !== '.') {
            return false;
        }

        const decimalPosition = maskedValue.indexOf('.');
        if (key === '.') {
            if (decimalPosition !== -1 && this.position > decimalPosition) {
                this.position = 3;
                this.update('0.00');
                return false;
            } else {
                maskedValue = maskedValue.replace('.', '');
                maskedValue = maskedValue.substring(0, this.position) + '.' + maskedValue.substring(this.position, this.position + 2);
                switch (maskedValue.split('.')[1].length) {
                    case 0:
                        maskedValue += '00';
                        break;
                    case 1:
                        maskedValue += '0';
                        break;
                }
                this.position++;
                this.update(maskedValue);
                return false;
            }
        }

        if (decimalPosition === -1 || this.position <= decimalPosition) {
            maskedValue = maskedValue.substr(0, this.position) + key + maskedValue.substr(this.position);
            this.position++;
            this.update(maskedValue);
            return false;
        }

        if (decimalPosition !== -1 && (this.position - decimalPosition) > 2) {
            return false;
        }

        if (decimalPosition !== -1 && this.position > decimalPosition && key !== '.') {
            maskedValue = this.replaceAt(maskedValue, this.position, key);
            this.position++;
            this.update(maskedValue);
            return false;
        }

        return false;
    }

    /**
     *
     * @param s
     * @param n
     * @param t
     * @returns {string}
     */
    private replaceAt(s, n, t) {
        return s.substring(0, n) + t + s.substring(n + 1);
    }

    /**
     *
     * @param {string} value
     * @returns {string}
     */
    private formatCurrency(value: string): string {
        const commasBefore = value.split(',').length - 1;
        let formattedValue = value.replace(/\$/g, '');
        formattedValue = formattedValue.replace(/\,/g, '');
        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        const commasAfter = formattedValue.split(',').length - 1;

        this.position += (commasAfter - commasBefore);

        return formattedValue;
    }
}

