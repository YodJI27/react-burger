import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi';
import { Order } from "../../../utils/IngredientType";
// Список всех ингридиентов

interface OrderState {
    order: Order;
    loading: boolean;
    error: boolean;
}

const initialState: OrderState = {
    order: {
        _id: "",
        number: 0,
        createdAt: "",
        ingredients: [],
        name: "",
        status: "pending",
        updatedAt: ""
    },
    loading: true,
    error: false
};

export const getOrderData = createAsyncThunk('getOrder/getOrderData', async (value: number) => {

    const response = await fetch(BASE_URL + `/orders/${value}`);

    return checkResponse(response)
})

const getOrderDataSlice = createSlice({
    name: 'getOrderData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getOrderData.pending, (state) => {
            state.loading = false
        })
        .addCase(getOrderData.fulfilled, (state, action) => {
            state.order = action.payload.orders[0];
            state.loading = false;
        })
        .addCase(getOrderData.rejected, (state) => {
            state.error = true
        })
    }
});

export default getOrderDataSlice.reducer;