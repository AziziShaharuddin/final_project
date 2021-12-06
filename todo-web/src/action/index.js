import axios from 'axios';
// const API_URL = 'http://4f13-49-124-200-218.ngrok.io';

export const login = (data) => (dispatch) => {
    dispatch({
        type: 'LOGIN',
        payload: data,
    });
    console.log('login data', data);
    try {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.post(`http://localhost:8000/api/login`, {
            email: data.email,
            password: data.password
        })
            .then((res) => {
                console.log('res....', res);
                console.log('res data', res.data);
                
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data,
                })
                
                // if (res.data.code === 200 && res.data.status === "true") {
                //     console.log('res....', res);
                //     console.log('res data', res.data);
                //     dispatch({
                //         type: 'LOGIN_SUCCESS',
                //         payload: res.data,
                //     })
                // } else {
                //     alert(res.data.Error);
                // }
            })
            .catch((error) => {
                //for example if there the API key is not valid
                console.log('error', error);
                dispatch({
                    type: 'LOGIN_FAIL',
                    error: error.response.data.Error,
                })
            })
    }
    catch (error) {
        // console.log("error", error);
        dispatch({
            type: 'LOGIN_FAIL',
            error: error.response.data.Error,
        })
    }

};

export const logout = (data) => (dispatch) => {
    dispatch({
        type: 'LOGOUT',
        payload: data,
    })
    console.log("data", data.token);
    // console.log('redux token', token);
    try {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.post(`http://localhost:8000/api/logout`,{
            token: data.token
        })
            .then((res) => {
                console.log('res....', res);
                console.log('res data', res.data);
                
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                    payload: res.data,
                })
                
                // if (res.data.code === 200) {
                //     // console.log('res....', res);
                //     // console.log('res data', res.data);
                //     // dispatch({
                //     //     type: 'LOGOUT_SUCCESS',
                //     //     payload: [],
                //     // })
                // } else {
                //     alert(res.data.Error);
                // }
            })
            .catch((error) => {
                //for example if there the API key is not valid
                console.log('error try', error);
                dispatch({
                    type: 'LOGOUT_FAIL',
                    error: error.response.data.Error,
                })
            })
    }
    catch (error) {
        // console.log("error", error);
        dispatch({
            type: 'LOGOUT_FAIL',
            error: error.response.data.Error,
        })
    }
}

export const retrieveAll = (data) => (dispatch) => {
    dispatch({
        type: 'RETRIEVE',
        payload: data,
    });
    console.log('data apa',data);
    try {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.get(`http://localhost:8000/api/retrieve/${data}`)
            .then((res) => {
                console.log('res data', res.data);
                
                dispatch({
                    type: 'RETRIEVE_SUCCESS',
                    payload: res.data,
                })
                
            })
            .catch((error) => {
                //for example if there the API key is not valid
                console.log('error', error);
                dispatch({
                    type: 'RETRIEVE_FAIL',
                    error: error.response.data.Error,
                })
            })
    }
    catch (error) {
        // console.log("error", error);
        dispatch({
            type: 'RETRIEVE_FAIL',
            error: error.response.data.Error,
        })
    }
}

// export const register = (data) => (dispatch) => {
//     dispatch({
//         type: 'REGISTER',
//         payload: data,
//     });
//     console.log('register data', data);
//     try {
//         axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
//         axios.post(`${API_URL}/api/register`, {
//             name: data.name,
//             email: data.email,
//             password: data.password
//         })
//             .then((res) => {
//                 console.log('res....', res);
//                 console.log('res data', res.data);
                
//                 dispatch({
//                     type: 'REGISTER_SUCCESS',
//                     payload: res.data,
//                 })

//             })
//             .catch((error) => {
//                 //for example if there the API key is not valid
//                 console.log('error', error);
//                 dispatch({
//                     type: 'REGISTER_FAIL',
//                     error: error.response.data.Error,
//                 })
//             })
//     }
//     catch (error) {
//         // console.log("error", error);
//         dispatch({
//             type: 'REGISTER_FAIL',
//             error: error.response.data.Error,
//         })
//     }

// };