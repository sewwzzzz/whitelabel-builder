import type { ApiError, ApiResponse, RequestConfig } from "@/types/api";
import { axiosInstance } from "./axiosInstance";
import type { AxiosResponse } from "axios";

export class Request {
  private instance: typeof axiosInstance;

  constructor(instance?: typeof axiosInstance) {
    this.instance = instance || axiosInstance;
  }

  // 基础请求方法
  private async request<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance({
        ...config
      })

      const { data } = response;

      // 业务逻辑错误处理
      if (!data.success) {
        throw this.createBusinessError(data.code, data.message, config);
      }

      // 走Promise.resolve
      return data;
    } catch (error) {
      // 捕获同步和Promise异步拒绝的错误，走Promise.reject
      throw this.normalizeError(error, config);
    }
  }

  // GET请求
  async get<T>(url: string, params?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config
    })
  }

  // POST请求
  async post<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config
    });
  }

  // PUT请求
  async put<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config
    });
  }

  // DELETE请求
  async delete<T>(url: string, params?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      params,
      ...config
    })
  }

  // 上传文件
  async upload<T>(url: string, formData: FormData, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    })
  }

  // 下载文件
  async download(url: string, params?: any, filename?: string): Promise<void> {
    const data = await this.request<ArrayBuffer>({
      url,
      method: "GET",
      params,
      responseType: 'blob'
    });

    // TODO 下载函数
    const blob = new Blob([data.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    link.click();
    window.URL.revokeObjectURL(downloadUrl);
  }

  // 业务逻辑（后端）错误
  private createBusinessError(code: number, message: string, config: RequestConfig): ApiError {
    const error: ApiError = new Error(message);
    error.code = code;
    error.config = config;
    return error;
  }

  // 标准错误，代码执行错误
  private normalizeError(error: any, config: RequestConfig): ApiError {
    let apiError: ApiError;
    if (error instanceof Error) {
      apiError = error;
    } else {
      apiError = new Error('未知错误');
    }
    // 标识错误的请求来源
    apiError.config = config;
    return apiError;
  }
}

export const request = new Request();