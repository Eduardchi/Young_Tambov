// src/pages/EventsPage/index.tsx
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { EventCard } from '@entities/Event/ui/EventCard';
import { MOCK_EVENTS } from '@entities/Event/model/mock';
import type { EventCategory } from '@shared/types';
import styles from './EventsPage.module.scss';

const ALL = 'Все';
const CATEGORIES: (EventCategory | typeof ALL)[] = [
  ALL, 'Культура', 'Спорт', 'Наука', 'IT', 'Волонтёрство', 'Образование',
];

export function EventsPage() {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get('city') ?? '';

  const [activeCategory, setActiveCategory] = useState<EventCategory | typeof ALL>(ALL);
  const [search, setSearch] = useState('');

  const filtered = MOCK_EVENTS.filter((e) => {
    const matchCity = cityParam === '' || e.location === cityParam;
    const matchCat = activeCategory === ALL || e.category === activeCategory;
    const matchSearch =
      search === '' ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchCat && matchSearch;
  });

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="events-heading">
        <div className={styles.heroPhoto}>
          <Img
            src="/images/events-hero.svg"
            alt=""
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
        <div className={styles.heroDark}>
          <h1 id="events-heading" className={styles.heroTitle}>
            Мероприятия<br /><span className={styles.heroBlue}>региона</span>
          </h1>
          {cityParam && (
            <p className={styles.heroSub}>
              Город: <strong>{cityParam}</strong>
            </p>
          )}
        </div>
      </section>

      {/* City filter breadcrumb */}
      {cityParam && (
        <div className={styles.cityBanner}>
          <div className={styles.cityBannerInner}>
            <span>
              Показаны мероприятия в городе <strong>{cityParam}</strong>
            </span>
            <Link to="/events" className={styles.cityBannerClear}>
              Все города ×
            </Link>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={styles.filterBar} role="search">
        <div className={styles.filterBarInner}>
          <label htmlFor="events-search" className="sr-only">Поиск мероприятий</label>
          <div className={styles.searchWrap}>
            <SearchIcon />
            <input
              id="events-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск мероприятий по названию..."
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterTabs} role="group" aria-label="Фильтр по категории">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={styles.filterTab}
                data-active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.resultsRow}>
            <p className={styles.resultsLabel}>
              Все события →{' '}
              <span className={styles.resultsAccent}>
                {cityParam || 'Вся область'}
              </span>
            </p>
            <span className={styles.resultsCount}>{filtered.length}</span>
          </div>

          {filtered.length > 0 ? (
            <ul className={styles.grid} aria-label="Мероприятия">
              {filtered.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>По вашему запросу ничего не найдено</p>
          )}
        </div>
      </section>
    </main>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
