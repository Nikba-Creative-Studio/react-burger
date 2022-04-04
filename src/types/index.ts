import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './types'

import { TBurgerIngredientsActionTypes } from './burger-ingredients';
import { TPostOrderActions } from './order-details';
import { TBurgerConstructorActionTypes } from './burger-constructor';
import { TAuthAction } from './auth';

type TApplicationActions = TBurgerIngredientsActionTypes | TPostOrderActions | TBurgerConstructorActionTypes | TAuthAction;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;