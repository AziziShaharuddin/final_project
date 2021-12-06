const defaultState = () => ({
    isLoading: false,
    data: {},
    error: null,
    // token: '',
});

const retrieveReducer = (state, action) => {
    if (state === undefined) {
        return defaultState();
    }

    switch (action.type) {
        case 'RETRIEVE':
            return {
                isLoading: true,
                data: {},
                error: null,
            }
        case 'RETRIEVE_SUCCESS':
            return {
                isLoading: false,
                data: action.payload,
                error: null,
                // token: action.payload.data.access_token,
            }
        case 'RETRIEVE_FAIL':
            return {
                isLoading: false,
                data: {},
                error: action.error
            }
        default:
            return state;
    }
}

export default retrieveReducer;