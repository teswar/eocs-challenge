export function toTitleCase(value) {
    return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function toSnakeCase(value, toUpperCase) {
    if (!value) { return value; }
    value = value.replace(new RegExp(' ', 'g'), '_');
    return (toUpperCase) ? value.toUpperCase() : value.toLowerCase();
}

export function fromSnakeCase(value) {
    return !value ? value : value.replace(new RegExp('_', 'g'), ' ');
}