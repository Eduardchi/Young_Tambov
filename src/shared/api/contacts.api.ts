// src/shared/api/contacts.api.ts
import { apiClient } from './client';
import type { ContactFormData } from '@shared/types';

export const contactsApi = {
  send: (data: ContactFormData) => apiClient.post<{ success: boolean }>('/contacts', data),
};