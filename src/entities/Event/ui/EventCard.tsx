// src/entities/Event/ui/EventCard.tsx
import { Link } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { formatDateShort } from '@shared/lib/utils';
import type { Event, EventCategory } from '@shared/types';
import styles from './EventCard.module.scss';

interface EventCardProps {
  event: Event;
}

const CATEGORY_COLORS: Record<EventCategory, string> = {
  Культура:     '#9b59b6',
  Наука:        '#3498db',
  Спорт:        '#e67e22',
  IT:           '#2ecc71',
  Волонтёрство: '#e74c3c',
  Образование:  '#1abc9c',
};

export function EventCard({ event }: EventCardProps) {
  const color = CATEGORY_COLORS[event.category] ?? '#4b6cf7';

  return (
    <article className={styles.card}>
      <Link to={`/events/${event.id}`} className={styles.imageWrap} aria-label={event.title}>
        <Img src={event.imageUrl} alt="" className={styles.image} loading="lazy" />
        <div className={styles.overlay} aria-hidden="true" />
        <time dateTime={event.date} className={styles.dateBadge}>
          {formatDateShort(event.date).toUpperCase()}
        </time>
        <span className={styles.categoryLabel} style={{ color }} aria-hidden="true">
          {event.category}
        </span>
      </Link>

      <div className={styles.body}>
        <span className={styles.location}>{event.location}</span>
        <h3 className={styles.title}>
          <Link to={`/events/${event.id}`} className={styles.titleLink}>
            {event.title}
          </Link>
        </h3>
        <p className={styles.desc}>{event.description}</p>
        <Link to={`/events/${event.id}`} className={styles.btn}>
          Узнать больше →
        </Link>
      </div>
    </article>
  );
}