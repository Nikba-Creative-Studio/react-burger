import { combineReducers } from 'redux';

import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
    // TODO: Add reducers here
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    
})