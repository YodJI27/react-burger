import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_REGISTER_USER =  BASE_URL + "/auth/register";
// Список всех ингридиентов

export const registerUser = createAsyncThunk('regUs/registerUser', async (value) => {

    const response = await fetch(URL_FOR_REGISTER_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(value)
    })

    return checkResponse(response)
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