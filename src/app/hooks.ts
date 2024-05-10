import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, store } from './store';

// you can also create some redux hooks using the above explicit types
export const useAppDispatch: () => AppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
