import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from '../../../utils/burgerApi';

const URL_FOR_GET_USER = BASE_URL + "/auth/user";

// Тип для данных пользователя
interface UserData {
    email: string;
    name: string;
}

// Тип для ответа от API
interface AuthResponse {
    success: boolean;
    user: UserData;
    message?: string; // Опциональное поле, если API возвращает сообщение об ошибке
}

// Тип для состояния
interface UserState {
    email: string;
    name: string;
    message: string;
    loading: boolean;
    error: boolean;
}

// Начальное состояние
const initialState: UserState = {
    email: '',
    name: '',
    message: '',
    loading: false,
    error: false,
};

// Проверка авторизации пользователя
export const checkUserAuth = (): boolean => {
    return !!localStorage.getItem('accessToken');
};

// Асинхронный запрос для получения данных пользователя
export const authUser = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
    'authUs/authUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(URL_FOR_GET_USER, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            });

            const data: AuthResponse = await checkResponse(response);
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Создание среза
const getUserSlice = createSlice({
    name: 'getUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.message = '';
            })
            .addCase(authUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.email = action.payload.user.email;
                state.name = action.payload.user.name;
                state.loading = false;
                state.error = false;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.message = action.payload || 'Ошибка при загрузке данных пользователя';
                state.error = true;
                state.loading = false;
            });
    }
});

export default getUserSlice.reducer;