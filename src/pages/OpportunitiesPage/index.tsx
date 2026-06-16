// src/pages/OpportunitiesPage/index.tsx
import { useState } from 'react';
import styles from './OpportunitiesPage.module.scss';

// ── Data ──────────────────────────────────────────────────────────────────────

type ForumLevel = 'regional' | 'district' | 'federal';

interface ForumItem {
  name: string;
  href?: string;
  image?: string;
}

const R = '/images/Фотографии на сайт/Раздел возможности/Форумы/Региональные/';
const D = '/images/Фотографии на сайт/Раздел возможности/Форумы/Окружные/';
const F = '/images/Фотографии на сайт/Раздел возможности/Форумы/Всероссийские/';

const FORUMS: Record<ForumLevel, ForumItem[]> = {
  regional: [
    { name: 'Семейный форум «#ПРОЛЮБОВЬ»',                  href: 'https://univermol68.ru/about-love',          image: R + 'форум ПроЛюбовь.jpg' },
    { name: 'Тамбовский молодёжный форум «Дружба народов»', href: 'https://univermol68.ru/friendship-of-nations', image: R + 'Дружба народов.jpg' },
    { name: 'Молодёжный Добро.Слёт',                        href: 'https://дмто.рф/dobro-slet',                  image: R + 'Молодёжный Добро.Слёт.jpg' },
  ],
  district: [
    { name: 'Ладога',               image: D + 'Ладога.png',               href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'УТРО',                  image: D + 'Утро.png',                  href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Студенческий спецназ', image: D + 'Студенческий спецназ.png', href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Шерегеш',              image: D + 'Шерегеш.png',              href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Волга',                 image: D + 'Волга.png',                 href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Каспий',               image: D + 'Каспий.png',               href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'На волне',              image: D + 'На волне.png',              href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'iВолга',               image: D + 'иВолга.png',               href: 'https://ivolga.org' },
  ],
  federal: [
    { name: 'Истоки',                              image: F + 'Истоки.png',                          href: 'https://istokiforum.ru' },
    { name: 'Истоки.Школа',                        image: F + 'Истоки.школа.png',                    href: 'https://istokiforum.ru' },
    { name: 'Таврида.АРТ',                         image: F + 'Таврида.АРТ.png',                     href: 'https://tavrida.art' },
    { name: 'Юг.Молодой',                                                                             href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'ШУМ',                                 image: F + 'Шум.png',                             href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'ТИМ «Бирюса»',                        image: F + 'ТИМ «Бирюса».png',                    href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Экосистема. Заповедный край',                                                            href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Добрино',                             image: F + 'Добино.png',                          href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Фестиваль «Больше, чем путешествие»',                                                   href: 'https://bolshechem.ru' },
    { name: 'ОстроVа',                             image: F + 'ОстроVа.png',                         href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Арктика. Лёд тронулся',               image: F + 'Арктика. Лёд тронулся.png',           href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'ГосСтарт',                            image: F + 'ГосСтарт.png',                        href: 'https://gosstart.ru' },
    { name: 'Форум рабочей молодёжи',              image: F + 'Форум рабочей молодёжи.png',          href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Ростов',                              image: F + 'Ростов.png',                          href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Полюс',                               image: F + 'Полюс.png',                           href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Территория БезОпасности',             image: F + 'Территория БезОпасности (2).png',     href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Российский север',                    image: F + 'Российский север.png',                href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Время молодых',                       image: D + 'Время молодых.png',                   href: 'https://events.myrosmol.ru/forumy/' },
    { name: 'Дигория',                             image: F + 'Дигория-1.png',                       href: 'https://digoriya.ru' },
  ],
};

const FORUM_LEVEL_LABELS: Record<ForumLevel, string> = {
  regional: 'Региональные',
  district: 'Окружные',
  federal: 'Всероссийские',
};

interface GrantItem {
  name: string;
  href?: string;
}

interface GrantGroup {
  label: string;
  items: GrantItem[];
}

const GRANTS: Record<'individuals' | 'entities', GrantGroup[]> = {
  individuals: [
    {
      label: 'Региональные',
      items: [
        { name: 'Конкурс молодёжных проектов Тамбовской области' },
      ],
    },
    {
      label: 'Всероссийские',
      items: [
        { name: 'Росмолодёжь.Гранты 1 и 2 сезоны',      href: 'https://fadm.gov.ru/directions/grant/' },
        { name: 'Росмолодёжь.Гранты: «Микрогранты»',     href: 'https://fadm.gov.ru/directions/grant/' },
        { name: 'Росмолодёжь.Гранты «Двигай сообщества»',href: 'https://fadm.gov.ru/directions/grant/' },
        { name: 'Грантовый конкурс Движения Первых',      href: 'https://будьвдвижении.рф/grants/' },
        { name: 'Фонд Президентских грантов',             href: 'https://президентскиегранты.рф' },
      ],
    },
  ],
  entities: [
    {
      label: 'Региональные',
      items: [
        { name: 'Конкурс молодёжных проектов Тамбовской области' },
      ],
    },
    {
      label: 'Всероссийские',
      items: [
        { name: 'Росмолодёжь.Гранты 1 и 2 сезоны',          href: 'https://fadm.gov.ru/directions/grant/' },
        { name: 'Росмолодёжь.Гранты среди НКО',              href: 'https://fadm.gov.ru/directions/grant/' },
        { name: 'Грантовый конкурс Движения Первых',          href: 'https://будьвдвижении.рф/grants/' },
        { name: 'Конкурс Фонда Президентских грантов для НКО',href: 'https://президентскиегранты.рф' },
      ],
    },
  ],
};

interface EduProgram {
  name: string;
  org: string;
  orgHref: string;
  href: string;
}

const EDU_PROGRAMS: EduProgram[] = [
  {
    name:    'Высшая школа молодёжных проектов',
    org:     'Университет молодёжи',
    orgHref: 'https://univermol68.ru',
    href:    'https://univermol68.ru/higher-school-of-youth-projects',
  },
  {
    name:    'Образовательная программа «Лига Молодых Лидеров»',
    org:     'Университет молодёжи',
    orgHref: 'https://univermol68.ru',
    href:    'https://univermol68.ru/lmlprogram',
  },
  {
    name:    'Форум молодёжных сообществ «Учись у лучших»',
    org:     'Университет молодёжи',
    orgHref: 'https://univermol68.ru',
    href:    'https://univermol68.ru/forum-gmp',
  },
  {
    name:    'Академия «Меганом»',
    org:     'Таврида.АРТ',
    orgHref: 'https://tavrida.art',
    href:    'https://tavrida.art/academy',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function OpportunitiesPage() {
  const [forumLevel, setForumLevel] = useState<ForumLevel>('regional');
  const [grantTarget, setGrantTarget] = useState<'individuals' | 'entities'>('individuals');

  const visibleForums = FORUMS[forumLevel];
  const visibleGrants = GRANTS[grantTarget];

  return (
    <main className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>
            Твои <span className={styles.accent}>возможности</span>
          </h1>
          <p className={styles.subtitle}>
            Форумы, гранты и образовательные программы для твоего роста — всё в одном месте.
          </p>
        </div>
      </header>

      <div className={styles.sections}>
        {/* ── Форумы ───────────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="forums-heading">
          <div className={styles.sectionTop}>
            <div className={styles.sectionMeta}>
              <span className={styles.sectionIcon} aria-hidden="true"><ForumIcon /></span>
              <div>
                <h2 id="forums-heading" className={styles.sectionTitle}>Форумы</h2>
                <p className={styles.sectionDesc}>
                  Региональные, окружные и всероссийские площадки для общения, обучения и защиты грантов.
                </p>
              </div>
            </div>
            <a
              href="https://events.myrosmol.ru/forumy/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyBtn}
            >
              Подать заявку →
            </a>
          </div>

          <div className={styles.levelTabs} role="group" aria-label="Уровень форума">
            {(Object.keys(FORUMS) as ForumLevel[]).map((level) => (
              <button
                key={level}
                type="button"
                className={styles.levelTab}
                data-active={forumLevel === level}
                onClick={() => setForumLevel(level)}
                aria-pressed={forumLevel === level}
              >
                {FORUM_LEVEL_LABELS[level]}
                <span className={styles.levelCount}>{FORUMS[level].length}</span>
              </button>
            ))}
          </div>

          <ul className={styles.forumGrid} aria-label={`${FORUM_LEVEL_LABELS[forumLevel]} форумы`}>
            {visibleForums.map((forum) => (
              <li key={forum.name}>
                {forum.href ? (
                  <a
                    href={forum.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.forumCard}
                    data-linked="true"
                  >
                    {forum.image && (
                      <img
                        src={forum.image}
                        alt=""
                        className={styles.forumThumb}
                        loading="lazy"
                      />
                    )}
                    <span className={styles.forumName}>{forum.name}</span>
                    <ExternalIcon />
                  </a>
                ) : (
                  <div className={styles.forumCard}>
                    {forum.image && (
                      <img
                        src={forum.image}
                        alt=""
                        className={styles.forumThumb}
                        loading="lazy"
                      />
                    )}
                    <span className={styles.forumName}>{forum.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Гранты ───────────────────────────────────────────── */}
        <section className={styles.section} aria-labelledby="grants-heading">
          <div className={styles.sectionTop}>
            <div className={styles.sectionMeta}>
              <span className={styles.sectionIcon} aria-hidden="true"><GrantIcon /></span>
              <div>
                <h2 id="grants-heading" className={styles.sectionTitle}>Гранты</h2>
                <p className={styles.sectionDesc}>
                  Финансовая поддержка твоих инициатив — от идеи до реализации проекта.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.levelTabs} role="group" aria-label="Тип получателя гранта">
            <button
              type="button"
              className={styles.levelTab}
              data-active={grantTarget === 'individuals'}
              onClick={() => setGrantTarget('individuals')}
              aria-pressed={grantTarget === 'individuals'}
            >
              Физическим лицам
            </button>
            <button
              type="button"
              className={styles.levelTab}
              data-active={grantTarget === 'entities'}
              onClick={() => setGrantTarget('entities')}
              aria-pressed={grantTarget === 'entities'}
            >
              Юридическим лицам
            </button>
          </div>

          <div className={styles.grantGroups}>
            {visibleGrants.map((group) => (
              <div key={group.label} className={styles.grantGroup}>
                <h3 className={styles.grantGroupLabel}>{group.label}</h3>
                <ul className={styles.grantList}>
                  {group.items.map((item) => (
                    <li key={item.name}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.grantItem}
                          data-linked="true"
                        >
                          <span className={styles.grantDot} aria-hidden="true" />
                          <span>{item.name}</span>
                          <ExternalIcon />
                        </a>
                      ) : (
                        <div className={styles.grantItem}>
                          <span className={styles.grantDot} aria-hidden="true" />
                          <span>{item.name}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Образовательные центры ───────────────────────────── */}
        <section className={styles.section} aria-labelledby="edu-heading">
          <div className={styles.sectionTop}>
            <div className={styles.sectionMeta}>
              <span className={styles.sectionIcon} aria-hidden="true"><EduIcon /></span>
              <div>
                <h2 id="edu-heading" className={styles.sectionTitle}>Образовательные центры</h2>
                <p className={styles.sectionDesc}>
                  Программы для прокачки лидерских навыков, проектного мышления и профессионального роста.
                </p>
              </div>
            </div>
          </div>

          <ul className={styles.eduGrid} aria-label="Образовательные программы">
            {EDU_PROGRAMS.map((prog) => (
              <li key={prog.name}>
                <a
                  href={prog.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.eduCard}
                >
                  <div className={styles.eduBody}>
                    <a
                      href={prog.orgHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.eduOrg}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {prog.org}
                    </a>
                    <p className={styles.eduName}>{prog.name}</p>
                  </div>
                  <span className={styles.eduArrow} aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function ForumIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function GrantIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function EduIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ flexShrink: 0, opacity: 0.5 }}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}