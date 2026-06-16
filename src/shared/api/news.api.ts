// src/shared/api/news.api.ts
import { apiClient } from './client';
import type { ApiItem, NewsItem, Paginated } from '@shared/types';

export const newsApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<Paginated<NewsItem>>('/news', { params }),
  getById: (id: string) => apiClient.get<ApiItem<NewsItem>>(`/news/${id}`),
};