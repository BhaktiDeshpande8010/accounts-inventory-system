import api from './api';

export const vendorService = {
  // Get all vendors
  getVendors: async () => {
    try {
      const response = await api.get('/vendors');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new vendor
  createVendor: async (vendorData) => {
    try {
      const response = await api.post('/vendors', vendorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get vendor by ID
  getVendorById: async (id) => {
    try {
      const response = await api.get(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update vendor
  updateVendor: async (id, vendorData) => {
    try {
      const response = await api.put(`/vendors/${id}`, vendorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
