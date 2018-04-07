/**
 * KeyHelper
 */
export class KeyHelper {

    /**
     *
     * @param event
     * @param {number} maxLength
     * @returns {boolean}
     */
    public static onNumericKeyDown(event: any, maxLength: number): boolean {
        switch (event.key) {
            case 'Tab':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Enter':
            case 'Backspace':
                return true;
            default:
                if (!/^[0-9]+$/.test(event.key)) {
                    return false;
                }
                if (event.target.selectionStart >= maxLength && event.target.selectionEnd >= maxLength) {
                    return false;
                }
        }
        return true;
    }

    /**
     *
     * @param event
     * @param {number} maxLength
     * @returns {boolean}
     */
    public static onAlphaNumericKeyDown(event: any, maxLength: number): boolean {
        switch (event.key) {
            case 'Tab':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Enter':
            case 'Backspace':
                return true;
            default:
                if (!/^[0-9a-zA-Z]+$/.test(event.key)) {
                    return false;
                }
                if (event.target.selectionStart >= maxLength && event.target.selectionEnd >= maxLength) {
                    return false;
                }
        }
        return true;
    }

    /**
     *
     * @param event
     * @param {number} maxLength
     * @returns {boolean}
     */
    public static onHexKeyDown(event: any, maxLength: number): boolean {
        if (event.metaKey === true && event.key === 'v') {
            return true;
        }
        switch (event.key) {
            case 'Tab':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Enter':
            case 'Backspace':
                return true;
            default:
                if (!/^[0-9a-fA-F]+$/.test(event.key)) {
                    return false;
                }
                if (event.target.selectionStart >= maxLength && event.target.selectionEnd >= maxLength) {
                    return false;
                }
        }
        return true;
    }
}
