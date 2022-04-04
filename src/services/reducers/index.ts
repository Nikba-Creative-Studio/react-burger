import { combineReducers } from 'redux';

import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
    // TODO: Add reducers here
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer
})