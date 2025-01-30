import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_REGISTER_USER = "https://norma.nomoreparties.space/api/auth/register";
// Список всех ингридиентов

export const registerUser = createAsyncThunk('regUs/registerUser', async (value) => {

    const response = await fetch(URL_FOR_REGISTER_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(value)
    })

    if(!response.ok) {
        throw new Error('Ошибка')
    }
    
    return response.json();
})

const registerUserSlice = createSlice({
    name: 'registerUser',
    initialState: {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: '',
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state, action) => {
            state.loading = false
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.message = action.payload.data;
            state.loading = true;
            state.error = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default registerUserSlice.reducer;