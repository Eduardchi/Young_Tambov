// src/widgets/Footer/Footer.tsx
import styles from './Footer.module.scss';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="6" fill="#4B6CF7" />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
              fill="white" fontFamily="Montserrat,sans-serif" fontSize="13" fontWeight="800">
              тм
            </text>
          </svg>
          <span className={styles.brandName}>Тамбов молодой</span>
        </div>
        <p className={styles.copy}>
          © {YEAR} Все права защищены&nbsp;•&nbsp;Официальный молодёжный сайт Тамбовской области
        </p>
      </div>
    </footer>
  );
}