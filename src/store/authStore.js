import { create } from 'zustand';
import { authAPI } from '../api/api';

// Demo mode flag - set to true to enable demo without backend
const DEMO_MODE = true;

// Mock demo user
const DEMO_USER = {
  id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: '👤',
  joinDate: new Date().toISOString(),
};

// Mock demo token
const DEMO_TOKEN = 'demo-token-' + Math.random().toString(36).substr(2, 9);

export const useAuthStore = create((set) => ({
  user: localStorage.getItem('isDemo') ? DEMO_USER : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isDemoMode: DEMO_MODE,

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      // Demo mode - simulate registration without backend
      if (DEMO_MODE) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const demoUser = { ...DEMO_USER, name, email };
        localStorage.setItem('token', DEMO_TOKEN);
        localStorage.setItem('isDemo', 'true');
        set({ user: demoUser, token: DEMO_TOKEN, loading: false });
        return { token: DEMO_TOKEN, user: demoUser };
      }
      
      const response = await authAPI.register({ name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.removeItem('isDemo');
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
      // Demo mode - simulate login without backend
      if (DEMO_MODE) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.setItem('token', DEMO_TOKEN);
        localStorage.setItem('isDemo', 'true');
        set({ user: DEMO_USER, token: DEMO_TOKEN, loading: false });
        return { token: DEMO_TOKEN, user: DEMO_USER };
      }
      
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.removeItem('isDemo');
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
    localStorage.removeItem('isDemo');
    set({ user: null, token: null });
  },

  getProfile: async () => {
    set({ loading: true });
    try {
      // Demo mode - return mock profile
      if (DEMO_MODE && localStorage.getItem('isDemo')) {
        set({ user: DEMO_USER, loading: false });
        return { user: DEMO_USER };
      }
      
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
      // Demo mode - update local user
      if (DEMO_MODE && localStorage.getItem('isDemo')) {
        const updatedUser = { ...DEMO_USER, ...data };
        set({ user: updatedUser, loading: false });
        return { user: updatedUser };
      }
      
      const response = await authAPI.updateProfile(data);
      set({ user: response.data.user, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  setDemoMode: (enabled) => {
    if (enabled) {
      localStorage.setItem('token', DEMO_TOKEN);
      localStorage.setItem('isDemo', 'true');
      set({ user: DEMO_USER, token: DEMO_TOKEN });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('isDemo');
      set({ user: null, token: null });
    }
  },
}));
