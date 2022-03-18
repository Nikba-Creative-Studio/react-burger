import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
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
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAILURE,
} from '../actions/auth';

const authInitialState = {
    // Первоначальное состояние авторизации
    registerData: null,
    registerError: false,
    registerLoading: false,
    loginData: null,
    isLogin: false,
    loginLoading: false,
    loginError: false,
    editData: null,
    editError: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
    resetPasswordSuccess: false,
    resetPasswordError: false,
    userInfo: null,
    name: null,
    email: null,
    userInfoLoading: false,
    userInfoError: false,
}

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                registerData: action.payload,
                registerLoading: true,
                registerError: false
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                name: action.payload.user.user.name,
                email: action.payload.user.user.email,
                registerData: action.payload,
                registerError: false,
                registerLoading: false,
                isLogin: true
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                registerError: true,
                registerLoading: false,
                isLogin: false
            }
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loginData: action.payload,
                loginLoading: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                name: action.payload.user.user.name,
                email: action.payload.user.user.email,
                loginData: action.payload,
                loginLoading: false,
                loginError: false,
                isLogin: true
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loginError: true,
                loginLoading: false,
                isLogin: false
            }
        case EDIT_USER_REQUEST:
            return {
                ...state,
                editData: action.payload
            }
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                editData: action.payload,
                name: action.payload.user.user.name,
                email: action.payload.user.user.email,
                editError: false
            }
        case EDIT_USER_FAILURE:
            return {
                ...state,
                editError: true
            }
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                isLogin: false
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false
            }
        case USER_LOGOUT_FAILURE:
            return {
                ...state,
                isLogin: true
            }
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPasswordSuccess: false,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordError: false
            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                forgotPasswordSuccess: false,
                forgotPasswordError: true
            }
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordSuccess: false,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordError: false
            }
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                resetPasswordSuccess: false,
                resetPasswordError: true
            }
        case USER_INFO_REQUEST:
            return {
                ...state,
                userInfo: action.payload,
                userInfoLoading: true,
            }
        case USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                name: action.payload.user.user.name,
                email: action.payload.user.user.email,
                userInfoLoading: false,
                userInfoError: false,
                isLogin: true
            }
        case USER_INFO_FAILURE:
            return {
                ...state,
                userInfoError: true,
                userInfoLoading: false,
                isLogin: false
            }

        default:
            return state;
    }
}