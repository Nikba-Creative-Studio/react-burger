import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
  } from 'react-redux';
  import { AppDispatch, AppThunk } from '../types/index';
  import { RootState } from '../types/types'
  
  export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;