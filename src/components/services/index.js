import {combineReducers, combineSlices, configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from './ingredients';
import orderSlice from './order';
import ingredientsDetailsSlice from './ingredientDetails';
import constructorSlice from './constructor';
import forgotPasswordSlice from './forgot-password-slice';
import resetPasswordSlice from './reset-password-slice';
import registerUserSlice from './register-slice';
import loginUserSlice from './login-slice';

const rootReducer = combineSlices({
    ingredientsSlice,
    ingredientsDetailsSlice,
    orderSlice,
    constructorSlice,
    forgotPasswordSlice,
    resetPasswordSlice,
    registerUserSlice,
    loginUserSlice
})

export default configureStore({
    reducer: rootReducer
})