// Api请求基础类型
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

interface PageParams {
  page?: number;
  size?: number;
  sort?: string;
}

interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}

// 请求配置类型
interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
}

// 错误处理类型
interface ApiError extends Error {
  code?: number;
  status?: number;
  config?: RequestConfig;
  response?: any;
}

export type {
  ApiError,
  ApiResponse,
  PageResponse,
  PageParams,
  RequestConfig
}