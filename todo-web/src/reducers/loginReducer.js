const defaultState = () => ({
    isLoading: false,
    data: {},
    error: null,
    token: '',
});

const loginReducer = (state, action) => {
    if (state === undefined) {
        return defaultState();
    }

    switch (action.type) {
        case 'LOGIN':
            return {
                isLoading: true,
                data: {},
                error: null,
            }
        case 'LOGIN_SUCCESS':
            return {
                isLoading: false,
                data: action.payload,
                error: null,
                token: action.payload.data.access_token,
            }
        case 'LOGIN_FAIL':
            return {
                isLoading: false,
                data: {},
                error: action.error
            }
        case 'LOGOUT':
            return {
                isLoading: true,
                data: action.payload,
                error: null,
                token: action.payload.data.access_token
            }
        case 'LOGOUT_SUCCESS':
            return {
                isLoading: false,
                data: {},
                error: null,
                token: "",
            }
        case 'LOGOUT_FAIL':
            return {
                isLoading: false,
                data: {},
                error: action.error
            }
        default:
            return state;
    }
}

export default loginReducer;