// src/features/EventsGrid/ui/EventsGrid.tsx
import { EventCard } from '@entities/Event/ui/EventCard';
import type { Event } from '@shared/types';
import styles from './EventsGrid.module.scss';

interface EventsGridProps {
  events: Event[];
  columns?: 2 | 3;
}

export function EventsGrid({ events, columns = 3 }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <p className={styles.empty}>Мероприятия не найдены</p>
    );
  }

  return (
    <ul
      className={styles.grid}
      data-columns={columns}
      aria-label="Список мероприятий"
    >
      {events.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}