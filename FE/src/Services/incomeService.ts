import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'access-token': `${localStorage.getItem('token')}`
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['access-token'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addIncome = async (incomeData: { incomeTypeId: number; initialAmount: number; notes: string; userId: number; deleted: boolean }) => {
  try {
    const response = await apiClient.post('/addIncome', incomeData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateIncome = async (id: number, incomeData: { initialAmount: number; notes: string }) => {
  try {
    const response = await apiClient.post(`/updateIncome/${id}`, incomeData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const deleteIncome = async (id: number) => {
  try {
    const response = await apiClient.delete(`/deleteIncome/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getIncome = async (id: number) => {
  try {
    const response = await apiClient.get(`/getIncome/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getAllNonDeletedIncomes = async (userId: number) => {
  try {
    const response = await apiClient.get(`/getAllNonDeletedIncomes/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getTotalAvailableIncome = async (userId: number) => {
    try {
      const response = await apiClient.get(`/getTotalAvailableIncome/${userId}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || 'An error occurred');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };
