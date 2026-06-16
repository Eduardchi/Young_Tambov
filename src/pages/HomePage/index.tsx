// src/pages/HomePage/index.tsx
import { Link } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { NewsCard } from '@entities/News/ui/NewsCard';
import { ContactForm } from '@features/ContactForm/ui/ContactForm';
import { newsApi } from '@shared/api/news.api';
import { useFetch } from '@shared/hooks/useFetch';
import { CITY_TAGS } from '@shared/lib/constants';
import styles from './HomePage.module.scss';

// ── Municipal districts data ──────────────────────────────────────────────────

const G = '/images/Гербы/';

const MUNICIPAL_DISTRICTS = [
  { name: 'Бондарский муниципальный округ',     id: 'r34', coat: G + 'Бондарский_МО.png' },
  { name: 'Гавриловский муниципальный округ',    id: 'r51', coat: G + 'Гавриловский_МО.png' },
  { name: 'Жердевский муниципальный округ',      id: 'r35', coat: G + 'Жердевский_МО.png' },
  { name: 'Знаменский муниципальный округ',      id: 'r52', coat: G + 'Знаменский_МО.png' },
  { name: 'Инжавинский муниципальный округ',     id: 'r53', coat: G + 'Инжавинский_МО.png' },
  { name: 'Кирсановский муниципальный округ',    id: 'r37', coat: G + 'Кирсановский_МО.png' },
  { name: 'Мичуринский муниципальный округ',     id: 'r45', coat: G + 'Мичуринский_МО.png' },
  { name: 'Мордовский муниципальный округ',      id: 'r42', coat: G + 'Мордовский_МО.png' },
  { name: 'Моршанский муниципальный округ',      id: 'r33', coat: G + 'Моршанский_МО.png' },
  { name: 'Мучкапский муниципальный округ',      id: 'r46', coat: G + 'Мучкапский_МО.png' },
  { name: 'Никифоровский муниципальный округ',   id: 'r36', coat: G + 'Никифоровский_МО.png' },
  { name: 'Первомайский муниципальный округ',    id: 'r48', coat: G + 'Первомайский_МО.png' },
  { name: 'Петровский муниципальный округ',      id: 'r44', coat: G + 'Петровский_МО.png' },
  { name: 'Пичаевский муниципальный округ',      id: 'r54', coat: G + 'Пичаевский_Мо.png' },
  { name: 'Рассказовский муниципальный округ',   id: 'r31', coat: G + 'Рассказовский_МО.png' },
  { name: 'Ржаксинский муниципальный округ',     id: 'r55', coat: G + 'Ржаксинский_МО.png' },
  { name: 'Сампурский муниципальный округ',      id: 'r56', coat: G + 'Сампурский_МО.png' },
  { name: 'Сосновский муниципальный округ',      id: 'r32', coat: G + 'Сосновский_МО.png' },
  { name: 'Староюрьевский муниципальный округ',  id: 'r43', coat: G + 'Староюрьевский_МО.png' },
  { name: 'Тамбовский муниципальный округ',      id: 'r00', coat: G + 'Тамбовский_МО.png' },
  { name: 'Токарёвский муниципальный округ',     id: 'r57', coat: G + 'Токарёвский_МО.png' },
  { name: 'Уваровский муниципальный округ',      id: 'r58', coat: G + 'Уваровский_МО.png' },
  { name: 'Умётский муниципальный округ',        id: 'r59', coat: G + 'Умётский_МО.png' },
];

const CITY_DISTRICTS = [
  { name: 'Тамбов',     id: 'g00', coat: G + 'Тамбов.png' },
  { name: 'Кирсанов',   id: 'g37', coat: G + 'Кирсанов.png' },
  { name: 'Котовск',    id: 'g41', coat: G + 'Котовск.png' },
  { name: 'Мичуринск',  id: 'g45', coat: G + 'Мичуринск.png' },
  { name: 'Моршанск',   id: 'g33', coat: G + 'Моршанск.png' },
  { name: 'Рассказово', id: 'g31', coat: G + 'Рассказово.png' },
  { name: 'Уварово',    id: 'g58', coat: G + 'Уварово.png' },
];

const GOV_BASE = 'https://www.tambov.gov.ru/mestnoe-samoupravlenie';

// ── Component ─────────────────────────────────────────────────────────────────

export function HomePage() {
  const { data: newsData, loading: newsLoading, error: newsError } = useFetch(
    () => newsApi.getAll({ limit: '3' }),
    [],
  );
  const news = newsData?.data ?? [];

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroInner}>
          <div className={styles.heroPhoto}>
            <Img
              src="/images/Фотографии%20на%20сайт/Главная%20страница/Фото%20на%20главную%20страницу.jpg"
              alt="Фото"
              className={styles.heroImg}
            />
          </div>
          <div className={styles.heroDark}>
            <div className={styles.heroContent}>
              <h1 id="hero-heading" className={styles.heroTitle}>
                Тамбов<br />
                <span className={styles.heroBlue}>молодой</span>
              </h1>
              <p className={styles.heroSub}>молодёжь тамбовской области</p>
              <div className={styles.heroSocials} aria-label="Социальные сети">
                <a
                  href="https://vk.com/tambov_molodoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroSocialLink}
                  aria-label="ВКонтакте"
                >
                  <VkIcon />
                  <span>ВКонтакте</span>
                </a>
                <a
                  href="https://t.me/mp_to68"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroSocialLink}
                  aria-label="Telegram"
                >
                  <TgIcon />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://max.ru/dom_molodezhi68"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroSocialLink}
                  aria-label="Мой Мир"
                >
                  <MaxIcon />
                  <span>Мой Мир</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── News + Sidebar ─────────────────────────────────────────────── */}
      <section className={styles.newsSection} aria-labelledby="news-heading">
        <div className={styles.newsSectionInner}>
          {/* Header row */}
          <div className={styles.newsSectionHead}>
            <h2 id="news-heading" className={styles.sectionTitle}>Новости</h2>
            <Link to="/news" className={styles.sectionLink}>Все новости →</Link>
          </div>

          {/* 3-column news grid */}
          <div className={styles.newsRow}>
            <div className={styles.newsCol}>
              {newsLoading && <p className={styles.newsStatus}>Загрузка новостей...</p>}
              {newsError && <p className={styles.newsStatus}>Не удалось загрузить новости</p>}
              {!newsLoading && !newsError && (
                <ul className={styles.newsGrid} aria-label="Последние новости">
                  {news.map((item) => (
                    <li key={item.id} className={styles.newsGridItem}>
                      <NewsCard item={item} variant="grid" />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className={styles.sidebar} aria-label="Разделы по городам">
              <div className={styles.cityBlock}>
                <h2 className={styles.sectionTitle}>Города области</h2>
                <ul className={styles.cityGrid} aria-label="Города Тамбовской области">
                  {CITY_TAGS.map((city) => (
                    <li key={city}>
                      <Link
                        to={`/events?city=${encodeURIComponent(city)}`}
                        className={styles.cityTag}
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.joinCard} aria-labelledby="join-heading">
                <h3 id="join-heading" className={styles.joinTitle}>
                  Стань частью команды
                </h3>
                <p className={styles.joinText}>
                  Присоединяйся к молодёжному движению Тамбовской области и реализуй самые смелые идеи.
                </p>
                <Link to="/organization" className={styles.joinBtn}>
                  Подать заявку
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Municipal districts ────────────────────────────────────────── */}
      <section className={styles.municipalSection} aria-labelledby="municipal-heading">
        <div className={styles.municipalInner}>
          <div className={styles.municipalHeader}>
            <h2 id="municipal-heading" className={styles.municipalTitle}>
              Муниципальные<br /><span className={styles.municipalAccent}>округа</span>
            </h2>
            <p className={styles.municipalDesc}>
              Молодёжные программы реализуются во всех муниципальных и городских округах региона
            </p>
          </div>

          <div className={styles.municipalGroups}>
            <div className={styles.municipalGroup}>
              <h3 className={styles.municipalGroupLabel}>Муниципальные округа</h3>
              <ul className={styles.municipalGrid}>
                {MUNICIPAL_DISTRICTS.map((d) => (
                  <li key={d.id}>
                    <a
                      href={`${GOV_BASE}/${d.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.municipalCard}
                    >
                      <MunicipalShield letter={d.name.charAt(0)} coat={d.coat} />
                      <span className={styles.municipalName}>
                        {d.name.replace(' муниципальный округ', '')}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.municipalGroup}>
              <h3 className={styles.municipalGroupLabel}>Городские округа</h3>
              <ul className={styles.municipalGrid}>
                {CITY_DISTRICTS.map((d) => (
                  <li key={d.id}>
                    <a
                      href={`${GOV_BASE}/${d.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.municipalCard}
                    >
                      <MunicipalShield letter={d.name.charAt(0)} coat={d.coat} />
                      <span className={styles.municipalName}>{d.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Служба заботы ──────────────────────────────────────────────── */}
      <section className={styles.contactSection} aria-labelledby="contact-heading">
        <div className={styles.contactInner}>
          <div className={styles.contactInfo}>
            <h2 id="contact-heading" className={styles.contactTitle}>
              Служба<br /><span className={styles.contactBlue}>заботы</span>
            </h2>
            <ul className={styles.contactDetails}>
              <li>
                <a href="tel:+74752492635" className={styles.contactItem}>
                  <PhoneIcon />
                  8 (4752) 49-26-35
                </a>
              </li>
              <li>
                <a href="mailto:togbu_dmto@mail.ru" className={styles.contactItem}>
                  <MailIcon />
                  togbu_dmto@mail.ru
                </a>
              </li>
              <li>
                <span className={styles.contactItem}>
                  <PinIcon />
                  г. Тамбов, ул. Пензенская, д. 62
                </span>
              </li>
            </ul>
          </div>
          <div className={styles.contactForm}>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

// ── Shield component ──────────────────────────────────────────────────────────

function MunicipalShield({ letter, coat }: { letter: string; coat: string }) {
  return (
    <div className={styles.municipalShield} aria-hidden="true">
      <div className={styles.municipalShieldInner} />
      {coat ? (
        <img
          src={coat}
          alt=""
          className={styles.municipalCoatImg}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <span className={styles.municipalInitial}>{letter}</span>
      )}
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function VkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.496c.596-.19 1.365 1.26 2.179 1.815.615.418 1.082.326 1.082.326l2.172-.03s1.135-.071.597-1.103c-.044-.08-.313-.664-1.61-1.877-1.358-1.265-1.175-1.06.46-3.246.998-1.33 1.397-2.143 1.272-2.49-.12-.33-.849-.244-.849-.244l-2.443.015s-.181-.025-.315.059a.684.684 0 00-.222.29s-.387 1.04-.902 1.924c-1.088 1.87-1.52 1.968-1.698 1.85-.413-.267-.31-1.073-.31-1.646 0-1.792.27-2.538-.527-2.733a4.724 4.724 0 00-1.257-.078c-.96-.01-1.772.003-2.232.229-.306.15-.542.485-.398.504.178.024.58.109.794.4.276.377.266 1.224.266 1.224s.159 2.111-.37 2.372c-.362.178-.859-.185-1.926-1.843-.547-.96-.96-2.022-.96-2.022s-.08-.199-.21-.307a1.03 1.03 0 00-.384-.175l-2.32.015s-.348.01-.476.162c-.114.135-.009.414-.009.414s1.816 4.29 3.872 6.453c1.885 1.985 4.027 1.854 4.027 1.854h.97z" />
    </svg>
  );
}

function TgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-2.014 9.49c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.64 13.952l-2.955-.924c-.643-.204-.657-.643.136-.953l11.57-4.46c.537-.194 1.006.131.503 2.606z" />
    </svg>
  );
}

function MaxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M7 17L12 7l5 10M9 13h6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}