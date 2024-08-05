import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    const { token } = response.data.token;

    localStorage.setItem('authToken', token);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error('An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const register = async (username: string, email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        username,
        email,
        password,
        firstName,
        lastName,
      });
      return response.data;
    }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw error.response?.data || new Error('An error occurred');
        } else {
          throw new Error('An unexpected error occurred');
        }
      }
  };

  export const getSessionUser = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getSessionUserId`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data.userId;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || new Error('An error occurred');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };