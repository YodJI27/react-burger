import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL} from '../../../utils/burgerApi'
const URL_FOR_INGREDIENTS = BASE_URL + "/ingredients";
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
        priceIngTotal: 0,
        priceBunTotal: 0
    },
    reducers: {
        setPriceIngTotal(state, action) {
            state.priceIngTotal = action.payload;
        },
        setPriceBunTotal(state, action) {
            state.priceBunTotal = action.payload;
        }
    },
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

export const {setPriceIngTotal, setPriceBunTotal} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;