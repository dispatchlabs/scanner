import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, forwardRef, HostBinding, Input, OnDestroy, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material';
import {Subject} from 'rxjs';
import {M2Util} from '../../utils/m2-util';
import {KeyHelper} from '../../helpers/key-helper';

// TODO: When tabbing to this component the placeholder does not float! MAO!

/**
 * M2DateInputComponent
 */
@Component({
    selector: 'm2-date-input',
    templateUrl: './m2-date-input.component.html',
    styleUrls: ['m2-date-input.component.scss'],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: M2DateInputComponent
        }]
})
export class M2DateInputComponent implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy {

    /**
     * Class level-declarations.
     */
    private static nextId = 0;
    @Input()
    public readonly = false;
    public formGroup: FormGroup;
    private formGroupSubscription: any;
    private monthSubscription: any;
    private daySubscription: any;
    private yearSubscription: any;
    stateChanges = new Subject<void>();
    focused = false;
    private _disabled = false;
    private _placeholder: string;
    private _required = false;
    controlType = 'm2-date-input';
    public KeyHelper = KeyHelper;
    @ViewChild('monthInput')
    public monthInputElement: ElementRef;
    @ViewChild('dayInput')
    public dayInputElement: ElementRef;
    @ViewChild('yearInput')
    public yearInputElement: ElementRef;
    private _errorState = false;
    @HostBinding()
    id = `m2-date-input-${M2DateInputComponent.nextId++}`;
    @HostBinding('attr.aria-describedby')
    describedBy = '';

    /**
     *
     * @param {FormBuilder} formBuilder
     * @param {FocusMonitor} focusMonitor
     * @param {ElementRef} elementRef
     */
    constructor(public ngControl: NgControl, formBuilder: FormBuilder, private focusMonitor: FocusMonitor, private elementRef: ElementRef) {
        this.formGroup = formBuilder.group({
            month: '',
            day: '',
            year: '',
        });
        this.formGroupSubscription = this.formGroup.valueChanges.subscribe((value) => {
            this.propagateChange(this.value);
        });
        this.monthSubscription = this.formGroup.get('month').valueChanges.subscribe((value) => {
            if (value.length > 2) {
                this.formGroup.get('month').setValue(value.slice(0, -1));
                return;
            }
            if (value && value.length === 2) {
                this.dayInputElement.nativeElement.focus();
                this.dayInputElement.nativeElement.select();
            }
        });
        this.daySubscription = this.formGroup.get('day').valueChanges.subscribe((value) => {
            if (value.length > 2) {
                this.formGroup.get('day').setValue(value.slice(0, -1));
                return;
            }
            if (value && value.length === 2) {
                this.yearInputElement.nativeElement.focus();
                this.yearInputElement.nativeElement.select();
            }
        });
        this.yearSubscription = this.formGroup.get('year').valueChanges.subscribe((value) => {
            if (value.length > 4) {
                this.formGroup.get('year').setValue(value.slice(0, -1));
                return;
            }
        });
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
        this.formGroupSubscription.unsubscribe();
        this.monthSubscription.unsubscribe();
        this.daySubscription.unsubscribe();
        this.yearSubscription.unsubscribe();
        this.stateChanges.complete();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }

    /**
     *
     */
    public onDayFocus(): void {
        if (this.formGroup.get('month').value.length !== 2) {
            this.monthInputElement.nativeElement.focus();
        }
    }

    /**
     *
     */
    public onYearFocus(): void {
        if (this.formGroup.get('day').value.length !== 2) {
            this.dayInputElement.nativeElement.focus();
        }
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
        const value = this.formGroup.value;
        return !value.month && !value.day && !value.year;
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
     * @param dis
     */
    set disabled(dis) {
        this._disabled = coerceBooleanProperty(dis);
        this.stateChanges.next();
    }

    /**
     *
     * @returns {any | null}
     */
    @Input()
    get value(): any | null {
        const formGroupValue = this.formGroup.value;
        if (formGroupValue && formGroupValue.month.length === 2 && formGroupValue.day.length === 2 && formGroupValue.year.length === 4) {
            this._errorState = false;
            return {year: parseInt(formGroupValue.year, 10), month: parseInt(formGroupValue.month, 10), day: parseInt(formGroupValue.day, 10)};
        }
        return null;
    }

    /**
     *
     * @param {string | null} mobile
     */
    set value(date: any | null) {
        if (date == null || date.year == null || date.month == null || date.day == null) {
            this.formGroup.setValue({month: '', day: '', year: ''});
            return;
        }
        this.formGroup.setValue({month: this.padZeros(date.month, 2), day: this.padZeros(date.day, 2), year: '' + date.year});
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
     * @param {number} value
     * @param {number} size
     * @returns {string}
     */
    private padZeros(value: number, size: number): string {
        let s = value + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }
}

