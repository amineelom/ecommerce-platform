import { create } from 'zustand';
import { authAPI } from '../api/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.register({ name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, loading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({ error: errorMsg, loading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, loading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({ error: errorMsg, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  getProfile: async () => {
    set({ loading: true });
    try {
      const response = await authAPI.getProfile();
      set({ user: response.data.user, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateProfile: async (data) => {
    set({ loading: true });
    try {
      const response = await authAPI.updateProfile(data);
      set({ user: response.data.user, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
