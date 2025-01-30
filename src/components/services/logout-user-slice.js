import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_LOGOUT_USER = "https://norma.nomoreparties.space/api/auth/logout";

export const logoutUser = createAsyncThunk('logoutUs/logoutUser', async (value) => {

    const response = await fetch(URL_FOR_LOGOUT_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token: localStorage.getItem('refreshToken')})
    })

    if(!response.ok) {
        throw new Error('Ошибка')
    }
    
    return response.json();
})

const logoutUserSlice = createSlice({
    name: 'logoutUser',
    initialState: {
        statusOut: false,
        errorOut: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(logoutUser.pending, (state, action) => {
            state.statusOut = false
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.statusOut = true;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.errorOut = true
        })
    }
});

export default logoutUserSlice.reducer;