import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredientPropTypes } from "../../../utils/IngredientType";

// список всех ингредиентов в текущем конструкторе бургера


interface ConstructorState {
    constructor: IIngredientPropTypes[];
    bun: IIngredientPropTypes | null;
}

const initialState: ConstructorState = {
    constructor: [],
    bun: null
}

const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        setConstructor(state, action: PayloadAction<IIngredientPropTypes>) {
            state.constructor.push(action.payload)
        },
        setBunIngredients(state, action: PayloadAction<IIngredientPropTypes>) {
            state.bun = action.payload
        },
        setDeleteIngredient(state, action: PayloadAction<number>) {
            state.constructor.splice(action.payload, 1);
        },
        setDragConstructor(state, action:  PayloadAction<{ first: number; second: number }>) {
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