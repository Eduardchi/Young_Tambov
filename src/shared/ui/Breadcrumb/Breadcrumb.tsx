// src/shared/ui/Breadcrumb/Breadcrumb.tsx
import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Навигационная цепочка">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item} aria-current={isLast ? 'page' : undefined}>
              {isLast || !item.path ? (
                <span className={styles.current}>{item.label}</span>
              ) : (
                <>
                  <Link to={item.path} className={styles.link}>
                    {item.label}
                  </Link>
                  <span className={styles.separator} aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}