// src/shared/types/index.ts

export interface NavItem {
  label: string;
  path: string;
}

export type EventCategory = 'Культура' | 'Спорт' | 'Наука' | 'Волонтёрство' | 'IT' | 'Образование';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: EventCategory;
  imageUrl: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface SupportProgram {
  id: string;
  title: string;
  category: SupportCategory;
  audience: string;
  deadline: string | null;
  description: string;
  imageUrl: string;
}

export type SupportCategory = 'Гранты' | 'Стипендии' | 'Жильё' | 'Трудоустройство' | 'Обучение';

export interface AccordionSection {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface ContactBlock {
  id: string;
  org: string;
  entries: ContactEntry[];
}

export interface ContactEntry {
  label: string;
  phone: string;
  address?: string;
  email?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  photoCount: number;
  coverUrl: string;
  yandexDiskUrl?: string | null;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string | null;
}

export interface GalleryAlbumDetail extends GalleryAlbum {
  photos: Photo[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

export interface PaginationMeta {
  total: number;
  offset: number;
  limit: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiItem<T> {
  data: T;
}