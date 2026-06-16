// src/pages/NewsPage/index.tsx
import { useState } from 'react';
import { NewsCard } from '@entities/News/ui/NewsCard';
import { newsApi } from '@shared/api/news.api';
import { useFetch } from '@shared/hooks/useFetch';
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue';
import styles from './NewsPage.module.scss';

const ALL = 'Все';
const CATEGORIES = [ALL, 'Патриотизм', 'Культура', 'Молодёжь', 'Волонтёрство', 'Гранты', 'Образование', 'Спорт'] as const;

export function NewsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const debouncedSearch = useDebouncedValue(search);

  const { data, loading, error } = useFetch(() => {
    const params: Record<string, string> = { limit: '100' };
    if (activeCategory !== ALL) params.category = activeCategory;
    if (debouncedSearch.trim().length >= 2) params.search = debouncedSearch.trim();
    return newsApi.getAll(params);
  }, [activeCategory, debouncedSearch]);

  const items = data?.data ?? [];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>
            Новости<br /><span className={styles.accent}>региона</span>
          </h1>
          <p className={styles.subtitle}>
            Актуальные события молодёжной жизни Тамбовской области
          </p>
        </div>
      </header>

      <div className={styles.filterBar}>
        <div className={styles.filterBarInner}>
          <label htmlFor="news-search" className={styles.srOnly}>Поиск новостей</label>
          <div className={styles.searchWrap}>
            <SearchIcon />
            <input
              id="news-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск новостей..."
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

      <section className={styles.content}>
        <div className={styles.contentInner}>
          {loading && <p className={styles.empty}>Загрузка...</p>}
          {error && <p className={styles.empty}>Не удалось загрузить новости</p>}
          {!loading && !error && (
            items.length > 0 ? (
              <ul className={styles.grid} aria-label="Новости">
                {items.map((item) => (
                  <li key={item.id} className={styles.gridItem}>
                    <NewsCard item={item} variant="grid" />
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