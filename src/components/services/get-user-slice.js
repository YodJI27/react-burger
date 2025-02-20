import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_GET_USER = BASE_URL + "/auth/user";
// Список всех ингридиентов



export const checkUserAuth = () => {
    if(localStorage.getItem('accessToken')) {
        return true
    } else {
        return false
    }
}

export const authUser = createAsyncThunk('authUs/authUser', async () => {

    const response = await fetch(URL_FOR_GET_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })

    return checkResponse(response)

})

const getUserSlice = createSlice({
    name: 'getUser',
    initialState: {
        email: '',
        name: '',
        message: '',
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(authUser.pending, (state, action) => {
            state.loading = false
        })
        .addCase(authUser.fulfilled, (state, action) => {
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;
            state.loading = true;
        })
        .addCase(authUser.rejected, (state, action) => {
            state.message = action.error.message
            state.error = true;
        })
    }
});

export default getUserSlice.reducer;