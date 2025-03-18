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
import getOrderDataSlice from './info-order';
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsConnect, wsDisconnect } from "./actions/websocketActions";
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./feed";
import getFeedSlice from './feed';
import ordersUserSlice, { wsCloseProfile, wsConnectingProfile, wsErrorProfile, wsMessageProfile, wsOpenProfile } from './order-user';
import { wsConnectProfile, wsDisconnectProfile } from "./actions/orders-info";

const socketMiddlewareFeed = socketMiddleware({
    wsConnect: wsConnect,
    wsDisconnect: wsDisconnect,
    wsConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage
});

const socketMiddlewareProfile = socketMiddleware({
    wsConnect: wsConnectProfile,
    wsDisconnect: wsDisconnectProfile,
    wsConnecting: wsConnectingProfile,
    onOpen: wsOpenProfile,
    onClose: wsCloseProfile,
    onError: wsErrorProfile,
    onMessage: wsMessageProfile
});

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
    patchUserSlice,
    getOrderDataSlice,
    ordersUserSlice,
    getFeedSlice
})

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidlewares) => {
        return getDefaultMidlewares().concat(socketMiddlewareFeed, socketMiddlewareProfile);
    }
})

export type RootState = ReturnType<typeof rootReducer>;