import axios from "axios";
import {API_URL} from '../types';
// const API_URL = 'http://51ff-180-74-65-214.ngrok.io';

export const loginAction = (data) => (dispatch) => {
    dispatch({ type: 'LOGIN', payload: data});
    console.log('data action', data);
    try {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.post(`${API_URL}/api/login`, {
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
                
            })
            .catch((error) => {
                //for example if there the API key is not valid
                console.log('error', error);
                alert('Invalid input parameters. Please insert registered email and password');
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
}

export const logout = (data) => (dispatch) => {
    dispatch({
        type: 'LOGOUT',
        payload: data,
    })
    console.log("data", data.token);
    // console.log('redux token', token);
    try {
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.post(`${API_URL}/api/logout`,{
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

// export const fetchList = (id) => (dispatch) => {
//     dispatch({
//         type: 'FETCH_CATEGORY',
//         payload: id,
//     });
//     console.log('id carry', id);
//     try {
//         axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
//         axios.get(`http://localhost:8000/api/getlist/${id}`)
//         .then((res) => {
//             console.log('res....', res);
//             console.log('id after axios',id)
//             // console.log('res data', res.data);
            
//             dispatch({
//                 type: 'FETCH_CATEGORY_SUCCESS',
//                 payload: res.data,
//             })
//         })
//     }
//     catch (error) {
//         // console.log("error", error);
//         dispatch({
//             type: 'FETCH_CATEGORY_FAIL',
//             error: error.response.data.Error,
//         })
//     }
// }