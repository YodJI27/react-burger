import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../utils/IngredientType';

  
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

export const connectWebSocket = createAsyncThunk(
  'websocket/connect',
  async (_, { dispatch }) => {
    const socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');

    socket.onopen = () => {
      console.log('WebSocket connected');
      dispatch(webSocketConnected());
    };

    socket.onmessage = (event: MessageEvent) => {
      const data: WebSocketResponse = JSON.parse(event.data);
      if (data.success) {
        dispatch(webSocketMessageReceived(data));
      } else {
        dispatch(webSocketError('Failed to fetch orders'));
      }
    };

    socket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
      dispatch(webSocketError('WebSocket error occurred'));
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      dispatch(webSocketDisconnected());
    };

    // Не возвращаем socket, чтобы избежать ошибки сериализации
    return null;
  }
);

const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    webSocketConnected(state) {
      state.connected = true;
    },
    webSocketMessageReceived(state, action: PayloadAction<WebSocketResponse>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    webSocketError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    webSocketDisconnected(state) {
      state.connected = false;
    },
    closeWebSocket(state) {
        state.connected = false;
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.error = null;
      },
  },
});

export const {
  webSocketConnected,
  webSocketMessageReceived,
  webSocketError,
  webSocketDisconnected,
  closeWebSocket
} = webSocketSlice.actions;

export default webSocketSlice.reducer;