import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useMessage } from "naive-ui";
import { axiosInstance } from "./axiosInstance";

export const setupRequestInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    // TODO 为什么类型不再是AxiosRequestConfig
    (config: InternalAxiosRequestConfig) => {
      // 添加认证token
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 添加时间戳防止缓存
      if (config.method?.toUpperCase() === 'GET' && config.params) {
        config.params._t = Date.now();
      }

      console.log(`发送请求:${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('请求拦截器错误', error);
      return Promise.reject(error);
    }
  )
}

// 响应拦截器
export const setupResponseInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`${response.config.url}`, response.data);
      return response;
    },
    (error) => {
      console.error('响应拦截器错误', error);
      const message = useMessage();
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 401:
            message.error('未授权，请重新登录');
            // 跳转到登录页
            break;
          case 403:
            message.error('禁止访问');
            break;
          case 404:
            message.error('请求的资源不存在');
            break;
          case 500:
            message.error('服务器内部错误');
            break;
          default:
            message.error(data?.message || '网络错误');
        }
      } else if (error.request) {
        // TODO why is symbol 
        message.error('网络连接失败，请检查网络');
      } else {
        // TODO why is symbol 
        message.error('请求配置错误');
      }
      return Promise.reject(error);
    }
  )
}

setupRequestInterceptors(axiosInstance);
setupResponseInterceptors(axiosInstance);