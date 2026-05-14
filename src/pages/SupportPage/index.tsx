// src/pages/SupportPage/index.tsx
import { useState } from 'react';
import { Img } from '@shared/ui/Img/Img';
import { SupportCard } from '@entities/SupportProgram/ui/SupportCard';
import { MOCK_SUPPORT } from '@entities/SupportProgram/model/mock';
import type { SupportCategory } from '@shared/types';
import styles from './SupportPage.module.scss';

const ALL = 'Все';
const CATEGORIES: (SupportCategory | typeof ALL)[] = [
  ALL, 'Гранты', 'Стипендии', 'Жильё', 'Трудоустройство', 'Обучение',
];

export function SupportPage() {
  const [active, setActive] = useState<SupportCategory | typeof ALL>(ALL);
  const [search, setSearch] = useState('');

  const filtered = MOCK_SUPPORT.filter((p) => {
    const matchCat = active === ALL || p.category === active;
    const matchSearch =
      search === '' || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="support-heading">
        <div className={styles.heroPhoto}>
          <Img
            src="/images/support-hero.svg"
            alt=""
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
        <div className={styles.heroDark}>
          <h1 id="support-heading" className={styles.heroTitle}>
            Меры<br /><span className={styles.heroBlue}>поддержки</span>
          </h1>
          <p className={styles.heroSub}>Возможности для твоего развития</p>
        </div>
      </section>

      {/* Filters */}
      <div className={styles.filterBar}>
        <div className={styles.filterBarInner}>
          <label htmlFor="support-search" className={styles.srOnly}>Поиск программ</label>
          <div className={styles.searchWrap}>
            <SearchIcon />
            <input
              id="support-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск программы по названию..."
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterTabs} role="group" aria-label="Фильтр по категории">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={styles.filterTab}
                data-active={active === cat}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          {filtered.length > 0 ? (
            <ul className={styles.list} aria-label="Программы поддержки">
              {filtered.map((program) => (
                <li key={program.id}>
                  <SupportCard program={program} />
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