import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_RESET_PASSWORD = "https://norma.nomoreparties.space/api/password-reset/reset";
// Список всех ингридиентов

export const resetPasswordPost = createAsyncThunk('resPass/resetPassword', async (value) => {

    const response = await fetch(URL_FOR_RESET_PASSWORD, {
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

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        message: "",
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(resetPasswordPost.pending, (state, action) => {
            state.loading = false
        })
        .addCase(resetPasswordPost.fulfilled, (state, action) => {
            console.log(action)
            state.loading = true;
        })
        .addCase(resetPasswordPost.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default resetPasswordSlice.reducer;