// src/entities/GalleryAlbum/ui/AlbumCard.tsx
import { Link } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { formatDateShort } from '@shared/lib/utils';
import type { GalleryAlbum } from '@shared/types';
import styles from './AlbumCard.module.scss';

interface AlbumCardProps {
  album: GalleryAlbum;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const inner = (
    <>
      <Img src={album.coverUrl} alt="" className={styles.image} loading="lazy" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <time dateTime={album.date} className={styles.date}>
          {formatDateShort(album.date).toUpperCase()}
        </time>
        <h3 className={styles.title}>{album.title}</h3>
        {album.yandexDiskUrl ? (
          <span className={styles.diskLabel}>
            <ExternalIcon />
            Яндекс.Диск
          </span>
        ) : (
          <span className={styles.count} aria-label={`${album.photoCount} фотографий`}>
            <PhotoIcon />
            {album.photoCount}
          </span>
        )}
      </div>
    </>
  );

  if (album.yandexDiskUrl) {
    return (
      <article className={styles.card}>
        <a
          href={album.yandexDiskUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={album.title}
        >
          {inner}
        </a>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <Link to={`/gallery/${album.id}`} className={styles.link} aria-label={album.title}>
        {inner}
      </Link>
    </article>
  );
}

function PhotoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ marginLeft: '0.25rem', opacity: 0.6 }}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}