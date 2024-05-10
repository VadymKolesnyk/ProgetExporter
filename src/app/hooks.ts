import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { store } from './store'


// you can also create some redux hooks using the above explicit types
export const useAppDispatch: () => typeof store.dispatch = () => {
  return useDispatch<typeof store.dispatch>();
};

export const useAppSelector: TypedUseSelectorHook<
ReturnType<typeof store.getState>
> = useSelector;