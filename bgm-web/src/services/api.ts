import axios from 'axios';
import { Property, Enquiry, WebsiteSettings, PropertyFilterParams } from '../types';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token for admin routes
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('bgm_admin_token');
  if (adminToken && config.url?.includes('/admin')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;

/* =======================================
   PUBLIC BGM REAL ESTATE APIS
======================================= */

// Fetch properties with filters & sorting
export const fetchProperties = async (params?: PropertyFilterParams): Promise<Property[]> => {
  const res = await api.get('/api/properties', { params });
  return res.data;
};

// Fetch single property by slug or id
export const fetchPropertyBySlugOrId = async (identifier: string): Promise<Property> => {
  const res = await api.get(`/api/properties/${identifier}`);
  return res.data;
};

// Submit lead / enquiry
export const submitEnquiry = async (data: Partial<Enquiry>): Promise<{ message: string; enquiry: Enquiry }> => {
  const res = await api.post('/api/enquiries', data);
  return res.data;
};

// Fetch public CMS settings
export const fetchWebsiteSettings = async (): Promise<WebsiteSettings> => {
  const res = await api.get('/api/settings');
  return res.data;
};

/* =======================================
   ADMIN APIS
======================================= */

export const adminLogin = async (credentials: { username?: string; password?: string }) => {
  const res = await api.post('/admin/auth/login', credentials);
  return res.data;
};

export const fetchAdminDashboardStats = async () => {
  const res = await api.get('/api/admin/dashboard');
  return res.data;
};

export const createProperty = async (data: Partial<Property>) => {
  const res = await api.post('/api/admin/properties', data);
  return res.data;
};

export const updateProperty = async (id: string, data: Partial<Property>) => {
  const res = await api.put(`/api/admin/properties/${id}`, data);
  return res.data;
};

export const deleteProperty = async (id: string) => {
  const res = await api.delete(`/api/admin/properties/${id}`);
  return res.data;
};

export const fetchAdminEnquiries = async (params?: { status?: string; search?: string }) => {
  const res = await api.get('/api/admin/enquiries', { params });
  return res.data;
};

export const updateEnquiryStatus = async (id: string, status: string) => {
  const res = await api.put(`/api/admin/enquiries/${id}/status`, { status });
  return res.data;
};

export const updateWebsiteSettings = async (data: Partial<WebsiteSettings>) => {
  const res = await api.put('/api/admin/settings', data);
  return res.data;
};

export const uploadImage = async (file: File, folder: string = 'bgm_properties') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  const res = await api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
