import { authReducer, authInitialState } from './auth';

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

describe('authReducer', () => {

    it ('Изначальный стэйт', () => {
        expect(authReducer(undefined, {} as any)).toEqual(authInitialState);
    })

    it ('Регистрация пользователя', () => {
        const action = {
            type: REGISTER_USER_REQUEST,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            registerData: action.payload,
            registerLoading: true,
            registerError: false
        })
    })

    it ('Регистрация пользователя успешно', () => {
        const action = {
            type: REGISTER_USER_SUCCESS,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            userInfo: action.payload,
            name: action.payload.user.name,
            email: action.payload.user.email,
            registerData: action.payload,
            registerError: false,
            registerLoading: false,
            isLogin: true
        })
    })

    it ('Регистрация пользователя неуспешно', () => {
        const action = {
            type: REGISTER_USER_FAILURE,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            registerError: true,
            registerLoading: false,
            isLogin: false
        })
    })

    it ('Авторизация пользователя', () => {
        const action = {
            type: LOGIN_USER_REQUEST,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            loginData: action.payload,
            loginLoading: true,
        })
    })

    it ('Авторизация пользователя успешно', () => {
        const action = {
            type: LOGIN_USER_SUCCESS,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            userInfo: action.payload,
            name: action.payload.user.name,
            email: action.payload.user.email,
            loginData: action.payload,
            loginLoading: false,
            loginError: false,
            isLogin: true
        })
    })

    it ('Авторизация пользователя неуспешно', () => {
        const action = {
            type: LOGIN_USER_FAILURE,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            loginLoading: false,
            loginError: true,
            isLogin: false
        })
    })

    it ('Редактирование пользователя', () => {
        const action = {
            type: EDIT_USER_REQUEST,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            editData: action.payload
        })
    })

    it ('Редактирование пользователя успешно', () => {
        const action = {
            type: EDIT_USER_SUCCESS,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            editData: action.payload,
            name: action.payload.user.name,
            email: action.payload.user.email,
            editError: false
        })
    })

    it ('Редактирование пользователя неуспешно', () => {
        const action = {
            type: EDIT_USER_FAILURE,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            editError: true
        })
    })

    it ('Получение информации о пользователе', () => {
        const action = {
            type: USER_INFO_REQUEST,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            userInfoLoading: true
        })
    })

    it ('Получение информации о пользователе успешно', () => {
        const action = {
            type: USER_INFO_SUCCESS,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            userInfo: action.payload,
            name: action.payload.user.name,
            email: action.payload.user.email,
            userInfoLoading: false,
            userInfoError: false,
            isLogin: true
        })
    })

    it ('Получение информации о пользователе неуспешно', () => {
        const action = {
            type: USER_INFO_FAILURE,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            userInfoError: true,
            userInfoLoading: false,
            isLogin: false
        })
    })

    it ('Выход из аккаунта', () => {
        const action = {
            type: USER_LOGOUT_REQUEST,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            isLogin: false
        })
    })

    it ('Выход из аккаунта успешно', () => {
        const action = {
            type: USER_LOGOUT_SUCCESS,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            isLogin: false
        })
    })

    it ('Выход из аккаунта неуспешно', () => {
        const action = {
            type: USER_LOGOUT_FAILURE,
            payload: {
                user: {
                    name: 'test',
                    email: '',
                    password: '',
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            isLogin: true
        })
    })

    it ('Востановления пароля', () => {
        const action = {
            type: RESET_PASSWORD_REQUEST,
            payload: {
                body: {
                    password: '',
                    token: ''
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            resetPasswordSuccess: false
        })
    })

    it ('Востановления пароля успешно', () => {
        const action = {
            type: RESET_PASSWORD_SUCCESS,
            payload: {
                body: {
                    password: '',
                    token: ''
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            resetPasswordSuccess: true
        })
    })

    it ('Востановления пароля неуспешно', () => {
        const action = {
            type: RESET_PASSWORD_FAILURE,
            payload: {
                body: {
                    password: '',
                    token: ''
                }
            }
        }
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            resetPasswordSuccess: false,
            resetPasswordError: true
        })
    })

    it ('Забыли пароль', () => {
        const action = {
            type: FORGOT_PASSWORD_REQUEST,
            payload: {
                email: ''
            }
        }
        
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            forgotPasswordSuccess: false
        })
    })

    it ('Забыли пароль успешно', () => {
        const action = {
            type: FORGOT_PASSWORD_SUCCESS,
            payload: {
                email: ''
            }
        }
        
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            forgotPasswordSuccess: true
        })
    })

    it ('Забыли пароль неуспешно', () => {
        const action = {
            type: FORGOT_PASSWORD_FAILURE,
            payload: {
                email: ''
            }
        }
        
        expect(authReducer(authInitialState, action)).toEqual({
            ...authInitialState,
            forgotPasswordSuccess: false,
            forgotPasswordError: true
        })
    })




});
