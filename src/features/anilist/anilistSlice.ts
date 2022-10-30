import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anilistService from './anilistService';

const initialState = {
    animeDetail: <any>[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get full anime details
export const getAnimeDetails = createAsyncThunk('anilist/getanimedetails', async (title: string, thunkAPI) => {
    try {
        const token = (thunkAPI.getState() as any).auth.user.token;
        return await anilistService.getAnimeDetails(token, title);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

// get anime schedule
export const getSchedule = async (url: any) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!);
        const token = user.token;
        const result = await anilistService.getSchedule(token, url);
        console.log(result);
        return result;
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
}

export const anilistSlice = createSlice({
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

export const { reset } = anilistSlice.actions;

export default anilistSlice.reducer;


