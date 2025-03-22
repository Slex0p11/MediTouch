import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart items
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/cart/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add item to cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ medicine_id, quantity }, { dispatch, rejectWithValue }) => {
  try {
    await axios.post(
      "http://127.0.0.1:8000/cart/add/",
      { medicine_id, quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    dispatch(fetchCart());
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
