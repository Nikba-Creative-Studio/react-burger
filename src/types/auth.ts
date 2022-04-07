import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,

    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,

    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAILURE,

    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILURE,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
}
from '../services/actions/auth';

export interface IAuthInitialState {
    registerData: any;
    registerError: boolean;
    registerLoading: boolean;
    loginData: any;
    isLogin: boolean;
    loginLoading: boolean;
    loginError: boolean;
    editData: any;
    editError: boolean;
    forgotPasswordSuccess: boolean;
    forgotPasswordError: boolean;
    resetPasswordSuccess: boolean;
    resetPasswordError: boolean;
    userInfo: any;
    name: string|null;
    email: string|null;
    userInfoLoading: boolean;
    userInfoError: boolean;
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
}

export interface IFetchRegisterUser extends IUser {
}

export interface IRegisterUserSuccess {
    type: typeof REGISTER_USER_SUCCESS;
    readonly payload: {
        user: IUser
    };
}

export interface IRegisterUserFailure {
    type: typeof REGISTER_USER_FAILURE;
}

export interface IRegisterUserRequest {
    type: typeof REGISTER_USER_REQUEST;
    readonly payload: {
        user: IUser
    };
}

export interface ILoginUserSuccess {
    type: typeof LOGIN_USER_SUCCESS;
    readonly payload: {
        user: IUser
    };
}

export interface ILoginUserFailure {
    type: typeof LOGIN_USER_FAILURE;
}

export interface ILoginUserRequest {
    type: typeof LOGIN_USER_REQUEST;
    readonly payload: {
        user: IUser
    };
}

export interface IUserInfoSuccess {
    type: typeof USER_INFO_SUCCESS;
    readonly payload: {
        user: IUser
    };
}

export interface IUserInfoFailure {
    type: typeof USER_INFO_FAILURE;
}

export interface IUserInfoRequest {
    type: typeof USER_INFO_REQUEST;
}

export interface IEditUserSuccess {
    type: typeof EDIT_USER_SUCCESS;
    readonly payload: {
        user: IUser
    };
}

export interface IEditUserFailure {
    type: typeof EDIT_USER_FAILURE;
}

export interface IEditUserRequest {
    type: typeof EDIT_USER_REQUEST;
    readonly payload: {
        user: IUser
    };
}

export interface IUserLogoutSuccess {
    type: typeof USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailure {
    type: typeof USER_LOGOUT_FAILURE;
}

export interface IUserLogoutRequest {
    type: typeof USER_LOGOUT_REQUEST;
}

export interface IForgotPasswordSuccess {
    type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailure {
    type: typeof FORGOT_PASSWORD_FAILURE;
}

export interface IForgotPasswordRequest {
    type: typeof FORGOT_PASSWORD_REQUEST;
    readonly payload: {
        email: string
    };
}

export interface IResetPasswordSuccess {
    type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailure {
    type: typeof RESET_PASSWORD_FAILURE;
}

export interface IResetPasswordRequest {
    type: typeof RESET_PASSWORD_REQUEST;
    readonly payload: {
        body: {
            password: string,
            token: string
        }
    };
}

export interface IResetPasswordBody {
    password: string;
    token: string;
}


export type TAuthAction = 
IRegisterUserSuccess | 
IRegisterUserFailure | 
IRegisterUserRequest |
ILoginUserSuccess  |
ILoginUserFailure |
ILoginUserRequest |
IUserInfoSuccess |
IUserInfoFailure |
IUserInfoRequest |
IEditUserSuccess |
IEditUserFailure |
IEditUserRequest |
IUserLogoutSuccess |
IUserLogoutFailure |
IUserLogoutRequest |
IForgotPasswordSuccess |
IForgotPasswordFailure |
IForgotPasswordRequest |
IResetPasswordSuccess |
IResetPasswordFailure |
IResetPasswordRequest
;
