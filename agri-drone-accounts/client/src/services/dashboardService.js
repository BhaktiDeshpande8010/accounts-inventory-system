import api from './api';

export const dashboardService = {
  // Get dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
