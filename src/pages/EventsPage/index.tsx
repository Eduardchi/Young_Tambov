// src/pages/EventsPage/index.tsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { EventCard } from '@entities/Event/ui/EventCard';
import { eventsApi } from '@shared/api/events.api';
import { useFetch } from '@shared/hooks/useFetch';
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue';
import { CITY_TAGS } from '@shared/lib/constants';
import type { EventCategory } from '@shared/types';
import styles from './EventsPage.module.scss';

const ALL = 'Все';
const ALL_CITY = 'Все города';

interface CategoryFilter {
  value: EventCategory | typeof ALL;
  label: string;
}

const CATEGORIES: CategoryFilter[] = [
  { value: ALL,            label: 'Все' },
  { value: 'Культура',     label: 'Творчество и культура' },
  { value: 'Спорт',        label: 'Спорт' },
  { value: 'Волонтёрство', label: 'Добровольчество' },
  { value: 'Образование',  label: 'Образование' },
  { value: 'Наука',        label: 'Наука' },
  { value: 'IT',           label: 'IT' },
];

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityParam = searchParams.get('city') ?? '';

  const [activeCategory, setActiveCategory] = useState<EventCategory | typeof ALL>(ALL);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);

  const { data, loading, error } = useFetch(() => {
    const params: Record<string, string> = { limit: '100' };
    if (cityParam) params.city = cityParam;
    if (activeCategory !== ALL) params.category = activeCategory;
    if (debouncedSearch.trim().length >= 2) params.search = debouncedSearch.trim();
    return eventsApi.getAll(params);
  }, [cityParam, activeCategory, debouncedSearch]);

  const filtered = data?.data ?? [];

  function selectCity(city: string) {
    if (city === ALL_CITY || city === cityParam) {
      setSearchParams({});
    } else {
      setSearchParams({ city });
    }
  }

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="events-heading">
        <div className={styles.heroPhoto}>
          <Img
            src="/images/Фотографии на сайт/Раздел Мероприятия региона/Заглавное фото на странице.jpg"
            alt=""
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
        <div className={styles.heroDark}>
          <h1 id="events-heading" className={styles.heroTitle}>
            Мероприятия<br /><span className={styles.heroBlue}>региона</span>
          </h1>
          <p className={styles.heroSub}>молодёжные события тамбовской области</p>
        </div>
      </section>

      {/* Filters */}
      <div className={styles.filterBar} role="search">
        <div className={styles.filterBarInner}>
          {/* Search */}
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

          {/* City filter */}
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Город:</span>
            <div className={styles.filterTabs} role="group" aria-label="Фильтр по городу">
              <button
                type="button"
                className={styles.filterTab}
                data-active={!cityParam}
                onClick={() => selectCity(ALL_CITY)}
                aria-pressed={!cityParam}
              >
                {ALL_CITY}
              </button>
              {CITY_TAGS.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={styles.filterTab}
                  data-active={cityParam === city}
                  onClick={() => selectCity(city)}
                  aria-pressed={cityParam === city}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Категория:</span>
            <div className={styles.filterTabs} role="group" aria-label="Фильтр по категории">
              {CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={styles.filterTab}
                  data-active={activeCategory === value}
                  onClick={() => setActiveCategory(value)}
                  aria-pressed={activeCategory === value}
                >
                  {label}
                </button>
              ))}
            </div>
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
            <span className={styles.resultsCount}>{data?.meta.total ?? 0}</span>
          </div>

          {loading && <p className={styles.empty}>Загрузка...</p>}
          {error && <p className={styles.empty}>Не удалось загрузить мероприятия</p>}
          {!loading && !error && (
            filtered.length > 0 ? (
              <ul className={styles.grid} aria-label="Мероприятия">
                {filtered.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>По вашему запросу ничего не найдено</p>
            )
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
