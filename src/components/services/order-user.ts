import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../../utils/IngredientType";

interface WebSocketResponse {
    success: boolean;
    orders: Order[];
    total: number;
    totalToday: number;
}

interface WebSocketState {
  connected: boolean;
  orders: Order[];
  total: number; 
  totalToday: number; 
  error: string | null;
}

const initialState: WebSocketState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const ordersUserSlice = createSlice({
    name: "ordersUser",
    initialState,
    reducers: {
        wsConnectingProfile: (state) => {
            state.connected = true;
        },
        wsOpenProfile: (state) => {
            state.connected = true;
            state.error = null;
        },
        wsCloseProfile: (state) => {
            state.connected = false;
        },
        wsErrorProfile: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsMessageProfile: (state, action: PayloadAction<WebSocketResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
})

export const { wsConnectingProfile, wsOpenProfile, wsCloseProfile, wsErrorProfile, wsMessageProfile } = ordersUserSlice.actions;

export default ordersUserSlice.reducer;

type TActionCreators = typeof ordersUserSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;