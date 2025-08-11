import api from './api';

export const purchaseService = {
  // Get all purchases
  getPurchases: async () => {
    try {
      const response = await api.get('/purchases');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new purchase
  createPurchase: async (purchaseData) => {
    try {
      const response = await api.post('/purchases', purchaseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get purchase by ID
  getPurchaseById: async (id) => {
    try {
      const response = await api.get(`/purchases/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
