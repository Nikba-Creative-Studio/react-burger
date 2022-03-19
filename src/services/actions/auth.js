import { baseUrl } from '../../utils/config';
import {
    checkResponse,
    setCookie,
    getCookie,
    deleteCookie
} from "../../utils/helpers";

import { updateToken, fetchUpdateToken } from '../api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const USER_INFO_REQUEST = 'USER_INFO';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

export const EDIT_USER_REQUEST = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';


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
    return async dispatch => {
        dispatch({
            type: REGISTER_USER_REQUEST
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };

        await fetch(`${baseUrl}auth/register`, requestOptions)
            .then(checkResponse)
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch(registerUserSuccess(data.user));
            })
            .catch(error => {
                dispatch(registerUserFailure(error));
            });
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
    return async function (dispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        await fetch(`${baseUrl}auth/login`, requestOptions)
            .then(checkResponse)
            .then((data) => {
                // Сохраняем данные пользователя в сторе и куки
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);

                dispatch(loginUserSuccess(data))
            })
            .catch(error => dispatch(loginUserFailure(error)))
    }
}

// Редактирование пользователя
export function editUserSuccess(user) {
    return {
        type: EDIT_USER_SUCCESS,
        payload: {
            user
        }
    }
}

export function editUserFailure(error) {
    return {
        type: EDIT_USER_FAILURE,
        payload: {
            error
        }
    }
}

export function editUser(body) {
    return async function (dispatch) {
        dispatch({
            type: EDIT_USER_REQUEST
        });

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify(body)
        }

        await fetchUpdateToken(`${baseUrl}auth/user`, requestOptions)
            .then((user) => {
                dispatch(editUserSuccess(user))
            })
            .catch(error => dispatch(editUserFailure(error)))
    }
}

// Выход пользователя
export function userLogoutSuccess() {
    return {
        type: USER_LOGOUT_SUCCESS
    }
}

export function userLogoutFailure(error) {
    return {
        type: USER_LOGOUT_FAILURE,
        payload: {
            error
        }
    }
}

export function userLogout() {
    return async function (dispatch) {

        const refreshToken = localStorage.getItem('refreshToken');

        dispatch({
            type: USER_LOGOUT_REQUEST
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: refreshToken
            })
        }

        await fetch(`${baseUrl}auth/logout`, requestOptions)
            .then(checkResponse)
            .then(() => {
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch(userLogoutSuccess())
            })
            .catch(error => {
                if (error.message === 'jwt expired') {
                    updateToken()
                    dispatch(userLogout())
                }
                else {
                    dispatch(userLogoutFailure(error))
                }
            })
    }
}

// Восстановление пароля
export function forgotPasswordSuccess(status) {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: {
            status
        }
    }
}

export function forgotPasswordFailure(error) {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        payload: {
            error
        }
    }
}

export function forgotPassword(email) {
    return async function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        }

        await fetch(`${baseUrl}password-reset`, requestOptions)
            .then(checkResponse)
            .then((status) => {
                dispatch(forgotPasswordSuccess(status))
            })
            .catch(error => dispatch(forgotPasswordFailure(error)))
    }
}

// Сброс пароля
export function resetPasswordSuccess(status) {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: {
            status
        }
    }
}

export function resetPasswordFailure(error) {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: {
            error
        }
    }
}

export function resetPassword(body) {
    return async function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        await fetch(`${baseUrl}password-reset/reset`, requestOptions)
            .then(checkResponse)
            .then((message) => {
                dispatch(resetPasswordSuccess(message));
            })
            .catch(error => dispatch(resetPasswordFailure(error)))
    }
}

// Получение данных пользователя
export function getUserSuccess(user) {
    return {
        type: USER_INFO_SUCCESS,
        payload: {
            user
        }
    }
}

export function getUserFailure(error) {
    return {
        type: USER_INFO_FAILURE,
        payload: {
            error
        }
    }
}

export function getUser() {
    return async function (dispatch) {

        const accessToken = getCookie('accessToken')

        dispatch({
            type: USER_INFO_REQUEST
        });

        if (accessToken) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            }

            await fetchUpdateToken(`${baseUrl}auth/user`, requestOptions)
                .then((data) => {
                    dispatch(getUserSuccess(data))
                }
                )
                .catch(error => {
                    dispatch(getUserFailure(error))
                })
        }
    }
}