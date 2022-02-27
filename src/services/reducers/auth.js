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
} from '../actions/auth';

const authInitialState = {
    // Первоначальное состояние авторизации
    registerData: null,
    registerError: false,
    loginData: null,
    isLogin: false,
    loginError: false,
    editData: null,
    editError: false,
}

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                registerData: action.payload
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                registerData: action.payload,
                registerError: false,
                isLogin: true
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                registerError: true,
                isLogin: false
            }
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loginData: action.payload
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginData: action.payload,
                loginError: false,
                isLogin: true
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loginError: true,
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

        default:
            return state;
    }
}