import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from '../../../utils/burgerApi';

const URL_FOR_LOGOUT_USER = BASE_URL + '/auth/logout';

interface LogoutResponse {
    success: boolean;
    message?: string;
}

interface LogoutUserState {
    statusOut: boolean;
    errorOut: boolean;
}

const initialState: LogoutUserState = {
    statusOut: false,
    errorOut: false,
};

export const logoutUser = createAsyncThunk<LogoutResponse, void, { rejectValue: string }>(
    'logoutUs/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(URL_FOR_LOGOUT_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
            });

            const data: LogoutResponse = await checkResponse(response);
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const logoutUserSlice = createSlice({
    name: 'logoutUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.statusOut = false;
                state.errorOut = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                state.statusOut = true;
                state.errorOut = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.errorOut = true;
                state.statusOut = false;
            });
    }
});

export default logoutUserSlice.reducer;