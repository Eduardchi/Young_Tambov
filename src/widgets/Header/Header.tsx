// src/widgets/Header/Header.tsx
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { MobileMenu } from '@widgets/MobileMenu/MobileMenu';
import { useIsMobile } from '@shared/hooks/useMediaQuery';
import { NAV_ITEMS } from './constants';
import styles from './Header.module.scss';

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <>
      <header className={clsx(styles.header, { [styles['header--scrolled']]: isScrolled })}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="Тамбов Молодой — на главную">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className={styles.logoMark} aria-hidden="true" />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Тамбов</span>
              <span className={styles.logoSub}>молодой</span>
            </div>
          </Link>

          <nav className={styles.nav} aria-label="Основная навигация">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      clsx(styles.navLink, { [styles['navLink--active']]: isActive })
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={styles.burgerBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
}
