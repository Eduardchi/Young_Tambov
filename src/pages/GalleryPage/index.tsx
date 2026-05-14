// src/pages/GalleryPage/index.tsx
import { AlbumCard } from '@entities/GalleryAlbum/ui/AlbumCard';
import { MOCK_ALBUMS } from '@entities/GalleryAlbum/model/mock';
import styles from './GalleryPage.module.scss';

export function GalleryPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>Моменты</h1>
          <p className={styles.subtitle}>
            История молодёжной жизни региона в объективе наших фотографов.
          </p>
        </header>

        <section aria-label="Фотоальбомы">
          <ul className={styles.grid}>
            {MOCK_ALBUMS.map((album) => (
              <li key={album.id}>
                <AlbumCard album={album} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}