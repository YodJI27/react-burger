import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {BASE_URL, checkResponse} from '../../../utils/burgerApi'
const URL_FOR_FORGOT_PASSWORD = BASE_URL + "/password-reset";

interface ForgotPasswordRequest {
    email: string;
  }
  
  interface ForgotPasswordResponse {
    success: boolean;
    message: string;
  }

  interface ForgotPasswordState {
    message: string;
    loading: boolean;
    error: boolean;
  }
  
  const initialState: ForgotPasswordState = {
    message: "",
    loading: false,
    error: false,
  };

  export const forgotPasswordPost = createAsyncThunk<
    ForgotPasswordResponse,
    ForgotPasswordRequest, 
    { rejectValue: string }
  >(
    'forPass/forgotPass',
    async (value: ForgotPasswordRequest, { rejectWithValue }) => {
      try {
        const response = await fetch(URL_FOR_FORGOT_PASSWORD, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(value),
        });
  
        const data = await checkResponse(response);
        return data;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    }
  );
  
  // Создаем slice
  const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(forgotPasswordPost.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(forgotPasswordPost.fulfilled, (state, action) => {
          state.loading = false;
          state.message = action.payload.message;
        })
        .addCase(forgotPasswordPost.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "An error occurred";
        });
    },
  });
  
  export default forgotPasswordSlice.reducer;