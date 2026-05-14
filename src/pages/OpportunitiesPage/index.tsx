// src/pages/OpportunitiesPage/index.tsx
import { useState } from 'react';
import type { AccordionSection } from '@shared/types';
import styles from './OpportunitiesPage.module.scss';

const SECTIONS: AccordionSection[] = [
  {
    id: 'forums',
    title: 'Форумы',
    description:
      'Всероссийские и региональные молодёжные форумы. Площадки для общения, обучения и защиты грантов.',
    items: [
      'Таврида.АРТ',
      'Территория смыслов',
      'Машук',
      'iВолга',
      'Областной молодёжный форум «Тамбовщина»',
    ],
  },
  {
    id: 'grants',
    title: 'Гранты',
    description:
      'Финансовая поддержка твоих инициатив. От идеи до реализации проекта.',
    items: [
      'Росмолодёжь.Гранты',
      'Фонд президентских грантов',
      'Региональные конкурсы НКО',
      'Президентский фонд культурных инициатив',
    ],
  },
  {
    id: 'edu',
    title: 'Образовательный центр',
    description:
      'Курсы повышения квалификации, мастер-классы и образовательные программы для молодёжи.',
    items: [
      'Школа проектного управления',
      'Медиа-школа',
      'Волонтёрские курсы',
      'Лидерская программа',
    ],
  },
];

export function OpportunitiesPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    forums: true,
    grants: true,
    edu: true,
  });

  const toggle = (id: string) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Твои <span className={styles.accent}>пути</span>
          </h1>
          <p className={styles.subtitle}>
            Мы собрали все самое важное для твоего роста в одном месте.
            <br />
            Выбери направление и начни действовать.
          </p>
        </header>

        <ul className={styles.sections} aria-label="Разделы возможностей">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <article className={styles.section} aria-labelledby={`sec-${section.id}`}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 id={`sec-${section.id}`} className={styles.sectionTitle}>
                      {section.title}
                    </h2>
                    {open[section.id] && (
                      <p className={styles.sectionDesc}>{section.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={open[section.id]}
                    aria-controls={`items-${section.id}`}
                    onClick={() => toggle(section.id)}
                    aria-label={open[section.id] ? 'Свернуть' : 'Развернуть'}
                  >
                    <ChevronIcon up={open[section.id]} />
                  </button>
                </div>

                {open[section.id] && (
                  <ul
                    id={`items-${section.id}`}
                    className={styles.itemGrid}
                    aria-label={section.title}
                  >
                    {section.items.map((item) => (
                      <li key={item}>
                        <button type="button" className={styles.item}>
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: up ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}