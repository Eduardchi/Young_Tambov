// src/pages/EventDetailPage/index.tsx
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { eventsApi } from '@shared/api/events.api';
import { useFetch } from '@shared/hooks/useFetch';
import { formatDate } from '@shared/lib/utils';
import type { EventCategory } from '@shared/types';
import styles from './EventDetailPage.module.scss';

const CATEGORY_COLORS: Record<EventCategory, string> = {
  Культура:     '#9b59b6',
  Наука:        '#3498db',
  Спорт:        '#e67e22',
  IT:           '#2ecc71',
  Волонтёрство: '#e74c3c',
  Образование:  '#1abc9c',
};

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    () => eventsApi.getById(id!),
    [id],
  );
  const event = data?.data;

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.status}>Загрузка...</p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.status}>Мероприятие не найдено</p>
          <Link to="/events" className={styles.back}>← Все мероприятия</Link>
        </div>
      </main>
    );
  }

  const categoryColor = CATEGORY_COLORS[event.category] ?? '#4b6cf7';

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <Img src={event.imageUrl} alt="" className={styles.heroImg} />
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
          <span className={styles.category} style={{ color: categoryColor }}>
            {event.category}
          </span>
          <div className={styles.heroMeta}>
            <time dateTime={event.date} className={styles.date}>
              <CalendarIcon />
              {formatDate(event.date)}
            </time>
            <span className={styles.location}>
              <PinIcon />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <h1 className={styles.title}>{event.title}</h1>
        <p className={styles.body}>{event.description}</p>

        <div className={styles.actions}>
          <a
            href="https://events.myrosmol.ru"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.registerBtn}
          >
            Зарегистрироваться →
          </a>
          <Link to="/events" className={styles.back}>← Все мероприятия</Link>
        </div>
      </div>
    </main>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}