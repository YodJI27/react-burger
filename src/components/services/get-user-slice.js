import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_GET_USER = "https://norma.nomoreparties.space/api/auth/user";
// Список всех ингридиентов

export const authUser = createAsyncThunk('authUs/authUser', async () => {

    const response = await fetch(URL_FOR_GET_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })

    if(!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message)
    }

    return response.json();

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

            console.log(action);
            
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;
            state.loading = true;
        })
        .addCase(authUser.rejected, (state, action) => {
            state.message = action.error.message;
            state.loading = true;
        })
    }
});

export default getUserSlice.reducer;