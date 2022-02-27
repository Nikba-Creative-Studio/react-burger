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

export const EDIT_USER_REQUEST = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

// Запись токена в localStorage
export const setAuthToken = () => {
    fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then(checkResponse)
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        })
        .catch(error => {
            console.log(error);
        });
};


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
    return function(dispatch) {
        dispatch({
            type: EDIT_USER_REQUEST
        });

        fetch(`${baseUrl}auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(body)
        })
            .then(checkResponse)
            .then(res => res.json())
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
    return function(dispatch) {
        
        const refreshToken = localStorage.getItem('refreshToken');

        dispatch({
            type: USER_LOGOUT_REQUEST
        });

        fetch(`${baseUrl}auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                token: refreshToken
            })
        })
            .then(checkResponse)
            .then(res => res.json())
            .then(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch(userLogoutSuccess());
            })
            .catch(error => dispatch(userLogoutFailure(error)))
    }
}