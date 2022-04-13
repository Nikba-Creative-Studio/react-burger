import { baseUrl } from '../../utils/config';
import { cleanConstructor } from './burger-constructor';
import { checkResponse, getCookie } from '../../utils/helpers'; 
import { fetchUpdateToken } from '../api'

import { AppThunk, AppDispatch } from '../../types/index';
import { IPostData, IPostOrderSuccess, IPostOrderFailure, IPostOrderRequest, IHideModal} from '../../types/order-details';
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

export const postOrderFailure = (): IPostOrderFailure => ({
    type: POST_ORDER_FAILURE
});

export const postOrderReqest = (): IPostOrderRequest => ({
    type: POST_ORDER_REQUEST
});


export const postOrder: AppThunk = (ingredients: TIngredientData[]) => async (dispatch: AppDispatch) => { 
    dispatch(postOrderReqest());

    const accessToken: string | undefined = getCookie('accessToken');

    try {
        if(accessToken) {
            const response = await fetchUpdateToken(`${baseUrl}orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    "ingredients": ingredients
                })
            })

            const data = await response.json();

            if (checkResponse(response)) {
                dispatch(postOrderSuccess(data.order.number));
                dispatch(cleanConstructor())
            }
            else {
                dispatch(postOrderFailure())
            }
        }
    }
    catch (error) {
        dispatch(postOrderFailure())
    }
}

export const hideOrderModal = (): IHideModal => ({
    type: HIDE_MODAL
});