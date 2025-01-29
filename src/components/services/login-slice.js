import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_LOGIN_USER = "https://norma.nomoreparties.space/api/auth/login";

export const loginUser = createAsyncThunk('logUs/loginUser', async (value) => {

    const response = await fetch(URL_FOR_LOGIN_USER, {
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

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: {
        email: '',
        name: '',
        error: false,
        access: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.access = false;
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
            
            state.access = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default loginUserSlice.reducer;