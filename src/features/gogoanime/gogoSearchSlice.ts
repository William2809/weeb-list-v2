import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gogoanimeService from './gogoanimeService';

interface url {
    "title": string,
    "page": number,
}

const initialState = {
    animeSearch: <any>[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// search anime by title
export const getAnime = createAsyncThunk('gogoanime/getAnime', async (url: url, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await gogoanimeService.getAnime(token, url);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const gogoSearchSlice = createSlice({
    name: 'animeSearch',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnime.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnime.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.animeSearch = action.payload;
            })
            .addCase(getAnime.rejected, (state, action) => {
                state.isLoading = false;
                state.animeSearch = null;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const { reset } = gogoSearchSlice.actions;

export default gogoSearchSlice.reducer;