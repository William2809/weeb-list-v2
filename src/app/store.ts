import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import gogoanimeReducer from '../features/gogoanime/gogoanimeSlice';
import gogoSearchReducer from '../features/gogoanime/gogoSearchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gogoanime: gogoanimeReducer,
    gogosearch: gogoSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>