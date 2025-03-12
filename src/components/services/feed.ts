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
  orders: Order[]; // Массив заказов
  total: number; // Общее количество заказов
  totalToday: number; // Количество заказов за сегодня
  error: string | null;
}

const initialState: WebSocketState = {
  connected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

// Создаем асинхронный thunk для подключения к вебсокету
export const connectWebSocket = createAsyncThunk(
  'websocket/connect',
  async (_, { dispatch }) => {
    const socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');

    socket.onopen = () => {
      console.log('WebSocket connected');
      dispatch(webSocketConnected());
    };

    socket.onmessage = (event: MessageEvent) => {
      const data: WebSocketResponse = JSON.parse(event.data); // Парсим данные
      if (data.success) {
        dispatch(webSocketMessageReceived(data)); // Отправляем данные в Redux
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
      state.orders = action.payload.orders; // Обновляем заказы
      state.total = action.payload.total; // Обновляем общее количество
      state.totalToday = action.payload.totalToday; // Обновляем количество за сегодня
    },
    webSocketError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    webSocketDisconnected(state) {
      state.connected = false;
    },
  },
});

export const {
  webSocketConnected,
  webSocketMessageReceived,
  webSocketError,
  webSocketDisconnected,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;