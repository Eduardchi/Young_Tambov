// src/pages/GalleryPage/index.tsx
import { AlbumCard } from '@entities/GalleryAlbum/ui/AlbumCard';
import { galleryApi } from '@shared/api/gallery.api';
import { useFetch } from '@shared/hooks/useFetch';
import styles from './GalleryPage.module.scss';

export function GalleryPage() {
  const { data, loading, error } = useFetch(() => galleryApi.getAll({ limit: '100' }), []);
  const albums = data?.data ?? [];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>
            Моменты <span className={styles.accent}>жизни</span>
          </h1>
          <p className={styles.subtitle}>
            История молодёжного движения региона в фотографиях.
          </p>
          {!loading && !error && albums.length > 0 && (
            <p className={styles.meta}>
              <span className={styles.metaNum}>{albums.length}</span> альбомов
            </p>
          )}
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          {loading && <p className={styles.empty}>Загрузка...</p>}
          {error && <p className={styles.empty}>Не удалось загрузить альбомы</p>}
          {!loading && !error && (
            albums.length > 0 ? (
              <ul className={styles.grid} aria-label="Фотоальбомы">
                {albums.map((album) => (
                  <li key={album.id}>
                    <AlbumCard album={album} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>Альбомы пока не добавлены</p>
            )
          )}
        </div>
      </div>
    </main>
  );
}