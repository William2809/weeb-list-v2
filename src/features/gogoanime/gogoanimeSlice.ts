import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gogoanimeService from './gogoanimeService';

const initialState = {
    anime: <any>[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get latest anime
export const getLatest = createAsyncThunk('gogoanime/getLatest', async (page: number, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await gogoanimeService.getLatest(token, page);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})


// get anime info
export const getAnimeInfo = async (id: string) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!);

        const token = user.token;
        const result = await gogoanimeService.getAnimeInfo(token, id);
        return result;
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
}

// get anime episode
export const getAnimeEpisode = async (id: string) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!);

        const token = user.token;
        return await gogoanimeService.getAnimeEpisode(token, id);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
}

export const gogoanimeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLatest.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLatest.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.anime = action.payload;
            })
            .addCase(getLatest.rejected, (state, action) => {
                state.isLoading = false;
                state.anime = null;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
})

export const { reset } = gogoanimeSlice.actions;

export default gogoanimeSlice.reducer;