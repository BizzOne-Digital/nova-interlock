import axiosClient from './axiosClient';

export const authApi = {
  login: (data) => axiosClient.post('/auth/login', data),
  me: () => axiosClient.get('/auth/me'),
};

export const leadsApi = {
  create: (data) => axiosClient.post('/leads', data),
  getAll: (params) => axiosClient.get('/leads', { params }),
  getById: (id) => axiosClient.get(`/leads/${id}`),
  update: (id, data) => axiosClient.put(`/leads/${id}`, data),
  remove: (id) => axiosClient.delete(`/leads/${id}`),
  stats: () => axiosClient.get('/leads/stats'),
};

export const servicesApi = {
  getAll: (params) => axiosClient.get('/services', { params }),
  getById: (id) => axiosClient.get(`/services/${id}`),
  create: (formData) => axiosClient.post('/services', formData),
  update: (id, formData) => axiosClient.put(`/services/${id}`, formData),
  remove: (id) => axiosClient.delete(`/services/${id}`),
};

export const projectsApi = {
  getAll: (params) => axiosClient.get('/projects', { params }),
  getById: (id) => axiosClient.get(`/projects/${id}`),
  create: (formData) => axiosClient.post('/projects', formData),
  update: (id, formData) => axiosClient.put(`/projects/${id}`, formData),
  remove: (id) => axiosClient.delete(`/projects/${id}`),
};

export const galleryApi = {
  getAll: (params) => axiosClient.get('/gallery', { params }),
  create: (formData) => axiosClient.post('/gallery', formData),
  update: (id, formData) => axiosClient.put(`/gallery/${id}`, formData),
  remove: (id) => axiosClient.delete(`/gallery/${id}`),
};

export const productsApi = {
  getAll: (params) => axiosClient.get('/products', { params }),
  getById: (id) => axiosClient.get(`/products/${id}`),
  create: (formData) => axiosClient.post('/products', formData),
  update: (id, formData) => axiosClient.put(`/products/${id}`, formData),
  remove: (id) => axiosClient.delete(`/products/${id}`),
};

export const testimonialsApi = {
  getAll: (params) => axiosClient.get('/testimonials', { params }),
  create: (data) => axiosClient.post('/testimonials', data),
  update: (id, data) => axiosClient.put(`/testimonials/${id}`, data),
  remove: (id) => axiosClient.delete(`/testimonials/${id}`),
};

export const contentApi = {
  getAll: () => axiosClient.get('/content'),
  getSection: (section) => axiosClient.get(`/content/${section}`),
  updateSection: (section, data) => axiosClient.put(`/content/${section}`, data),
  getStatistics: () => axiosClient.get('/content/statistics/data'),
  updateStatistics: (data) => axiosClient.put('/content/statistics/data', data),
};

export const settingsApi = {
  get: () => axiosClient.get('/settings'),
  update: (data) => axiosClient.put('/settings', data),
};

export const dashboardApi = {
  getSummary: () => axiosClient.get('/dashboard'),
};
