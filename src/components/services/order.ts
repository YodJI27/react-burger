import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from '../../../utils/burgerApi';

const URL_FOR_ORDER = BASE_URL + '/orders';

interface OrderData {
    ingredients: string[];
}

interface OrderResponse {
    success: boolean;
    order: {
        number: number;
    };
    message?: string;
}

interface OrderState {
    order: number | string | null; 
}

const initialState: OrderState = {
    order: null,
};

export const createOrder = createAsyncThunk<OrderResponse, OrderData, { rejectValue: string }>(
    'order/createOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await fetch(URL_FOR_ORDER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify(orderData),
            });

            const data: OrderResponse = await checkResponse(response);
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const orderSlice = createSlice({
    name: 'ingredientsOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.order = '- - - -';
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
                state.order = action.payload.order.number;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.order = action.payload || 'Ошибка при создании заказа';
            });
    }
});

export default orderSlice.reducer;