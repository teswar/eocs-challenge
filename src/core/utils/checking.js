
export const PRIMITIVE_TYPES = {
    string: typeof (''),
    number: typeof (0),
    boolean: typeof (true)
    // function: typeof (() => {})
};

export function isTypeOf(value, type) { return typeof (value) === type; }

/**
 * Checks if value is a string.
 * @param {any} value - value to check
 * @returns {boolean} 
 */
export function isString(value) { return isTypeOf(value, PRIMITIVE_TYPES.string); }

/**
 * Checks if value is a boolean.
 * @param {any} value - value to check
 * @returns {boolean} 
 */
export function isBoolean(value) { return isTypeOf(value, PRIMITIVE_TYPES.boolean); }

/**
 * Checks if value is a number.
 * @param {any} value - value to check
 * @returns {boolean} 
 */
export function isNumber(value) { return !isNaN(value); }

/**
 * Checks if value is a function.
 * @param {any} value - value to check
 * @returns {boolean} 
 */
export function isFunction(value) { return isTypeOf(value, PRIMITIVE_TYPES.function); }

/**
 * Checks if value is undefined.
 * @param {any} value - value to check
 * @returns {boolean} 
 */
export function isUndefined(value) { return isTypeOf(value, typeof (undefined)); }

/**
 * Checks if values is undefined or null.
 * @param {any} value - value to check
 * @returns {boolean} 
 */
export function isUndefinedOrNull(value) { return isUndefined(value) || (value === null); }

/**
 * Checks if values is undefined, null or empty.
 * @param {any} value - value to check
 * @returns {boolean} 
 */
export function isUndefinedNullOrEmpty(value) { return isUndefinedOrNull(value) || !(Array.isArray(value) ? value : Object.keys(value)).length; }
