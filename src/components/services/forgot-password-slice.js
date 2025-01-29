import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_FORGOT_PASSWORD = "https://norma.nomoreparties.space/api/password-reset";
// Список всех ингридиентов

export const forgotPasswordPost = createAsyncThunk('forPass/forgotPass', async (value) => {

    console.log(value)

    const response = await fetch(URL_FOR_FORGOT_PASSWORD, {
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

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        message: "",
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(forgotPasswordPost.pending, (state, action) => {
            state.loading = false
        })
        .addCase(forgotPasswordPost.fulfilled, (state, action) => {
            state.loading = true;
        })
        .addCase(forgotPasswordPost.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default forgotPasswordSlice.reducer;