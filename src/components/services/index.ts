import {combineSlices, configureStore} from "@reduxjs/toolkit";
import ingredientsSlice from './ingredients';
import orderSlice from './order';
import ingredientsDetailsSlice from './ingredient-details';
import constructorSlice from './constructor';
import forgotPasswordSlice from './forgot-password-slice';
import resetPasswordSlice from './reset-password-slice';
import registerUserSlice from './register-slice';
import loginUserSlice from './login-slice';
import logoutUserSlice from './logout-user-slice';
import refreshTokenSlice from './refresh-token-slice';
import getUserSlice from './get-user-slice';
import patchUserSlice from './patch-user-slice';

const rootReducer = combineSlices({
    ingredientsSlice,
    ingredientsDetailsSlice,
    orderSlice,
    constructorSlice,
    forgotPasswordSlice,
    resetPasswordSlice,
    registerUserSlice,
    loginUserSlice,
    logoutUserSlice,
    refreshTokenSlice,
    getUserSlice,
    patchUserSlice
})

export default configureStore({
    reducer: rootReducer
})