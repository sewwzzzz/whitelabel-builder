import { request } from './Request';
import { filesService } from '@/services/FilesService';

// API 管理器，统一导出所有服务
export const api = {
  // 基础请求方法
  request,

  // 业务服务
  files: filesService,

  // 工具方法
  cancelRequest: (message?: string) => {
    // 可以在这里实现请求取消逻辑
    console.warn('取消请求:', message);
  },

  // 设置全局配置
  setBaseURL: (baseURL: string) => {
    // 动态修改 baseURL
  },

  // 设置认证 token
  setAuthToken: (token: string) => {
    localStorage.setItem('token', token);
  },

  // 清除认证信息
  clearAuth: () => {
    localStorage.removeItem('token');
  },
};

export default api;