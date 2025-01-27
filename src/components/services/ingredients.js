import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_INGREDIENTS = "https://norma.nomoreparties.space/api/ingredients";
// Список всех ингридиентов

export const getIngredients = createAsyncThunk('ing/getIng', async () => {

    const response = await fetch(URL_FOR_INGREDIENTS)

    if(!response.ok) {
        throw new Error('Ошибка')
    }

    return response.json();
})

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredients: [],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getIngredients.pending, (state, action) => {
            state.loading = false
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload.data;
            state.loading = true;
        })
        .addCase(getIngredients.rejected, (state, action) => {
            state.error = true
        })
    }
});

export default ingredientsSlice.reducer;