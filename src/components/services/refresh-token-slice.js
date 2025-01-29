import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_REFRESH_TOKEN = "https://norma.nomoreparties.space/api/auth/token";

export const refreshToken = createAsyncThunk('refTok/refreshToken', async () => {

    const response = await fetch(URL_FOR_REFRESH_TOKEN, {
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

const refreshTokenSlice = createSlice({
    name: 'refreshToken',
    initialState: {
        access: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(refreshToken.pending, (state, action) => {
            state.access = false
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            const authToken = action.payload.accessToken.split(' ')[1];
            const refreshToken = action.payload.refreshToken;

            console.log('refresh', authToken)

            if(authToken) {
                console.log('токен изменен')
                localStorage.setItem('accessToken', authToken);
            }

            localStorage.setItem('refreshToken', refreshToken);

            state.access = true;
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default refreshTokenSlice.reducer;