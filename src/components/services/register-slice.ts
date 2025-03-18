import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from '../../../utils/burgerApi';

const URL_FOR_REGISTER_USER = BASE_URL + "/auth/register";

// Тип для данных регистрации пользователя
interface RegisterUserData {
    email: string;
    password: string;
    name: string;
}

// Тип для ответа от API при успешной регистрации
interface RegisterUserResponse {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
    message?: string; // Опциональное поле, если API возвращает сообщение
}

// Тип для состояния
interface RegisterUserState {
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    loading: boolean;
    error: boolean;
    message?: string; // Опциональное поле для сообщения
}

// Начальное состояние
const initialState: RegisterUserState = {
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    loading: false,
    error: false,
};

// Асинхронный запрос для регистрации пользователя
export const registerUser = createAsyncThunk<RegisterUserResponse, RegisterUserData, { rejectValue: string }>(
    'regUs/registerUser',
    async (value, { rejectWithValue }) => {
        try {
            const response = await fetch(URL_FOR_REGISTER_USER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(value),
            });

            const data: RegisterUserResponse = await checkResponse(response);
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const registerUserSlice = createSlice({
    name: 'registerUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterUserResponse>) => {
                state.email = action.payload.user.email;
                state.name = action.payload.user.name;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.error = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
                state.message = action.payload || 'Ошибка при регистрации';
            });
    }
});

export default registerUserSlice.reducer;