import { extendWithListing, extendWithSorting , extendWithLoading } from '.';

export function createListing({ ParentComponent, initialState, fetch }) {
    console.log(arguments);
    ParentComponent = extendWithListing({ ParentComponent, initialState, fetch });
    ParentComponent = extendWithSorting({ ParentComponent });
    ParentComponent = extendWithLoading({ ParentComponent });

    return class extends ParentComponent {
        fetch(nQuery) {
            this.setState(this.composeLoadingState());
            return super.fetch(nQuery).finally(() => this.setState(this.composeLoadingState(false)));
        }
    };
}


createListing.INITIAL_STATE = Object.freeze({ 
    ...extendWithLoading.INITIAL_STATE, 
    ...extendWithSorting.INITIAL_STATE, 
    ...extendWithListing.INITIAL_STATE
});


