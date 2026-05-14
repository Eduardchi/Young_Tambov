// src/shared/api/events.api.ts
import { apiClient } from './client';
import type { Event } from '@shared/types';

export const eventsApi = {
  getAll: () => apiClient.get<Event[]>('/events'),
  getById: (id: string) => apiClient.get<Event>(`/events/${id}`),
};