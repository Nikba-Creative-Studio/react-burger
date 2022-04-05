import { baseUrl } from '../../utils/config';
import { cleanConstructor } from './burger-constructor';
import { checkResponse, getCookie } from '../../utils/helpers'; 
import { updateToken } from '../api'

import { AppThunk, AppDispatch } from '../../types/index';
import { IPostData, IPostOrderSuccess, IPostOrderFailure, IPostOrderRequest } from '../../types/order-details';
import { TIngredientData } from '../../types/types';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILURE: 'POST_ORDER_FAILURE' = 'POST_ORDER_FAILURE';

export const HIDE_MODAL: 'HIDE_MODAL' = 'HIDE_MODAL';

export const postOrderSuccess = (data: IPostData[]): IPostOrderSuccess => ({
    type: POST_ORDER_SUCCESS,
    payload: {
        data
    }
});

export const postOrderFailure = (error: string): IPostOrderFailure => ({
    type: POST_ORDER_FAILURE,
    payload: {
        error
    }
});

export const postOrderReqest = (): IPostOrderRequest => ({
    type: POST_ORDER_REQUEST
});


export const postOrder: AppThunk = (ingredients: TIngredientData[]) => (dispatch: AppDispatch) => {
    dispatch(postOrderReqest());

    const accessToken: string | undefined = getCookie('accessToken');

    if (accessToken) {
        fetch(`${baseUrl}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "ingredients": ingredients
            })
        })
        .then(checkResponse)
        .then(response => response.json())
        .then((data) => {
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
    else {
        updateToken()
        return postOrder(ingredients)
    }
}

export const hideOrderModal: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: HIDE_MODAL
    })
}