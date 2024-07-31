import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'access-token': `${localStorage.getItem('token')}`
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['access-token'] = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const addIncomeType = async (incomeTypeName: string) => {
  try {
    const response = await apiClient.post('/addIncomeType', { incomeTypeName });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateIncomeType = async (id: number, incomeTypeName: string) => {
  try {
    const response = await apiClient.post(`/updateIncomeType/${id}`, { incomeTypeName });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const deleteIncomeType = async (id: number) => {
  try {
    const response = await apiClient.delete(`/deleteIncomeType/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getAllNonDeletedIncomeTypes = async () => {
  try {
    const response = await apiClient.get('/getAllNonDeletedIncomeTypes');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
