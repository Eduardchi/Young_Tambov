// src/pages/SupportPage/index.tsx
import { useState } from 'react';
import { Img } from '@shared/ui/Img/Img';
import { SupportCard } from '@entities/SupportProgram/ui/SupportCard';
import { supportApi } from '@shared/api/support.api';
import { useFetch } from '@shared/hooks/useFetch';
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue';
import type { SupportCategory, SupportProgram } from '@shared/types';
import styles from './SupportPage.module.scss';

// ── Constants ─────────────────────────────────────────────────────────────────

const ALL = 'Все' as const;

type AgeKey = '14–18' | '18–22' | '23–35' | typeof ALL;

interface AgeGroup {
  key: AgeKey;
  range: string;
  label: string;
  sub: string;
}

const AGE_GROUPS: AgeGroup[] = [
  { key: ALL,    range: '',       label: 'Все',              sub: 'Все программы' },
  { key: '14–18', range: '14–18', label: 'Школьники',        sub: '14–18 лет' },
  { key: '18–22', range: '18–22', label: 'Студенты',         sub: '18–22 лет' },
  { key: '23–35', range: '23–35', label: 'Молодые взрослые', sub: '23–35 лет' },
];

const CATEGORIES: (SupportCategory | typeof ALL)[] = [
  ALL, 'Гранты', 'Стипендии', 'Жильё', 'Трудоустройство', 'Обучение',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function matchesAge(program: SupportProgram, ageKey: AgeKey): boolean {
  if (ageKey === ALL) return true;
  return program.audience.startsWith(ageKey);
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SupportPage() {
  const [ageGroup, setAgeGroup]   = useState<AgeKey>(ALL);
  const [active, setActive]       = useState<SupportCategory | typeof ALL>(ALL);
  const [search, setSearch]       = useState('');
  const debouncedSearch           = useDebouncedValue(search);

  const { data, loading, error } = useFetch(() => {
    const params: Record<string, string> = { limit: '100' };
    if (active !== ALL) params.category = active;
    if (debouncedSearch.trim().length >= 2) params.search = debouncedSearch.trim();
    return supportApi.getAll(params);
  }, [active, debouncedSearch]);

  const allPrograms = data?.data ?? [];
  const filtered    = allPrograms.filter((p) => matchesAge(p, ageGroup));

  const countFor = (key: AgeKey) =>
    key === ALL ? allPrograms.length : allPrograms.filter((p) => matchesAge(p, key)).length;

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="support-heading">
        <div className={styles.heroPhoto}>
          <Img src="/images/Фотографии на сайт/Раздел меры поддержки/Молодые семьи.jpg" alt="" className={styles.heroImg} />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
        <div className={styles.heroDark}>
          <h1 id="support-heading" className={styles.heroTitle}>
            Меры<br /><span className={styles.heroBlue}>поддержки</span>
          </h1>
          <p className={styles.heroSub}>Возможности для твоего развития</p>
        </div>
      </section>

      {/* Age group selector */}
      <div className={styles.ageBar}>
        <div className={styles.ageBarInner}>
          <p className={styles.ageBarLabel}>Выберите возрастную группу</p>
          <div
            className={styles.ageCards}
            role="group"
            aria-label="Фильтр по возрасту"
          >
            {AGE_GROUPS.map((group) => (
              <button
                key={group.key}
                type="button"
                className={styles.ageCard}
                data-active={ageGroup === group.key}
                onClick={() => setAgeGroup(group.key)}
                aria-pressed={ageGroup === group.key}
              >
                <span className={styles.ageRange}>
                  {group.range || '∞'}
                </span>
                <span className={styles.ageLabel}>{group.label}</span>
                <span className={styles.ageSub}>{group.sub}</span>
                {!loading && (
                  <span className={styles.ageCount}>{countFor(group.key)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category + search filter */}
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
          {loading && <p className={styles.empty}>Загрузка...</p>}
          {error && <p className={styles.empty}>Не удалось загрузить программы поддержки</p>}
          {!loading && !error && (
            filtered.length > 0 ? (
              <ul className={styles.list} aria-label="Программы поддержки">
                {filtered.map((program) => (
                  <li key={program.id}>
                    <SupportCard program={program} />
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