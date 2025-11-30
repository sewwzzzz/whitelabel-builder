import { request } from "@/utils/request/Request";
import type { ApiResponse, PageParams, PageResponse } from '@/types/api';

// 使用request类封装一些常用的请求接口
export abstract class BaseService<T = any> {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // 获取列表
  async getList(params?: any): Promise<ApiResponse<T[]>> {
    return request.get<T[]>(this.baseUrl, params);
  }

  // 分页获取列表
  async getPageList(params: PageParams & any): Promise<ApiResponse<PageResponse<T>>> {
    return request.get<PageResponse<T>>(`${this.baseUrl}/page`, params);
  }

  // 根据ID获取详情
  async getById(id: string | number): Promise<ApiResponse<T>> {
    return request.get<T>(`${this.baseUrl}/${id}`);
  }

  // 创建
  async create(data: Partial<T>): Promise<ApiResponse<T>> {
    return request.post<T>(this.baseUrl, data);
  }

  // 更新
  async update(id: string | number, data: Partial<T>): Promise<ApiResponse<T>> {
    return request.put<T>(`${this.baseUrl}/${id}`, data);
  }

  // 删除
  async delete(id: string | number): Promise<ApiResponse<void>> {
    return request.delete<void>(`${this.baseUrl}/${id}`);
  }

  // 批量删除
  async batchDelete(ids: (string | number)[]): Promise<ApiResponse<void>> {
    return request.post<void>(`${this.baseUrl}/batch-delete`, { ids });
  }
}