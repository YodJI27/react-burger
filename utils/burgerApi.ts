export const BASE_URL = "https://norma.nomoreparties.space/api";

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
}