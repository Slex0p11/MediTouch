import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Example reducer, update based on your project

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add reducers here
  },
});

export default store; // ✅ Use default export
