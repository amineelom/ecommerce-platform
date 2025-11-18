import { create } from 'zustand';
import { productAPI } from '../api/api';

// Demo products for testing
const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium quality wireless headphones with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300?text=Wireless+Headphones',
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 199.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
    rating: 4.7,
    reviews: 256,
    inStock: true,
  },
  {
    id: '3',
    name: 'USB-C Cable',
    description: 'Durable USB-C charging cable',
    price: 14.99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=USB-C+Cable',
    rating: 4.3,
    reviews: 512,
    inStock: true,
  },
  {
    id: '4',
    name: 'Portable Speaker',
    description: 'Waterproof portable Bluetooth speaker',
    price: 79.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/300x300?text=Portable+Speaker',
    rating: 4.6,
    reviews: 189,
    inStock: true,
  },
  {
    id: '5',
    name: 'Phone Case',
    description: 'Protective phone case with premium materials',
    price: 24.99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Phone+Case',
    rating: 4.4,
    reviews: 342,
    inStock: true,
  },
  {
    id: '6',
    name: 'Screen Protector',
    description: 'Tempered glass screen protector',
    price: 9.99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x300?text=Screen+Protector',
    rating: 4.5,
    reviews: 678,
    inStock: true,
  },
];

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
      // Demo mode - return mock products
      if (localStorage.getItem('isDemo')) {
        await new Promise(resolve => setTimeout(resolve, 300));
        set({
          products: DEMO_PRODUCTS,
          pagination: { page: 1, pages: 1, total: DEMO_PRODUCTS.length },
          loading: false,
        });
        return { products: DEMO_PRODUCTS, pagination: { page: 1, pages: 1, total: DEMO_PRODUCTS.length } };
      }
      
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
      // Demo mode - return mock product
      if (localStorage.getItem('isDemo')) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const product = DEMO_PRODUCTS.find(p => p.id === id) || DEMO_PRODUCTS[0];
        set({ product, loading: false });
        return { product };
      }
      
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
      // Demo mode - return mock featured products
      if (localStorage.getItem('isDemo')) {
        await new Promise(resolve => setTimeout(resolve, 300));
        const featured = DEMO_PRODUCTS.slice(0, 3);
        set({ featuredProducts: featured, loading: false });
        return { products: featured };
      }
      
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
