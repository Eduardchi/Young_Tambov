// src/pages/OrganizationPage/index.tsx
import { Img } from '@shared/ui/Img/Img';
import styles from './OrganizationPage.module.scss';

const DIRECTIONS = [
  'Все направления',
  'Волонтёрство',
  'Культура и искусство',
  'Спорт',
  'IT и технологии',
  'Образование',
  'Предпринимательство',
];

const STATS = [
  { value: '100+', label: 'подопечных' },
  { value: '24', label: 'волонтёра' },
  { value: '200+', label: 'мероприятий в год' },
];

const PHOTOS = [
  { url: '/images/org-1.svg', alt: 'Участники молодёжной организации' },
  { url: '/images/org-2.svg', alt: 'Мероприятие организации' },
  { url: '/images/org-3.svg', alt: 'Волонтёры в деле' },
  { url: '/images/org-4.svg', alt: 'Команда Тамбов Молодой' },
];

export function OrganizationPage() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        {/* Left: text content */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Молодежная<br />
            <span className={styles.accent}>организация</span>
          </h1>
          <p className={styles.description}>
            Стань частью самого масштабного движения региона. Развивайся, твори и меняй мир вместе с нами.
          </p>

          <div className={styles.selectWrap}>
            <select className={styles.select} aria-label="Направления деятельности">
              {DIRECTIONS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <ChevronIcon />
          </div>

          <dl className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <dt className={styles.statValue}>{s.value}</dt>
                <dd className={styles.statLabel}>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: 2x2 photo grid */}
        <div className={styles.photoGrid} aria-hidden="true">
          {PHOTOS.map((p) => (
            <div key={p.url} className={styles.photoWrap}>
              <Img
                src={p.url}
                alt={p.alt}
                className={styles.photo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="chevron"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}