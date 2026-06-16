// src/shared/api/events.api.ts
import { apiClient } from './client';
import type { ApiItem, Event, Paginated } from '@shared/types';

export const eventsApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<Paginated<Event>>('/events', { params }),
  getById: (id: string) => apiClient.get<ApiItem<Event>>(`/events/${id}`),
};