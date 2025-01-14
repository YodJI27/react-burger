import { createSlice } from "@reduxjs/toolkit";

// список всех ингредиентов в текущем конструкторе бургера

const constructorSlice = createSlice({
    name: 'constructor',
    initialState: {
        constructor: [],
        bun: null
    },
    reducers: {
        setConstructor(state, action) {
            state.constructor.push(action.payload)
        },
        setBunIngredients(state, action) {
            state.bun = action.payload
        },
        setDeleteIngredient(state, action) {
            state.constructor.splice(action.payload, 1);
        },
        setDragConstructor(state, action) {
            const checkFirst = action.payload.first;
            const checkSecond = action.payload.second;

            const newArray = [...state.constructor];

            [newArray[checkFirst], newArray[checkSecond]] = [newArray[checkSecond], newArray[checkFirst]];

            state.constructor = newArray;
        }
    }
});


export const {setConstructor, setBunIngredients, setDeleteIngredient, setDragConstructor} = constructorSlice.actions;

export default constructorSlice.reducer;