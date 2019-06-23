
export const PRIMITIVE_TYPES = {
    number: typeof (0),
    boolean: typeof (true)
};

export function isTypeOf(value, type) { return typeof (value) === type; }

export function isBoolean(value) { return isTypeOf(value, PRIMITIVE_TYPES.boolean); }

export function isNumber(value) { return !isNaN(value); }

export function isUndefined(value) { return isTypeOf(value, typeof (undefined)); }

export function isUndefinedOrNull(value) { return isUndefined(value) || (value === null); }

export function isUndefinedNullOrEmpty(value) { return isUndefinedOrNull(value) || !(Array.isArray(value) ? value : Object.keys(value)).length; }
