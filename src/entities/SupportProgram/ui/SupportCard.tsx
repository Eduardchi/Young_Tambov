// src/entities/SupportProgram/ui/SupportCard.tsx
import { Button } from '@shared/ui/Button/Button';
import { formatDate } from '@shared/lib/utils';
import type { SupportProgram, SupportCategory } from '@shared/types';
import styles from './SupportCard.module.scss';

interface SupportCardProps {
  program: SupportProgram;
}

const CATEGORY_COLORS: Record<SupportCategory, string> = {
  Гранты:          '#e8506a',
  Стипендии:       '#4b6cf7',
  Жильё:           '#3ecf8e',
  Трудоустройство: '#f5a623',
  Обучение:        '#9b59b6',
};

const CATEGORY_GRADIENT: Record<SupportCategory, [string, string]> = {
  Гранты:          ['#e8506a', '#b03050'],
  Стипендии:       ['#4b6cf7', '#2a45c0'],
  Жильё:           ['#3ecf8e', '#1da870'],
  Трудоустройство: ['#f5a623', '#c07d10'],
  Обучение:        ['#9b59b6', '#6d3585'],
};

function audienceLabel(raw: string): string {
  const pipe = raw.indexOf('|');
  return pipe !== -1 ? raw.slice(pipe + 1).trim() : raw;
}

export function SupportCard({ program }: SupportCardProps) {
  const color = CATEGORY_COLORS[program.category];
  const [gradFrom, gradTo] = CATEGORY_GRADIENT[program.category];

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <SupportPlaceholder
          category={program.category}
          gradFrom={gradFrom}
          gradTo={gradTo}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category} style={{ color }}>
            {program.category}
          </span>
          <span className={styles.deadline}>
            {program.deadline ? `до ${formatDate(program.deadline)}` : 'Прямо сейчас'}
          </span>
        </div>
        <h3 className={styles.title}>{program.title}</h3>
        <p className={styles.audience}>{audienceLabel(program.audience)}</p>
        <p className={styles.desc}>{program.description}</p>
        <Button as="a" href="#" variant="secondary" size="sm">
          Узнать подробнее
        </Button>
      </div>
    </article>
  );
}

// ── SVG Placeholder ───────────────────────────────────────────────────────────

interface PlaceholderProps {
  category: SupportCategory;
  gradFrom: string;
  gradTo: string;
}

function SupportPlaceholder({ category, gradFrom, gradTo }: PlaceholderProps) {
  const uid = `sp-${category.replace(/[^a-zа-я]/gi, '')}`;

  return (
    <svg
      className={styles.placeholderSvg}
      viewBox="0 0 220 280"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradFrom} />
          <stop offset="100%" stopColor={gradTo} />
        </linearGradient>
        <pattern id={`${uid}-dots`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="1.2" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>
      {/* Background */}
      <rect width="220" height="280" fill={`url(#${uid}-g)`} />
      <rect width="220" height="280" fill={`url(#${uid}-dots)`} />
      {/* Decorative circles */}
      <circle cx="0"   cy="280" r="150" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="50" />
      <circle cx="220" cy="0"   r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="36" />
      <circle cx="110" cy="90"  r="52"  fill="rgba(255,255,255,0.06)" />
      {/* Icon */}
      <g transform="translate(85, 65)">{CATEGORY_ICON[category]}</g>
      {/* Label */}
      <text
        x="110" y="205"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="3.5"
        fill="rgba(255,255,255,0.5)"
      >
        {category.toUpperCase()}
      </text>
      {/* Thin bottom line accent */}
      <rect x="80" y="215" width="60" height="1.5" rx="1" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

const CATEGORY_ICON: Record<SupportCategory, React.ReactNode> = {
  Гранты: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.92)"
      strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  Стипендии: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.92)"
      strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Жильё: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.92)"
      strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Трудоустройство: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.92)"
      strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  Обучение: (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.92)"
      strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
};
