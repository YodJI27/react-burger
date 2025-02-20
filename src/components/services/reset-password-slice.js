import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_RESET_PASSWORD =  BASE_URL + "/password-reset/reset";
// Список всех ингридиентов

export const resetPasswordPost = createAsyncThunk('resPass/resetPassword', async (value) => {

    const response = await fetch(URL_FOR_RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(value)
    })

    return checkResponse(response)
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
            state.loading = true;
        })
        .addCase(resetPasswordPost.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default resetPasswordSlice.reducer;