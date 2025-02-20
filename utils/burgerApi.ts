export const BASE_URL = "https://norma.nomoreparties.space/api";

export const checkResponse = (res: any) => {
    return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
}