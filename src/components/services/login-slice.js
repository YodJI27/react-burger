import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_LOGIN_USER = BASE_URL + '/auth/login';

export const loginUser = createAsyncThunk('logUs/loginUser', async (value) => {

    const response = await fetch(URL_FOR_LOGIN_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(value)
    });

    return checkResponse(response)
})

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: {
        email: null,
        name: '',
        error: false,
        userAccess: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.userAccess = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;

            const authToken = action.payload.accessToken.split(' ')[1];
            const refreshToken = action.payload.refreshToken;

            if(authToken) {
                localStorage.setItem('accessToken', authToken);
            }

            localStorage.setItem('refreshToken', refreshToken);

            state.userAccess = true;
            
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = true
            state.userAccess = false;
        })
    }
});

export default loginUserSlice.reducer;