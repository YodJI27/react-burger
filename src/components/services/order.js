import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL_FOR_ORDER = 'https://norma.nomoreparties.space/api/orders';

// объект созданного заказа.

export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {

    const response = await fetch(URL_FOR_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ingredients: orderData})
    })

    if(!response.ok) {
        throw new Error('Ошибка')
    }

    return response.json();
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