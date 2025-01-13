import { createSlice } from "@reduxjs/toolkit";

// список всех ингредиентов в текущем конструкторе бургера

const constructorSlice = createSlice({
    name: 'constructor',
    initialState: {
        constructor: [],
        bun: {},
    },
    reducers: {
        setConstructor(state, action) {
            state.constructor.push(action.payload)
        },
        setBunIngredients(state, action) {
            state.bun = action.payload
        }
    }
});


export const {setConstructor, setBunIngredients} = constructorSlice.actions;

export default constructorSlice.reducer;