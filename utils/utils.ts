import {BASE_URL} from './burgerApi'

export const refreshTokenWs = () => {
    return fetch(BASE_URL + `/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    })
};