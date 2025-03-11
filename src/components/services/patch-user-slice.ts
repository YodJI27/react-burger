import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_PATCH_USER = BASE_URL + '/auth/user';
// Список всех ингридиентов

interface PatchUserState {
    loading: boolean;
    error: boolean;
}

const initialState: PatchUserState = {
    loading: false,
    error: false,
};

export const patchUser = createAsyncThunk('patchUs/patchUser', async (value) => {

    const response = await fetch(URL_FOR_PATCH_USER, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify(value)
    })

    return checkResponse(response)
})

const patchUserSlice = createSlice({
    name: 'patchUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(patchUser.pending, (state) => {
            state.loading = false
        })
        .addCase(patchUser.fulfilled, (state) => {
            state.loading = true
        })
        .addCase(patchUser.rejected, (state) => {
            state.error = true
        })
    }
});

export default patchUserSlice.reducer;