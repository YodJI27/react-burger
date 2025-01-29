import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const URL_FOR_PATCH_USER = "https://norma.nomoreparties.space/api/auth/user";
// Список всех ингридиентов

export const patchUser = createAsyncThunk('patchUs/patchUser', async (value) => {

    console.log(value)

    const response = await fetch(URL_FOR_PATCH_USER, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify(value)
    })

    if(!response.ok) {
        throw new Error('Ошибка')
    }
    
    return response.json();
})

const patchUserSlice = createSlice({
    name: 'patchUser',
    initialState: {
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(patchUser.pending, (state, action) => {
            state.loading = false
        })
        .addCase(patchUser.fulfilled, (state, action) => {
            console.log(action)
        })
        .addCase(patchUser.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default patchUserSlice.reducer;