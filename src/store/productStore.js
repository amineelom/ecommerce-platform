import { create } from 'zustand';
import { productAPI } from '../api/api';

export const useProductStore = create((set) => ({
  products: [],
  product: null,
  featuredProducts: [],
  loading: false,
  error: null,
  pagination: null,

  getAllProducts: async (params) => {
    set({ loading: true });
    try {
      const response = await productAPI.getAllProducts(params);
      set({
        products: response.data.products,
        pagination: response.data.pagination,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  getProductById: async (id) => {
    set({ loading: true });
    try {
      const response = await productAPI.getProductById(id);
      set({ product: response.data.product, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  getFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await productAPI.getFeaturedProducts();
      set({ featuredProducts: response.data.products, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  createProduct: async (data) => {
    set({ loading: true });
    try {
      const response = await productAPI.createProduct(data);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateProduct: async (id, data) => {
    set({ loading: true });
    try {
      const response = await productAPI.updateProduct(id, data);
      set({ product: response.data.product, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await productAPI.deleteProduct(id);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addReview: async (id, data) => {
    set({ loading: true });
    try {
      const response = await productAPI.addReview(id, data);
      set({ product: response.data.product, loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
