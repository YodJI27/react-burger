import {combineReducers, combineSlices, configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from './ingredients';
import orderSlice from './order';
import ingredientsDetailsSlice from './ingredientDetails';
import constructorSlice from './constructor';

const rootReducer = combineSlices({
    ingredientsSlice,
    ingredientsDetailsSlice,
    orderSlice,
    constructorSlice
})

export default configureStore({
    reducer: rootReducer
})