import api from './api';

export const enquiryService = {
  // Public enquiry submission
  submitEnquiry: async (data) => {
    const response = await api.post('/enquiries', data);
    return response.data;
  },

  // Authenticated user's enquiries
  getMyEnquiries: async () => {
    const response = await api.get('/enquiries/my');
    return response.data;
  },

  // Admin: get all enquiries with status filter and search
  getAllEnquiries: async (params = {}) => {
    const response = await api.get('/enquiries', { params });
    return response.data;
  },

  // Admin: update enquiry status & notes
  updateEnquiryStatus: async (id, updateData) => {
    const response = await api.put(`/enquiries/${id}`, updateData);
    return response.data;
  },

  // Admin: delete enquiry
  deleteEnquiry: async (id) => {
    const response = await api.delete(`/enquiries/${id}`);
    return response.data;
  },

  // Admin: get enquiry stats
  getEnquiryStats: async () => {
    const response = await api.get('/enquiries/stats');
    return response.data;
  },
};

export default enquiryService;
