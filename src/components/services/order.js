import { createSlice } from "@reduxjs/toolkit";

// объект созданного заказа.

const orderSlice = createSlice({
    name: 'ingredientsOrder',
    initialState: {
        order: {},
    },
    reducers: {
        setOrder(state, action) {
            state.order = action.payload
        }
    }
});


export const {setOrder} = orderSlice.actions;

export default orderSlice.reducer;