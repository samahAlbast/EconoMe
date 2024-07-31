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

export const addExpenseType = async (expenseTypeName: string) => {
  try {
    const response = await apiClient.post('/addExpenseType', { expenseTypeName });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateExpenseType = async (id: number, expenseTypeName: string) => {
  try {
    const response = await apiClient.post(`/updateExpenseType/${id}`, { expenseTypeName });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const deleteExpenseType = async (id: number) => {
  try {
    const response = await apiClient.delete(`/deleteExpenseType/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getAllNonDeletedExpenseTypes = async () => {
  try {
    const response = await apiClient.get('/getAllNonDeletedExpenseTypes');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
