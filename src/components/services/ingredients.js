import { createSlice } from "@reduxjs/toolkit";

// Список всех ингридиентов

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredients: [],
    },
    reducers: {
        setIngredients(state, action) {
            state.ingredients = action.payload
        }
    }
});


export const {setIngredients} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;