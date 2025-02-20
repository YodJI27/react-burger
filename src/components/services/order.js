import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_ORDER = BASE_URL + '/api/orders';

// объект созданного заказа.

export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {

    const response = await fetch(URL_FOR_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ingredients: orderData})
    })

    return checkResponse(response)
})

const orderSlice = createSlice({
    name: 'ingredientsOrder',
    initialState: {
        order: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state, action) => {
            state.order = '- - - -'
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload.order.number;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.order = action.error.message
        })
    }
});

export default orderSlice.reducer;