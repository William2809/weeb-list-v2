import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gogoanimeService from './gogoanimeApiService';

const initialState = {
    anime: <any>[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get latest anime
export const getPopular = createAsyncThunk('gogoanimeApi/getPopular', async (page: number, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;

        return await gogoanimeService.getPopular(token, page);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

// get latest anime
export const getMovie = createAsyncThunk('gogoanimeAPi/getMovie', async (page: number, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await gogoanimeService.getMovie(token, page);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})




export const gogoanimeApiSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPopular.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPopular.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.anime = action.payload;
            })
            .addCase(getPopular.rejected, (state, action) => {
                state.isLoading = false;
                state.anime = null;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.anime = action.payload;
            })
            .addCase(getMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.anime = null;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const { reset } = gogoanimeApiSlice.actions;

export default gogoanimeApiSlice.reducer;