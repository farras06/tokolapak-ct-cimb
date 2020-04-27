import Axios from "axios";
import { API_URL } from '../../constatnts/API'

import userType from "../types/user"

const { ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS } = userType

export const usernameInputHandler = (text) => {
    return {
        type: "ON_CHANGE_USERNAME",
        payload: text,
    };
};

export const loginHandler = (userData) => {
    return (dispatch) => {
        const { username, password } = userData
        Axios.get(`${API_URL}/user`, {
            params: {
                username,
                password
            }
        })
            .then(res => {
                console.log(res)
                if (res.data.length > 0) {
                    // alert('bisa')

                    dispatch({
                        type: ON_LOGIN_SUCCESS,
                        payload: res.data[0]
                    })
                } else {
                    dispatch({
                        type: ON_LOGIN_FAIL,
                        payload: "Username or password incorrect"
                    })
                }
            })

            .catch((err) => {
                console.log(err)
            })
    };
}


export const registerHandler = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                username: userData.username,
            },
        })
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch({
                        type: "ON_REGISTER_FAIL",
                        payload: "username sudah digunakan",
                    });
                } else {
                    Axios.post(`${API_URL}/users`, userData)
                        .then((res) => {
                            console.log(res.data);
                            dispatch({
                                type: ON_LOGIN_SUCCESS,
                                payload: res.data,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const LogoutHandler = () => {
    return {
        type: ON_LOGOUT_SUCCESS,
        payload: "",
    }
}
