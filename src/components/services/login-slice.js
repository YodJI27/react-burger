import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_LOGIN_USER = "https://norma.nomoreparties.space/api/auth/login";
// Список всех ингридиентов

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
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.loading = false
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;

            // добавить оба токена в localStorage
            state.loading = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default loginUserSlice.reducer;

// {
//     "type": "logUs/loginUser/fulfilled",
//     "payload": {
//         "success": true,
//         "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTkyNzExMTMzYWNkMDAxYmU0ZDMxZiIsImlhdCI6MTczODA5ODY3MiwiZXhwIjoxNzM4MDk5ODcyfQ.Hc1y83rdsULjL_wMnqI0jtXWTtUTk0RCt0fyuDfck5w",
//         "refreshToken": "74b9715db2205f36a0fe37c5a4048df1104fa28fa670951cc5b389636c8e313ef28d2ef51e2119ee",
//         "user": {
//             "email": "yodji62@yandex.ru",
//             "name": "Илья"
//         }
//     },
//     "meta": {
//         "arg": {
//             "email": "yodji62@yandex.ru",
//             "password": "admin123"
//         },
//         "requestId": "yXzdXNlGRlgfvTRgLZDWs",
//         "requestStatus": "fulfilled"
//     }
// }