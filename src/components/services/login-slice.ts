import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from '../../../utils/burgerApi';

const URL_FOR_LOGIN_USER = BASE_URL + '/auth/login';

interface UserData {
    email: string;
    name: string;
}

interface LoginResponse {
    success: boolean;
    user: UserData;
    accessToken: string;
    refreshToken: string;
}

interface LoginFormValues {
    email: string;
    password: string;
}

interface LoginUserState {
    email: string | null;
    name: string;
    error: boolean;
    userAccess: boolean;
}

const initialState: LoginUserState = {
    email: null,
    name: '',
    error: false,
    userAccess: false,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginFormValues, { rejectValue: string }>(
    'logUs/loginUser',
    async (value, { rejectWithValue }) => {
        try {
            const response = await fetch(URL_FOR_LOGIN_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(value),
            });

            const data: LoginResponse = await checkResponse(response);
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.userAccess = false;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.email = action.payload.user.email;
                state.name = action.payload.user.name;

                const authToken = action.payload.accessToken.split('Bearer ')[1];
                const refreshToken = action.payload.refreshToken;

                if (authToken) {
                    localStorage.setItem('accessToken', authToken);
                }

                localStorage.setItem('refreshToken', refreshToken);

                state.userAccess = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = true;
                state.userAccess = false;
            });
    }
});

export default loginUserSlice.reducer;