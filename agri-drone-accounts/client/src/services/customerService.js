import api from './api';

export const customerService = {
  // Get all customers
  getCustomers: async () => {
    try {
      const response = await api.get('/customers');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new customer
  createCustomer: async (customerData) => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get customer by ID
  getCustomerById: async (id) => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
