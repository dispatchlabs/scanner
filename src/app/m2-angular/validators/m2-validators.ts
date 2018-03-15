import {FormControl} from '@angular/forms';

/**
 * M2Validators
 */
export class M2Validators {

    /**
     *
     * @param {FormControl} control
     * @returns {any}
     */
    public static notZero(control: FormControl) {
        return control.value > 0 ? null : {'notZero': true};
    }

    /**
     *
     * @param control
     */
    public static email(control: FormControl) {

        if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(control.value)) {
            return null;
        }

        return {'invalidEmail': true};
    }

    /**
     *
     * @param control
     */
    public static mobile(control: FormControl) {

        if (/^(\+?(\d{1}|\d{2}|\d{3})[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/.test(control.value)) {
            return null;
        }

        return {'invalidMobile': true};
    }

    /**
     *
     * @param control
     */
    public static creditCard(control: FormControl) {

        if (/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(control.value)) {
            return null;
        }

        return {'invalidCreditCard': true};
    }

    /**
     *
     * @param control
     */
    public static cvc(control: FormControl) {

        if (/^[0-9]{3,4}$/.test(control.value)) {
            return null;
        }

        return {'invalidCvc': true};
    }

    /**
     *
     * @param control
     */
    public static password(control: FormControl) {

        if (/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/.test(control.value)) {
            return null;
        }

        return {'invalidPassword': true};
    }

    /**
     *
     * @param control
     */
    public static zipCode(control: FormControl) {

        if (/^(\d{5}-\d{4}|\d{5})$/.test(control.value)) {
            return null;
        }

        return {'invalidZipCode': true};
    }

    /**
     *
     * @param control
     * @returns {any}
     */
    public static alphanumeric(control: FormControl) {

        if (/^[a-zA-Z0-9]*$/.test(control.value)) {
            return null;
        }

        return {'invalidAlphanumeric': true};
    }
}