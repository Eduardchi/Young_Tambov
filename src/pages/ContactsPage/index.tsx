// src/pages/ContactsPage/index.tsx
import type { ContactBlock } from '@shared/types';
import styles from './ContactsPage.module.scss';

const CONTACT_BLOCKS: ContactBlock[] = [
  {
    id: 'dept',
    org: 'Департамент молодёжной политики',
    entries: [
      { label: 'Приёмная', phone: '+7 (4752) 79-22-22', address: 'г. Тамбов, ул. Советская, 108' },
      { label: 'Отдел программ', phone: '+7 (4752) 79-22-23', email: 'molod@region.ru' },
    ],
  },
  {
    id: 'center',
    org: 'Молодёжный центр',
    entries: [
      { label: 'Координатор', phone: '+7 (4752) 55-55-55', address: 'г. Тамбов, ул. Пензенская, 62' },
      { label: 'Пресс-служба', phone: '+7 (4752) 55-55-56', email: 'press@molcenter68.ru' },
    ],
  },
  {
    id: 'muni',
    org: 'Муниципалитеты',
    entries: [
      { label: 'Мичуринск', phone: '+7 (47545) 5-55-55', address: 'г. Мичуринск, ул. Филиппова, 45' },
      { label: 'Моршанск', phone: '+7 (47533) 4-44-44', address: 'г. Моршанск, ул. Октябрьская, 15' },
    ],
  },
  {
    id: 'edu',
    org: 'Образовательные организации',
    entries: [
      { label: 'ТГУ им. Державина', phone: '+7 (4752) 72-34-34', address: 'г. Тамбов, ул. Интернациональная, 33' },
      { label: 'ТГТУ', phone: '+7 (4752) 63-10-19', address: 'г. Тамбов, ул. Советская, 106' },
    ],
  },
];

export function ContactsPage() {
  return (
    <main className={styles.page}>
      {/* Hero title */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.subtitle}>
            Мы всегда на связи и готовы помочь тебе в реализации самых смелых идей.
          </p>
        </div>
      </header>

      {/* Contact blocks */}
      <section className={styles.blocks} aria-label="Контактная информация">
        <div className={styles.blocksInner}>
          <ul className={styles.grid}>
            {CONTACT_BLOCKS.map((block) => (
              <li key={block.id}>
                <article className={styles.card} aria-labelledby={`org-${block.id}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap} aria-hidden="true">
                      <PhoneBlockIcon />
                    </div>
                    <h2 id={`org-${block.id}`} className={styles.orgName}>
                      {block.org}
                    </h2>
                  </div>

                  <ul className={styles.entries}>
                    {block.entries.map((entry) => (
                      <li key={entry.label} className={styles.entry}>
                        <span className={styles.entryLabel}>{entry.label}</span>
                        <a href={`tel:${entry.phone.replace(/\s/g, '')}`} className={styles.entryPhone}>
                          {entry.phone}
                        </a>
                        {entry.address && (
                          <span className={styles.entryAddress}>{entry.address}</span>
                        )}
                        {entry.email && (
                          <a href={`mailto:${entry.email}`} className={styles.entryEmail}>
                            {entry.email}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  );
}

function PhoneBlockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

