import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice'; // se lo usi
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer, // opzionale
    user: userReducer
  },
});

export default store;