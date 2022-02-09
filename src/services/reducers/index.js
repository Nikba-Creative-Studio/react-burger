import { combineReducers } from 'redux';

import { ingredientsReducer } from './burger-ingredients';

export const rootReducer = combineReducers({
    // TODO: Add reducers here
    ingredients: ingredientsReducer,
}) 