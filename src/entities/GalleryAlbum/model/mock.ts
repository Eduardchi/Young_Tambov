// src/entities/GalleryAlbum/model/mock.ts
import type { GalleryAlbum } from '@shared/types';

export const MOCK_ALBUMS: GalleryAlbum[] = [
  {
    id: '1',
    title: 'Областной фестиваль студенческого творчества',
    date: '2025-04-12',
    photoCount: 42,
    coverUrl: '/images/gallery-1.svg',
  },
  {
    id: '2',
    title: 'Научный пикник в агроуниверситете',
    date: '2025-04-12',
    photoCount: 34,
    coverUrl: '/images/gallery-2.svg',
  },
  {
    id: '3',
    title: 'Спортивный кросс для молодёжи',
    date: '2025-04-18',
    photoCount: 56,
    coverUrl: '/images/gallery-3.svg',
  },
  {
    id: '4',
    title: "IT-хакатон «Цифровой Тамбов»",
    date: '2025-05-03',
    photoCount: 129,
    coverUrl: '/images/gallery-4.svg',
  },
];