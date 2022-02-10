export const POST_ORDER_REQUEST = 'ORDER/POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'ORDER/POST_ORDER_SUCCESS';
export const POST_ORDER_FAILURE = 'ORDER/POST_ORDER_FAILURE';

export const HIDE_MODAL = 'ORDER/HIDE_MODAL';

//Post API Url
const API_ORDER_URL = 'https://norma.nomoreparties.space/api/orders'


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

export function postOrder(ingredients){
    return function(dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST
        });

        fetch(API_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ingredients": ingredients
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).then(data => {
            dispatch(postOrderSuccess(data));
        })
        .catch(error => {
            dispatch(postOrderFailure(error));
        })
    }
}

export function hideOrderModal() {
    return {
        type: HIDE_MODAL
    }
}