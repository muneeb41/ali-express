import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        // Update the specific item
        state[existingItemIndex] = {
          ...state[existingItemIndex],
          quantity: state[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add a new item to the cart
        state.push(action.payload);
      }
      // Update localStorage with the new state
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const updatedCart = state.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },
    clearCart: (state) => {
      localStorage.removeItem('cart');
      return [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.findIndex((item) => item.id === id);
      if (existingItemIndex!== -1 && quantity > 0) {
        state[existingItemIndex] = {
         ...state[existingItemIndex],
          quantity,
        };
      }
      localStorage.setItem('cart', JSON.stringify(state));
      return state;
    }
  },
});

export const { addToCart, removeFromCart, clearCart  ,updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;
