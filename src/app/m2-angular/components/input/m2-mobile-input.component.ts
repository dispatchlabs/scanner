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
 * M2MobileInputComponent
 */
@Component({
    selector: 'm2-mobile-input',
    templateUrl: './m2-mobile-input.component.html',
    styleUrls: ['m2-mobile-input.component.scss'],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: M2MobileInputComponent
        }]
})
export class M2MobileInputComponent implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {

    /**
     * Class level-declarations.
     */
    private static nextId = 0;
    @Input()
    public readonly = false;
    public formGroup: FormGroup;
    private formGroupSubscription: any;
    private part1Subscription: any;
    private part2Subscription: any;
    private part3Subscription: any;
    stateChanges = new Subject<void>();
    focused = false;
    private _disabled = false;
    private _placeholder: string;
    private _required = false;
    controlType = 'm2-mobile-input';
    public KeyHelper = KeyHelper;
    @ViewChild('part1Input')
    public part1InputElement: ElementRef;
    @ViewChild('part2Input')
    public part2InputElement: ElementRef;
    @ViewChild('part3Input')
    public part3InputElement: ElementRef;
    private _errorState = false;
    @HostBinding()
    id = `m2-mobile-input-${M2MobileInputComponent.nextId++}`;
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
            part1: '',
            part2: '',
            part3: '',
        });
        this.formGroupSubscription = this.formGroup.valueChanges.subscribe((value) => {
            this.propagateChange(this.value);
        });
        this.part1Subscription = this.formGroup.get('part1').valueChanges.subscribe((value) => {
            if (value.length > 3) {
                this.formGroup.get('part1').setValue(value.slice(0, -1));
                return;
            }
            if (value && value.length === 3) {
                this.part2InputElement.nativeElement.focus();
                this.part2InputElement.nativeElement.select();
            }
        });
        this.part2Subscription = this.formGroup.get('part2').valueChanges.subscribe((value) => {
            if (value.length > 3) {
                this.formGroup.get('part2').setValue(value.slice(0, -1));
                return;
            }
            if (value && value.length === 3) {
                this.part3InputElement.nativeElement.focus();
                this.part3InputElement.nativeElement.select();
            }
        });
        this.part3Subscription = this.formGroup.get('part3').valueChanges.subscribe((value) => {
            if (value.length > 4) {
                this.formGroup.get('part3').setValue(value.slice(0, -1));
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
        this.part1Subscription.unsubscribe();
        this.part2Subscription.unsubscribe();
        this.part3Subscription.unsubscribe();
        this.stateChanges.complete();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }

    /**
     *
     */
    public onPart2Focus(): void {
        if (this.formGroup.get('part1').value.length !== 3) {
            this.part1InputElement.nativeElement.focus();
        }
    }

    /**
     *
     */
    public onPart3Focus(): void {
        if (this.formGroup.get('part2').value.length !== 3) {
            this.part1InputElement.nativeElement.focus();
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
        return !value.part1 && !value.part2 && !value.part3;
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
     * @returns {string | null}
     */
    @Input()
    get value(): string | null {
        const formGroupValue = this.formGroup.value;
        if (formGroupValue.part1.length === 3 && formGroupValue.part2.length === 3 && formGroupValue.part3.length === 4) {
            this._errorState = false;
            return '+1' + formGroupValue.part1 + formGroupValue.part2 + formGroupValue.part3;
        }
        return null;
    }

    /**
     *
     * @param {string | null} mobile
     */
    set value(mobile: string | null) {
        if (M2Util.isNullOrEmpty(mobile)) {
            this.formGroup.setValue({part1: '', part2: '', part3: ''});
            return;
        }
        this.formGroup.setValue({part1: mobile.substr(2, 3), part2: mobile.substr(5, 3), part3: mobile.substr(8, 4)});
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
}

