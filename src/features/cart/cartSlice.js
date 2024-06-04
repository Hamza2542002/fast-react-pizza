import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) return;
      state.cart.push(item);
    },

    deleteItem(state, action) {
      //  payload => {pizzaId}
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) state.cart = state.cart.filter((i) => i.id !== action.payload);
    },

    updateItemQuantity(state, action) {
      // payload => {pizzaId , quantity =>{-1, 1}}
      const item = state.cart.find((i) => i.id === action.payload.pizzaId);
      if (!item) return;
      if (item.quantity === 1 && action.payload.quantity === -1) {
        state.cart = state.cart.filter((i) => i.id !== action.payload.pizzaId);
        return;
        // or
        // cartSlice.caseReducers.deleteItem(state, action);
      }
      item.quantity += action.payload.quantity;
      item.totalPrice += item.unitPrice * action.payload.quantity;
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, updateItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getQuantity = (state) => {
  return state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
};

export const getTotalPrice = (state) => {
  return state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
};

export const getCart = (state) => state.cart.cart;
