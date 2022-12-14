// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import livechartService from './livechartService';

// const initialState = {
//     schedule: <any>[],
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: '',
// }

// // get latest anime
// export const getSchedule = createAsyncThunk('livechart/getSchedule', async () => {
//     try {
//         // const token = (thunkAPI.getState() as any).auth.user.token;

//         return await livechartService.getSchedule();
//     } catch (error: any) {
//         const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

//         return message;
//     }
// });


// export const livechartSlice = createSlice({
//     name: 'schedule',
//     initialState,
//     reducers: {
//         reset: (state) => initialState,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getSchedule.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getSchedule.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.schedule = action.payload;
//             })
//             .addCase(getSchedule.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.schedule = null;
//                 state.isError = true;
//                 state.message = action.payload as string;
//             })
//     }
// })

// export const { reset } = livechartSlice.actions;

// export default livechartSlice.reducer;

import React from 'react'



