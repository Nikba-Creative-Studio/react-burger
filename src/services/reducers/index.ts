import { combineReducers } from 'redux';

import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { authReducer } from './auth';
import { feedReducer } from './feed';

export const rootReducer = combineReducers({
    // TODO: Add reducers here
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    orderDetails: orderDetailsReducer,
    auth: authReducer,
    feed: feedReducer,
})