/**
 *
 */
export class M2Util {

    /**
     *
     * @param {string} value
     * @returns {boolean}
     */
    public static isNullOrEmpty(value: string): boolean {
        return (value == null || value.length === 0) ? true : false;
    }

    /**
     *
     * @param {number} value
     * @returns {boolean}
     */
    public static isNullOrNaN(value: number): boolean {
        return (value == null || Number.isNaN(value)) ? true : false;
    }
}
