// src/pages/GalleryAlbumPage/index.tsx
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { galleryApi } from '@shared/api/gallery.api';
import { useFetch } from '@shared/hooks/useFetch';
import { formatDate } from '@shared/lib/utils';
import styles from './GalleryAlbumPage.module.scss';

export function GalleryAlbumPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    () => galleryApi.getById(id!),
    [id],
  );
  const album = data?.data;

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.status}>Загрузка...</p>
        </div>
      </main>
    );
  }

  if (error || !album) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.status}>Альбом не найден</p>
          <Link to="/gallery" className={styles.back}>← Все альбомы</Link>
        </div>
      </main>
    );
  }

  // Album has external Yandex Disk link — redirect there
  if (album.yandexDiskUrl) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <button
            type="button"
            className={styles.backLinkBtn}
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>
          <div className={styles.externalCard}>
            <div className={styles.externalCover}>
              <Img src={album.coverUrl} alt="" className={styles.externalImg} />
              <div className={styles.externalOverlay} aria-hidden="true" />
            </div>
            <div className={styles.externalBody}>
              <time dateTime={album.date} className={styles.date}>
                {formatDate(album.date)}
              </time>
              <h1 className={styles.title}>{album.title}</h1>
              <p className={styles.externalNote}>
                Фотографии этого альбома хранятся на Яндекс.Диске
              </p>
              <a
                href={album.yandexDiskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.diskBtn}
              >
                Открыть на Яндекс.Диске →
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const photos = album.photos ?? [];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>
          <time dateTime={album.date} className={styles.date}>
            {formatDate(album.date)}
          </time>
          <h1 className={styles.title}>{album.title}</h1>
          {photos.length > 0 && (
            <p className={styles.count}>{photos.length} фотографий</p>
          )}
        </div>
      </header>

      <div className={styles.inner}>
        {photos.length === 0 ? (
          <p className={styles.status}>В этом альбоме пока нет фотографий</p>
        ) : (
          <ul className={styles.grid} aria-label="Фотографии альбома">
            {photos.map((photo) => (
              <li key={photo.id} className={styles.photoItem}>
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.photoLink}
                >
                  <Img src={photo.url} alt={photo.caption ?? ''} className={styles.photo} loading="lazy" />
                  {photo.caption && (
                    <span className={styles.caption}>{photo.caption}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
        <Link to="/gallery" className={styles.back}>← Все альбомы</Link>
      </div>
    </main>
  );
}