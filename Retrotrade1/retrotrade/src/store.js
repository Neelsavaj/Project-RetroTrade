import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/CartSlice";
import authReducer from "./redux/AuthSlice"; 

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    }
});
