import axios from 'axios';
import type { AxiosInstance } from 'axios';

// 创建axios实例
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'api',
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return instance;
}

export const axiosInstance = createAxiosInstance();