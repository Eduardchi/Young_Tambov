// src/pages/NewsDetailPage/index.tsx
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { newsApi } from '@shared/api/news.api';
import { useFetch } from '@shared/hooks/useFetch';
import { formatDate } from '@shared/lib/utils';
import styles from './NewsDetailPage.module.scss';

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    () => newsApi.getById(id!),
    [id],
  );
  const item = data?.data;

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.status}>Загрузка...</p>
        </div>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.status}>Новость не найдена</p>
          <Link to="/news" className={styles.back}>← Все новости</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <Img src={item.imageUrl} alt="" className={styles.heroImg} />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            aria-label="Назад"
          >
            ← Назад
          </button>
          <span className={styles.category}>{item.category}</span>
          <time dateTime={item.date} className={styles.date}>
            {formatDate(item.date)}
          </time>
        </div>
      </div>

      <div className={styles.inner}>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.body}>{item.description}</p>
        <Link to="/news" className={styles.back}>← Все новости</Link>
      </div>
    </main>
  );
}