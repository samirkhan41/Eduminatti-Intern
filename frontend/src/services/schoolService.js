import api from './api';

export const schoolService = {
  // Fetch schools with query parameters
  getSchools: async (params = {}) => {
    const response = await api.get('/schools', { params });
    return response.data;
  },

  // Fetch school details by slug or ID
  getSchoolBySlugOrId: async (slugOrId) => {
    const response = await api.get(`/schools/${slugOrId}`);
    return response.data;
  },

  // Fetch featured schools for homepage
  getFeaturedSchools: async () => {
    const response = await api.get('/schools/featured');
    return response.data;
  },

  // Fetch girls boarding schools
  getGirlsBoardingSchools: async () => {
    const response = await api.get('/schools/girls-boarding');
    return response.data;
  },

  // Compare up to 3 schools
  compareSchools: async (ids) => {
    const idString = Array.isArray(ids) ? ids.join(',') : ids;
    const response = await api.get(`/schools/compare?ids=${idString}`);
    return response.data;
  },

  // Admin: create school
  createSchool: async (schoolData) => {
    const response = await api.post('/schools', schoolData);
    return response.data;
  },

  // Admin: update school
  updateSchool: async (id, schoolData) => {
    const response = await api.put(`/schools/${id}`, schoolData);
    return response.data;
  },

  // Admin: delete school
  deleteSchool: async (id) => {
    const response = await api.delete(`/schools/${id}`);
    return response.data;
  },

  // Admin: get school statistics overview
  getSchoolStats: async () => {
    const response = await api.get('/schools/stats/overview');
    return response.data;
  },

  // Upload image
  uploadImage: async (formData) => {
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default schoolService;

