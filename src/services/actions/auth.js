import { baseUrl } from '../../utils/config';
import { checkResponse } from "../../utils/helpers";

export const REGISTER_USER_REQUEST = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

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
            .then(user => dispatch(registerUserSuccess(user)))
            .catch(error => dispatch(registerUserFailure(error)))
    }
}