import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import gogoanimeReducer from '../features/gogoanime/gogoanimeSlice';
import gogoSearchReducer from '../features/gogoanime/gogoSearchSlice';
import enimeReducer from '../features/enime/enimeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gogoanime: gogoanimeReducer,
    gogosearch: gogoSearchReducer,
    enime: enimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>