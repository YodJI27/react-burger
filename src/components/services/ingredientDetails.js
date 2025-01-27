import { createSlice } from "@reduxjs/toolkit";

// объект текущего просматриваемого ингредиента

const ingredientsDetailsSlice = createSlice({
    name: 'ingredientsDetails',
    initialState: {
        ingredientsDetails: {},
    },
    reducers: {
        setIngredientsDetails(state, action) {
            state.ingredientsDetails = action.payload
        }
    }
});


export const {setIngredientsDetails} = ingredientsDetailsSlice.actions;

export default ingredientsDetailsSlice.reducer;