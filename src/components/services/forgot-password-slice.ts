import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_FORGOT_PASSWORD = BASE_URL + "/password-reset";
// Список всех ингридиентов

export const forgotPasswordPost = createAsyncThunk('forPass/forgotPass', async (value) => {

    const response = await fetch(URL_FOR_FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(value)
    })

    return checkResponse(response)
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
        .addCase(forgotPasswordPost.pending, (state) => {
            state.loading = false
        })
        .addCase(forgotPasswordPost.fulfilled, (state) => {
            state.loading = true;
        })
        .addCase(forgotPasswordPost.rejected, (state) => {
            state.error = true
        })
    }
});

export default forgotPasswordSlice.reducer;