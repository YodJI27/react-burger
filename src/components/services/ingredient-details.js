import { createSlice } from "@reduxjs/toolkit";

// объект текущего просматриваемого ингредиента

const ingredientsDetailsSlice = createSlice({
    name: 'ingredientsDetails',
    initialState: {
        ingredientsDetails: null,
        open: false,
    },
    reducers: {
        setIngredientsDetails(state, action) {
            state.ingredientsDetails = action.payload;
        },
        setOpenModalIngredients(state, action) {
            state.open = action.payload;
        }
    }
});


export const {setIngredientsDetails, setOpenModalIngredients} = ingredientsDetailsSlice.actions;

export default ingredientsDetailsSlice.reducer;