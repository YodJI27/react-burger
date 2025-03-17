import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from '../../../utils/burgerApi';
import { IIngredientPropTypes } from "../../../utils/IngredientType";

const URL_FOR_INGREDIENTS = BASE_URL + "/ingredients";

interface IngredientsResponse {
    success: boolean;
    data: IIngredientPropTypes[];
}

interface IngredientsState {
    ingredients: IIngredientPropTypes[];
    loading: boolean;
    error: boolean;
    priceIngTotal: number;
    priceBunTotal: number;
}

const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: false,
    priceIngTotal: 0,
    priceBunTotal: 0
};

export const getIngredients = createAsyncThunk<IngredientsResponse, void, { rejectValue: string }>(
    'ing/getIng',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(URL_FOR_INGREDIENTS);

            if (!response.ok) {
                throw new Error('Ошибка при загрузке ингредиентов');
            }

            const data: IngredientsResponse = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setPriceIngTotal(state, action: PayloadAction<number>) {
            state.priceIngTotal = action.payload;
        },
        setPriceBunTotal(state, action: PayloadAction<number>) {
            state.priceBunTotal = action.payload;
        },
        setPriceClear(state) {
            state.priceBunTotal = 0;
            state.priceIngTotal = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getIngredients.fulfilled, (state, action: PayloadAction<IngredientsResponse>) => {
                state.ingredients = action.payload.data;
                state.loading = false;
                state.error = false;
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
            });
    }
});

export const { setPriceIngTotal, setPriceBunTotal, setPriceClear } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;