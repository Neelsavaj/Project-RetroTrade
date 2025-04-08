import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[]
    },
    reducers:{

        addToCart:(state,action)=>{

             console.log("state,,,,",state)
             console.log("action",action)
            state.cart.push(action.payload)
        },
        removeFromCart: (state, action) => {
            console.log("Removing item with ID:", action.payload);
            state.cart = state.cart.filter(product => product._id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find((item) => item._id === id);
            if (item && quantity >= 1) {
              item.quantity = quantity; // Ensure quantity is always 1 or more
            }
          },
          clearCart: (state) => {
            state.cart = [];
        },

    }
        
})

export const {addToCart ,removeFromCart,increaseQuantity,decreaseQuantity,updateQuantity,clearCart} =cartSlice.actions
export default cartSlice.reducer