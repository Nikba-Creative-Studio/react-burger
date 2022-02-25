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
    registerData: null
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
                registerData: action.payload
            }
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loginData: action.payload
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginData: action.payload
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loginData: action.payload
            }
            
        default:
            return state;
    }
}