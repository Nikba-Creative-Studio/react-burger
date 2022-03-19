import { baseUrl } from '../../utils/config';
import { cleanConstructor } from './burger-constructor';
import { checkResponse, getCookie } from '../../utils/helpers'; 
import { updateToken } from '../api'

export const POST_ORDER_REQUEST = 'ORDER/POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'ORDER/POST_ORDER_SUCCESS';
export const POST_ORDER_FAILURE = 'ORDER/POST_ORDER_FAILURE';

export const HIDE_MODAL = 'ORDER/HIDE_MODAL';

export function postOrderSuccess(data) {
    return {
        type: POST_ORDER_SUCCESS,
        payload: {
            data
        }
    }
}

export function postOrderFailure(error) {
    return {
        type: POST_ORDER_FAILURE,
        payload: {
            error
        }
    }
}

export function postOrder(ingredients) {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        })

        fetch(`${baseUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken')
            },
            body: JSON.stringify({
                "ingredients": ingredients
            })
        })
            .then(checkResponse)
            .then(data => {
                dispatch(postOrderSuccess(data))
                dispatch(cleanConstructor())
            })
            .catch(error => {
                if(error.message === 'jwt expired') {
                    updateToken()
                }
                else {
                    dispatch(postOrderFailure(error))
                }    
            })
    }
}

export function hideOrderModal() {
    return {
        type: HIDE_MODAL
    }
}