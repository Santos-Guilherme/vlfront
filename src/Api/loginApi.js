import axios from 'axios';
import { API_ADDRESS } from './constant';

export async function buscarLogin(login) {
  try {
    const response = await axios.post(`${API_ADDRESS}/login/entrar`, login);
    return response.data;
    
  } catch (error) {
    console.log(error, 'Erro ao buscar login');
  }
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});