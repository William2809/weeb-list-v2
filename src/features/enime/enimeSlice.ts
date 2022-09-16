import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enimeService from './enimeService';

const initialState = {
    animeDetail: <any>[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get full anime details
export const getAnimeDetails = createAsyncThunk('enime/getanimedetails', async (title: string, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await enimeService.getAnimeDetails(token, title);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const enimeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnimeDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnimeDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.animeDetail = action.payload;
            })
            .addCase(getAnimeDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.animeDetail = null;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const { reset } = enimeSlice.actions;

export default enimeSlice.reducer;


