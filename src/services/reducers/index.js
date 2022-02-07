import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
    // TODO: Add reducers here
    ingredients: ingredientsReducer,
    order: orderReducer
}) 