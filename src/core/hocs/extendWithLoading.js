import { isUndefinedOrNull } from '../utils';

export function extendWithLoading({ ParentComponent, initialState }) {
    return class extends ParentComponent {
        constructor(props) {
            super(props);
            this.state = Object.assign(this.state || {}, initialState);
        }

        composeLoadingState(status, nState) {
            var { isLoading } = this.state;
            isLoading = !isUndefinedOrNull(status) ? status : isUndefinedOrNull(isLoading) || !isLoading;
            return Object.assign(nState || {}, { isLoading });
        }
    };
}

extendWithLoading.INITIAL_STATE = Object.freeze({ isLoading: false });