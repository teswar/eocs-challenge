import moment from 'moment';
import { isUndefinedOrNull, isNumber, isBoolean } from '../utils';

export function extendWithSorting({ ParentComponent, initialState }) {
    return class extends ParentComponent {
        constructor(props) {
            super(props);
            this.state = Object.assign(this.state || {}, initialState);
        }

        onSortingChange(sorting) {
            const { items } = this.state;
            this.setState(this.composeOnSortState(items, sorting, { sorting }));
        }

        composeOnSortState(items, sorting, nState) {
            return Object.assign(nState || {}, { items: sortBy([...items], sorting, moment.locale(), getAccumilatedSortOrder) });
        }

        composeOnFetchState(data, nState) {
            nState = super.composeOnFetchState(data, nState);
            const { items, sorting } = nState;
            return this.composeOnSortState(items, sorting, nState);
        }


        fetch(nQuery) {
            const { sorting } = this.state;
            return super.fetch({ sorting, ...nQuery });
        }
    };
}

extendWithSorting.INITIAL_STATE = Object.freeze({ sorting: {} });



export function sortBy(source, sortingDefinitions, locale, compare) {
    sortingDefinitions = Object.keys(sortingDefinitions).reverse().reduce((result, current) => result.push({ property: current, ascending: sortingDefinitions[current] }) && result, []);
    return source.sort((current, next) => compare(current, next, sortingDefinitions, locale));
}

export function getAccumilatedSortOrder(current, next, sortingDefinitions, locale) {
    var result = 0;
    sortingDefinitions.every(({ property, ascending }) => (result = getSortOrder(current, next, property, ascending, locale)) === 0);
    return result;
}

export function getSortOrder(current, next, property, ascending, locale) {
    return ((isUndefinedOrNull(ascending) || ascending) ? 1 : -1) *
        (isUndefinedOrNull(current[property]) && isUndefinedOrNull(next[property]) ? 0
            : !isUndefinedOrNull(current[property]) && isUndefinedOrNull(next[property]) ? 1
                : isUndefinedOrNull(current[property]) && !isUndefinedOrNull(next[property]) ? -1
                    : isNumber(current[property]) && isNumber(next[property]) ? (current[property] - next[property])
                        : isBoolean(current[property]) && isBoolean(next[property]) ? (current[property] - next[property])
                            : (current[property].trim().localeCompare(next[property].trim(), locale, { sensitivity: 'base' })));
}
