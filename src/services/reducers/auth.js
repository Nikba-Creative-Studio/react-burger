import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE
} from '../actions/auth';

const authInitialState = {
    // Первоначальное состояние авторизации
    registerData: null,
    registerError: false,
    loginData: null,
    isLogin: false,
    loginError: false,
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
                registerData: action.payload
            }
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                registerError: true
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

        default:
            return state;
    }
}