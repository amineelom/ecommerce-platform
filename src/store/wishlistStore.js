import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useWishlistStore = create((set) => ({
  wishlist: null,
  loading: false,
  error: null,

  getWishlist: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/wishlist');
      set({ wishlist: response.data.wishlist, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addToWishlist: async (productId) => {
    set({ loading: true });
    try {
      const response = await api.post('/wishlist/add', { productId });
      set({ wishlist: response.data.wishlist, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  removeFromWishlist: async (productId) => {
    set({ loading: true });
    try {
      const response = await api.delete(`/wishlist/${productId}`);
      set({ wishlist: response.data.wishlist, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  clearWishlist: async () => {
    set({ loading: true });
    try {
      const response = await api.delete('/wishlist');
      set({ wishlist: response.data.wishlist, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  isInWishlist: async (productId) => {
    try {
      const response = await api.get(`/wishlist/check/${productId}`);
      return response.data.inWishlist;
    } catch (error) {
      throw error;
    }
  },
}));
