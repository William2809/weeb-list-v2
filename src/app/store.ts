import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import gogoanimeReducer from '../features/gogoanime/gogoanimeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gogoanime: gogoanimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>