import { create } from 'zustand';
import { orderAPI } from '../api/api';

export const useOrderStore = create((set) => ({
  orders: [],
  order: null,
  loading: false,
  error: null,
  pagination: null,

  createOrder: async (data) => {
    set({ loading: true });
    try {
      const response = await orderAPI.createOrder(data);
      set({ order: response.data.order, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  getOrders: async () => {
    set({ loading: true });
    try {
      const response = await orderAPI.getOrders();
      set({ orders: response.data.orders, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  getOrderById: async (id) => {
    set({ loading: true });
    try {
      const response = await orderAPI.getOrderById(id);
      set({ order: response.data.order, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  processPayment: async (id, data) => {
    set({ loading: true });
    try {
      const response = await orderAPI.processPayment(id, data);
      set({ order: response.data.order, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  getAllOrders: async (params) => {
    set({ loading: true });
    try {
      const response = await orderAPI.getAllOrders(params);
      set({
        orders: response.data.orders,
        pagination: response.data.pagination,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateOrderStatus: async (id, data) => {
    set({ loading: true });
    try {
      const response = await orderAPI.updateOrderStatus(id, data);
      set({ order: response.data.order, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
