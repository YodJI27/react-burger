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

export const getFeedSlice = createSlice({
    name: "getFeed",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.connected = true;
        },
        wsOpen: (state) => {
            state.connected = true;
            state.error = null;
        },
        wsClose: (state) => {
            state.connected = false;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsMessage: (state, action: PayloadAction<WebSocketResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
})

export const { wsConnecting, wsClose, wsError, wsMessage, wsOpen } = getFeedSlice.actions;

export default getFeedSlice.reducer;

type TActionCreators = typeof getFeedSlice.actions;

export type TWsInternalActions = ReturnType<TActionCreators[keyof TActionCreators]>;