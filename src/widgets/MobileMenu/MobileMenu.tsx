// src/widgets/MobileMenu/MobileMenu.tsx
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useScrollLock } from '@shared/hooks/useScrollLock';
import type { NavItem } from '@shared/types';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  useScrollLock(isOpen);

  return (
    <>
      <div
        className={clsx(styles.backdrop, { [styles['backdrop--visible']]: isOpen })}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className={clsx(styles.menu, { [styles['menu--open']]: isOpen })}
        aria-label="Мобильная навигация"
        aria-hidden={!isOpen}
        id="mobile-menu"
      >
        <div className={styles.menuHead}>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Закрыть меню"
          >
            ✕
          </button>
        </div>
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(styles.link, { [styles['link--active']]: isActive })
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}