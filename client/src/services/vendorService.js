// src/services/vendorService.js
import api from './api';

const VendorService = {
  // Get all vendors with pagination
  getVendors: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/vendors?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vendors:', error);
      throw error;
    }
  },

  // Create new vendor
  createVendor: async (vendorData) => {
    try {
      const formData = new FormData();
      
      // Append all fields to formData
      Object.keys(vendorData).forEach(key => {
        if (key === 'undertakingSignature' && vendorData[key]) {
          formData.append('signature', vendorData[key]);
        } else if (typeof vendorData[key] === 'object') {
          formData.append(key, JSON.stringify(vendorData[key]));
        } else {
          formData.append(key, vendorData[key]);
        }
      });

      const response = await api.post('/vendors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating vendor:', error);
      throw error;
    }
  },

  // Update vendor
  updateVendor: async (id, vendorData) => {
    try {
      const formData = new FormData();
      
      Object.keys(vendorData).forEach(key => {
        if (key === 'undertakingSignature' && vendorData[key]) {
          formData.append('signature', vendorData[key]);
        } else if (typeof vendorData[key] === 'object') {
          formData.append(key, JSON.stringify(vendorData[key]));
        } else {
          formData.append(key, vendorData[key]);
        }
      });

      const response = await api.put(`/vendors/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating vendor:', error);
      throw error;
    }
  },

  // Delete vendor
  deleteVendor: async (id) => {
    try {
      const response = await api.delete(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw error;
    }
  },
};

export default VendorService;