import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//Get user from local storage
const user = JSON.parse(localStorage.getItem('user')!);

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
// register new user
export const register = createAsyncThunk('auth/register', async (user: {
    "username": String,
    "email": String,
    "password": String,
}, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

// login user
export const login = createAsyncThunk('auth/login', async (user: {
    "username": String,
    "password": String,
}, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const googleSignIn = createAsyncThunk('auth/googleSignIn', async (user: {
    "name": String,
    "email": String,
    "picture": String,
}, thunkAPI) => {
    try {
        return await authService.googleSignIn(user);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

//logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state: any) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(googleSignIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })

    }
})

export const { reset } = authSlice.actions;

export default authSlice.reducer;