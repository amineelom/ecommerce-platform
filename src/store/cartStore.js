import { create } from 'zustand';
import { cartAPI } from '../api/api';

export const useCartStore = create((set) => ({
  cart: null,
  loading: false,
  error: null,

  getCart: async () => {
    set({ loading: true });
    try {
      const response = await cartAPI.getCart();
      set({ cart: response.data.cart, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addToCart: async (productId, quantity) => {
    set({ loading: true });
    try {
      const response = await cartAPI.addToCart({ productId, quantity });
      set({ cart: response.data.cart, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateCartItem: async (productId, quantity) => {
    set({ loading: true });
    try {
      const response = await cartAPI.updateCartItem({ productId, quantity });
      set({ cart: response.data.cart, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    set({ loading: true });
    try {
      const response = await cartAPI.removeFromCart(productId);
      set({ cart: response.data.cart, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      const response = await cartAPI.clearCart();
      set({ cart: response.data.cart, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
