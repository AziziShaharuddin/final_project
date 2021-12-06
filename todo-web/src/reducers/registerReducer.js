const defaultState = () => ({
    isLoading: false,
    data: {},
    error: null,
});

const registerReducer = (state, action) => {
    if (state === undefined) {
        return defaultState();
    }

    switch (action.type) {
        case 'REGISTER':
            return {
                isLoading: true,
                data: {},
                error: null,
            }
        case 'REGISTER_SUCCESS':
            return {
                isLoading: false,
                data: action.payload,
                error: null,
            }
        case 'REGISTER_FAIL':
            return {
                isLoading: false,
                data: {},
                error: action.error
            }
        default:
            return state;
    }
}

export default registerReducer;