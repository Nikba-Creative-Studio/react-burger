import { baseUrl } from '../../utils/config';
import {
    checkResponse,
    setCookie,
    getCookie,
    deleteCookie
} from "../../utils/helpers";

import { updateToken, fetchUpdateToken } from '../api';


import {
    IRegisterUserSuccess,
    IRegisterUserFailure,
    IRegisterUserRequest,
    
    IFetchRegisterUser,
    
    IUser,
    
    ILoginUserSuccess,
    ILoginUserFailure,
    ILoginUserRequest,
    
    IUserInfoSuccess,
    IUserInfoFailure,
    IUserInfoRequest,
    
    IEditUserSuccess,
    IEditUserFailure,
    IEditUserRequest,
    
    IUserLogoutSuccess,
    IUserLogoutFailure,
    IUserLogoutRequest,
    
    IForgotPasswordSuccess,
    IForgotPasswordFailure,
    IForgotPasswordRequest,

    IResetPasswordSuccess,
    IResetPasswordFailure,
    IResetPasswordRequest,
    IResetPasswordBody
}
from '../../types/auth';

import { AppDispatch, AppThunk } from '../../types';

export const REGISTER_USER_REQUEST: 'REGISTER_USER' = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE' = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST: 'LOGIN_USER' = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE' = 'LOGIN_USER_FAILURE';

export const USER_INFO_REQUEST: 'USER_INFO' = 'USER_INFO';
export const USER_INFO_SUCCESS: 'USER_INFO_SUCCESS' = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE: 'USER_INFO_FAILURE' = 'USER_INFO_FAILURE';

export const EDIT_USER_REQUEST: 'EDIT_USER' = 'EDIT_USER';
export const EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS' = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE: 'EDIT_USER_FAILURE' = 'EDIT_USER_FAILURE';

export const USER_LOGOUT_REQUEST: 'USER_LOGOUT' = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS'= 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE: 'USER_LOGOUT_FAILURE' = 'USER_LOGOUT_FAILURE';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD' = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE: 'FORGOT_PASSWORD_FAILURE' = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE' = 'RESET_PASSWORD_FAILURE';




// Регистрация пользователя
export const registerUserSuccess = (user: IUser): IRegisterUserSuccess => ({
    type: REGISTER_USER_SUCCESS,
    payload: {
        user
    }
});

export const registerUserFailure = (): IRegisterUserFailure => ({
    type: REGISTER_USER_FAILURE
});

export const registerUserRequest = (user: IFetchRegisterUser): IRegisterUserRequest => ({
    type: REGISTER_USER_REQUEST,
    payload: {
        user
    }
})

export const registerUser: AppThunk = (body: IFetchRegisterUser) => async (dispatch: AppDispatch) => {
    dispatch(registerUserRequest(body));

    try {
        const response = await fetch(`${baseUrl}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (checkResponse(response)) {
            setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', data.refreshToken);
            dispatch(registerUserSuccess(data.user));
        } else {
            dispatch(registerUserFailure());
        }
    }
    catch (error) {
        dispatch(registerUserFailure());
    }
}

// Авторизация пользователя
export const loginUserSuccess = (user: IUser): ILoginUserSuccess => ({
    type: LOGIN_USER_SUCCESS,
    payload: {
        user
    }
});

export const loginUserFailure = (): ILoginUserFailure => ({
    type: LOGIN_USER_FAILURE
});

export const loginUserRequest = (user: IUser): ILoginUserRequest => ({
    type: LOGIN_USER_REQUEST,
    payload: {
        user
    }
});

export const loginUser: AppThunk = (body: IUser) => async (dispatch: AppDispatch) => {
    dispatch(loginUserRequest(body));

    try {
        const response = await fetch(`${baseUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (checkResponse(response)) {
            setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', data.refreshToken);
            dispatch(loginUserSuccess(data.user));
        } else {
            dispatch(loginUserFailure());
        }
    }
    catch (error) {
        dispatch(loginUserFailure());
    }
}

// Получение данных пользователя
export const userInfoSuccess = (user: IUser): IUserInfoSuccess => ({
    type: USER_INFO_SUCCESS,
    payload: {
        user
    }
});

export const userInfoFailure = (): IUserInfoFailure => ({
    type: USER_INFO_FAILURE
});

export const userInfoRequest = (): IUserInfoRequest => ({
    type: USER_INFO_REQUEST
});

export const getUser: AppThunk = () => async (dispatch: AppDispatch) => { 
    dispatch(userInfoRequest());
    const accessToken = getCookie('accessToken');
    
    try {
        if (accessToken) {
            const response = await fetchUpdateToken(`${baseUrl}auth/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            if (checkResponse(response)) {
                dispatch(userInfoSuccess(data.user));
            } else {
                dispatch(userInfoFailure());
            }
        }
    }
    catch (error) {
        dispatch(userInfoFailure());
    }
}


// Редактирование пользователя
export const editUserSuccess = (user: IUser): IEditUserSuccess => ({
    type: EDIT_USER_SUCCESS,
    payload: {
        user
    }
});

export const editUserFailure = (): IEditUserFailure => ({
    type: EDIT_USER_FAILURE
});

export const editUserRequest = (user: IUser): IEditUserRequest => ({
    type: EDIT_USER_REQUEST,
    payload: {
        user
    }
});

export const editUser: AppThunk = (body: IUser) => async (dispatch: AppDispatch) => {
    dispatch(editUserRequest(body));

    try {
        const response = await fetchUpdateToken(`${baseUrl}auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('accessToken')}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (checkResponse(response)) {
            dispatch(editUserSuccess(data.user));
        } else {
            dispatch(editUserFailure());
        }
    }
    catch (error) {
        dispatch(editUserFailure());
    }
}


// Выход пользователя
export const userLogoutSuccess = (): IUserLogoutSuccess => ({
    type: USER_LOGOUT_SUCCESS
});

export const userLogoutFailure = (): IUserLogoutFailure => ({
    type: USER_LOGOUT_FAILURE
});

export const userLogoutRequest = (): IUserLogoutRequest => ({
    type: USER_LOGOUT_REQUEST
});

export const userLogout = () => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(userLogoutRequest());

    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const response = await fetch(`${baseUrl}auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: refreshToken })
        });

        //const data = await response.json();

        if (checkResponse(response)) {
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(userLogoutSuccess());
        } else {
            dispatch(userLogoutFailure());
        }
    }
    catch (error) {
        dispatch(userLogoutFailure());
    }
}

// Восстановление пароля
export const forgotPasswordSuccess = (): IForgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFailure = (): IForgotPasswordFailure => ({
    type: FORGOT_PASSWORD_FAILURE
});

export const forgotPasswordRequest = (email: string): IForgotPasswordRequest => ({
    type: FORGOT_PASSWORD_REQUEST,
    payload: {
        email
    }
});

export const forgotPassword: AppThunk = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequest(email));

    try {
        const response = await fetch(`${baseUrl}password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        //const data = await response.json();

        if (checkResponse(response)) {
            dispatch(forgotPasswordSuccess());
        } else {
            dispatch(forgotPasswordFailure());
        }
    }
    catch (error) {
        dispatch(forgotPasswordFailure());
    }
}

// Сброс пароля
export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS
});

export const resetPasswordFailure = (): IResetPasswordFailure => ({
    type: RESET_PASSWORD_FAILURE
});

export const resetPasswordRequest = (body: IResetPasswordBody): IResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST,
    payload: {
        body
    }
});

export const resetPassword: AppThunk = (body: IResetPasswordBody) => async (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest(body));

    try {
        const response = await fetch(`${baseUrl}password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        //const data = await response.json();

        if (checkResponse(response)) {
            dispatch(resetPasswordSuccess());
        } else {
            dispatch(resetPasswordFailure());
        }
    }
    catch (error) {
        dispatch(resetPasswordFailure());
    }
}