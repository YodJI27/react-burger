import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../utils/IngredientType';

interface OrdersResponse {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}

interface OrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
  socket: WebSocket | null; 
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
  socket: null, 
};

export const connectToOrdersWebSocket = createAsyncThunk(
  'orders/connectToWebSocket',
  async (accessToken: string, { dispatch }) => {
    const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      dispatch(webSocketConnected());
    };

    ws.onmessage = (event) => {
      const data: OrdersResponse = JSON.parse(event.data);
      dispatch(setOrders(data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      dispatch(setError('WebSocket connection error'));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      dispatch(webSocketDisconnected());
    };

    return null;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<OrdersResponse>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    webSocketConnected(state) {
      state.loading = false;
    },
    webSocketDisconnected(state) {
      state.loading = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = null;
    },
    closeWebSocketOrders(state) {
      if (state.socket) {
        state.socket.close();
      }
      state.socket = null;
      state.loading = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectToOrdersWebSocket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectToOrdersWebSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
      })
      .addCase(connectToOrdersWebSocket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to connect to WebSocket';
      });
  },
});

// Экспортируем actions и reducer
export const { setOrders, setError, webSocketConnected, webSocketDisconnected, closeWebSocketOrders } = ordersSlice.actions;
export default ordersSlice.reducer;