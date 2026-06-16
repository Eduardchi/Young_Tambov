// src/shared/api/support.api.ts
import { apiClient } from './client';
import type { ApiItem, Paginated, SupportProgram } from '@shared/types';

export const supportApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<Paginated<SupportProgram>>('/support', { params }),
  getById: (id: string) => apiClient.get<ApiItem<SupportProgram>>(`/support/${id}`),
};