export function extendWithListing({ ParentComponent, initialState, fetch }) {
    return class extends ParentComponent {
        constructor(props) {
            super(props);
            this.state = Object.assign(this.state || {}, initialState);
        }

        componentDidMount() {
            this.fetch();
        }

        composeOnFetchState(data, nState) {
            return Object.assign(nState || {}, { items: data });
        }

        fetch(nQuery) {
            return fetch(nQuery)
                .then((data) => this.composeOnFetchState(data, nQuery))
                .then((state) => this.setState(state));
        }
    };
}

extendWithListing.INITIAL_STATE = Object.freeze({ items: [] });


