// const defaultState = () => ({
//     isLoading: false,
//     data: {},
//     error: null,
//     token: "",
// });

// const logoutReducer = (state, action) => {
//     if (state === undefined) {
//         return defaultState();
//     }

//     switch (action.type) {
//         case 'LOGOUT':
//             return {
//                 isLoading: true,
//                 data: action.payload,
//                 error: null,
//                 token: action.payload.data.access_token
//             }
//         case 'LOGOUT_SUCCESS':
//             return {
//                 isLoading: false,
//                 data: {},
//                 error: null,
//                 token: "",
//             }
//         case 'LOGOUT_FAIL':
//             return {
//                 isLoading: false,
//                 data: {},
//                 error: action.error
//             }
//         default:
//             return state;
//     }
// }

// export default logoutReducer;