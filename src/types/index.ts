import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { rootReducer } from '../services/reducers';

import { TBurgerIngredientsActionTypes } from './burger-ingredients';
import { TPostOrderActions } from './order-details';
import { TBurgerConstructorActionTypes } from './burger-constructor';
import { TAuthAction } from './auth';
import { TFeedActionTypes } from './feed';

type TApplicationActions = TBurgerIngredientsActionTypes | TPostOrderActions | TBurgerConstructorActionTypes | TAuthAction | TFeedActionTypes;

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;