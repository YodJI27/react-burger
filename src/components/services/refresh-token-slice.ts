import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from '../../../utils/burgerApi';

const URL_FOR_REFRESH_TOKEN = BASE_URL + "/auth/token";

interface RefreshTokenResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    message?: string;
}

interface RefreshTokenState {
    access: boolean;
    error: boolean;
}

const initialState: RefreshTokenState = {
    access: false,
    error: false,
};

export const refreshToken = createAsyncThunk<RefreshTokenResponse, void, { rejectValue: string }>(
    'refTok/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(URL_FOR_REFRESH_TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
            });

            const data: RefreshTokenResponse = await checkResponse(response);
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const refreshTokenSlice = createSlice({
    name: 'refreshToken',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.pending, (state) => {
                state.access = false;
                state.error = false;
            })
            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<RefreshTokenResponse>) => {
                const authToken = action.payload.accessToken.split('Bearer ')[1];
                const refreshToken = action.payload.refreshToken;

                if (authToken) {
                    localStorage.setItem('accessToken', authToken);
                }

                localStorage.setItem('refreshToken', refreshToken);

                state.access = true;
                state.error = false;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.error = true;
                state.access = false;
            });
    }
});

export default refreshTokenSlice.reducer;