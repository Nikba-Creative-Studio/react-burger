import { baseUrl } from '../../utils/config';
import { checkResponse } from "../../utils/helpers";

export const REGISTER_USER_REQUEST = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const USER_INFO_REQUEST = 'USER_INFO';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

// Регистрация пользователя
export function registerUserSuccess(user) {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: {
            user
        }
    }
}

export function registerUserFailure(error) {
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            error
        }
    }
}

export function registerUser(body) {
    return function(dispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST
        });

        fetch(`${baseUrl}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(checkResponse)
            .then(res => res.json())
            .then((user) => {
                // Сохраняем данные пользователя в сторе
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('refreshToken', user.refreshToken);
                
                dispatch(registerUserSuccess(user))
            })
            .catch(error => dispatch(registerUserFailure(error)))
    }
}

// Авторизация пользователя
export function loginUserSuccess(user) {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            user
        }
    }
}

export function loginUserFailure(error) {
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            error
        }
    }
}

export function loginUser(body) {
    return function(dispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST
        });

        fetch(`${baseUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(checkResponse)
            .then(res => res.json())
            .then((user) => {
                
                // Сохраняем данные пользователя в сторе
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('refreshToken', user.refreshToken);
                
                dispatch(loginUserSuccess(user))
            })
            .catch(error => dispatch(loginUserFailure(error)))
    }
}
