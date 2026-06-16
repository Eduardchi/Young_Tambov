// src/shared/api/gallery.api.ts
import { apiClient } from './client';
import type { ApiItem, GalleryAlbum, GalleryAlbumDetail, Paginated } from '@shared/types';

export const galleryApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get<Paginated<GalleryAlbum>>('/gallery', { params }),
  getById: (id: string) => apiClient.get<ApiItem<GalleryAlbumDetail>>(`/gallery/${id}`),
};