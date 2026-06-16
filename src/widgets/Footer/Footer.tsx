// src/widgets/Footer/Footer.tsx
import styles from './Footer.module.scss';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt=""
            width={32}
            height={32}
            className={styles.brandLogo}
            aria-hidden="true"
          />
          <span className={styles.brandName}>Тамбов молодой</span>
        </div>
        <p className={styles.copy}>
          © {YEAR} Все права защищены&nbsp;•&nbsp;Официальный молодёжный сайт Тамбовской области
        </p>
        <p className={styles.copy}>
          При использовании материалов ссылка на сайт обязательна.
        </p>
      </div>
    </footer>
  );
}