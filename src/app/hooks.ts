import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store'
import { AnyAction, Store, ThunkDispatch } from '@reduxjs/toolkit';



// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// 3. Create a type for store using RootState and Thunk enabled dispatch
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

// you can also create some redux hooks using the above explicit types
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;