import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlices.jsx';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});