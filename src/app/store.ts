import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import gogoanimeReducer from '../features/gogoanime/gogoanimeSlice';
import gogoSearchReducer from '../features/gogoanime/gogoSearchSlice';
import enimeReducer from '../features/enime/enimeSlice';
import anilistReducer from '../features/anilist/anilistSlice';
import gogoanimeApiReducer from '../features/gogoanimeApi/gogoanimeApiSlice';
import { livechartApi } from '../features/livechart/livechartService';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    gogoanime: gogoanimeReducer,
    gogoanimeApi: gogoanimeApiReducer,
    gogosearch: gogoSearchReducer,
    enime: enimeReducer,
    anilist: anilistReducer,
    [livechartApi.reducerPath]: livechartApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>