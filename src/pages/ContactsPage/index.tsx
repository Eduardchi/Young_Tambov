// src/pages/ContactsPage/index.tsx
import styles from './ContactsPage.module.scss';

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface OrgContact {
  id: string;
  name: string;
  website: string;
  websiteLabel: string;
  socials: SocialLink[];
  phones: string[];
  email: string;
  address: string;
}

const ORGS: OrgContact[] = [
  {
    id: 'dmp',
    name: 'Департамент молодёжной политики Правительства Тамбовской области',
    website: 'https://www.tambov.gov.ru/dmp',
    websiteLabel: 'tambov.gov.ru/dmp',
    socials: [
      { label: 'ВКонтакте', href: 'https://vk.com/tambov_molodoy', icon: <VkIcon /> },
      { label: 'Telegram',  href: 'https://t.me/mp_to68',          icon: <TgIcon /> },
    ],
    phones: ['+7 (4752) 78-62-60'],
    email: 'post@dmp.tambov.gov.ru',
    address: '392017, г. Тамбов, ул. Интернациональная, 14 (Правительство Тамбовской области)',
  },
  {
    id: 'dmto',
    name: 'Дом молодёжи Тамбовской области',
    website: 'https://дмто.рф',
    websiteLabel: 'дмто.рф',
    socials: [
      { label: 'ВКонтакте', href: 'https://vk.com/dom_molodezhi68', icon: <VkIcon /> },
      { label: 'Telegram',  href: 'https://t.me/DMTOnew',           icon: <TgIcon /> },
      { label: 'Мой Мир',   href: 'https://max.ru/dom_molodezhi68', icon: <MaxIcon /> },
    ],
    phones: ['+7 (4752) 49-26-35', '+7 (4752) 48-00-93'],
    email: 'togbu_dmto@mail.ru',
    address: 'г. Тамбов, ул. Пензенская, 62',
  },
  {
    id: 'dmt',
    name: 'Дом молодёжи города Тамбова',
    website: 'https://dmtambov.ru',
    websiteLabel: 'dmtambov.ru',
    socials: [
      { label: 'ВКонтакте', href: 'https://vk.com/dmtambov',                icon: <VkIcon /> },
      { label: 'Telegram',  href: 'https://t.me/dmtambov',                  icon: <TgIcon /> },
      { label: 'Мой Мир',   href: 'https://max.ru/id6829068989_gos',        icon: <MaxIcon /> },
    ],
    phones: ['+7 (4752) 49-24-28'],
    email: 'dmol@cityadm.tambov.gov.ru',
    address: 'г. Тамбов, ул. Гоголя, 33',
  },
];

export function ContactsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.subtitle}>
            Мы всегда на связи и готовы помочь тебе в реализации самых смелых идей.
          </p>
        </div>
      </header>

      <section className={styles.blocks} aria-label="Контактная информация">
        <div className={styles.blocksInner}>
          <ul className={styles.grid}>
            {ORGS.map((org) => (
              <li key={org.id}>
                <article className={styles.card} aria-labelledby={`org-${org.id}`}>
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrap} aria-hidden="true">
                      <BuildingIcon />
                    </div>
                    <h2 id={`org-${org.id}`} className={styles.orgName}>
                      {org.name}
                    </h2>
                  </div>

                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.website}
                  >
                    <GlobeIcon />
                    <span>{org.websiteLabel}</span>
                  </a>

                  <ul className={styles.socials} aria-label="Социальные сети">
                    {org.socials.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                          aria-label={s.label}
                          title={s.label}
                        >
                          {s.icon}
                          <span>{s.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <dl className={styles.details}>
                    <div className={styles.detail}>
                      <dt className={styles.detailIcon} aria-label="Телефон"><PhoneIcon /></dt>
                      <dd className={styles.detailValue}>
                        {org.phones.map((p) => (
                          <a key={p} href={`tel:${p.replace(/[\s\-()]/g, '')}`} className={styles.phone}>
                            {p}
                          </a>
                        ))}
                      </dd>
                    </div>

                    <div className={styles.detail}>
                      <dt className={styles.detailIcon} aria-label="Email"><MailIcon /></dt>
                      <dd className={styles.detailValue}>
                        <a href={`mailto:${org.email}`} className={styles.email}>
                          {org.email}
                        </a>
                      </dd>
                    </div>

                    <div className={styles.detail}>
                      <dt className={styles.detailIcon} aria-label="Адрес"><PinIcon /></dt>
                      <dd className={styles.detailValue}>
                        <span className={styles.address}>{org.address}</span>
                      </dd>
                    </div>
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M9 22V12h6v10M9 7h1m4 0h1M9 11h1m4 0h1"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.596-.19 1.365 1.26 2.179 1.815.615.418 1.082.326 1.082.326l2.172-.03s1.135-.071.597-1.103c-.044-.08-.313-.664-1.61-1.877-1.358-1.265-1.175-1.06.46-3.246.998-1.33 1.397-2.143 1.272-2.49-.12-.33-.849-.244-.849-.244l-2.443.015s-.181-.025-.315.059a.684.684 0 00-.222.29s-.387 1.04-.902 1.924c-1.088 1.87-1.52 1.968-1.698 1.85-.413-.267-.31-1.073-.31-1.646 0-1.792.27-2.538-.527-2.733a4.724 4.724 0 00-1.257-.078c-.96-.01-1.772.003-2.232.229-.306.15-.542.485-.398.504.178.024.58.109.794.4.276.377.266 1.224.266 1.224s.159 2.111-.37 2.372c-.362.178-.859-.185-1.926-1.843-.547-.96-.96-2.022-.96-2.022s-.08-.199-.21-.307a1.03 1.03 0 00-.384-.175l-2.32.015s-.348.01-.476.162c-.114.135-.009.414-.009.414s1.816 4.29 3.872 6.453c1.885 1.985 4.027 1.854 4.027 1.854h.97z"/>
    </svg>
  );
}

function TgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-2.014 9.49c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.64 13.952l-2.955-.924c-.643-.204-.657-.643.136-.953l11.57-4.46c.537-.194 1.006.131.503 2.606z"/>
    </svg>
  );
}

function MaxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M7 17L12 7l5 10M9 13h6"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}