// src/pages/HomePage/index.tsx
import { Link } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { NewsCard } from '@entities/News/ui/NewsCard';
import { ContactForm } from '@features/ContactForm/ui/ContactForm';
import { MOCK_NEWS, CITY_TAGS } from '@entities/News/model/mock';
import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroPhoto}>
          <Img
            src="/images/Главная.jpg"
            alt=""
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
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroTg}
              aria-label="Подписаться на Telegram"
            >
              Telegram — подпишись на нас
            </a>
          </div>
        </div>
      </section>

      {/* ── News + Sidebar ───────────────────────────────────────────── */}
      <section className={styles.newsSection} aria-labelledby="news-heading">
        <div className={styles.newsSectionInner}>
          {/* left: news list */}
          <div className={styles.newsCol}>
            <div className={styles.sectionHead}>
              <h2 id="news-heading" className={styles.sectionTitle}>Новости</h2>
              <Link to="/news" className={styles.sectionLink}>Все новости →</Link>
            </div>
            <ul aria-label="Последние новости">
              {MOCK_NEWS.map((item) => (
                <li key={item.id}>
                  <NewsCard item={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* right: cities + join */}
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
      </section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section className={styles.contactSection} aria-labelledby="contact-heading">
        <div className={styles.contactInner}>
          <div className={styles.contactInfo}>
            <h2 id="contact-heading" className={styles.contactTitle}>
              Связаться<br /><span className={styles.contactBlue}>с нами</span>
            </h2>
            <ul className={styles.contactDetails}>
              <li>
                <a href="tel:+74752492635" className={styles.contactItem}>
                  <PhoneIcon />
                  8 (4752) 49-26-35
                </a>
                <span className={styles.contactSub}>Приёмная дирекции</span>
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

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}