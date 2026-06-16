// src/entities/News/ui/NewsCard.tsx
import { Link } from 'react-router-dom';
import { Img } from '@shared/ui/Img/Img';
import { formatDateShort } from '@shared/lib/utils';
import type { NewsItem } from '@shared/types';
import styles from './NewsCard.module.scss';

interface NewsCardProps {
  item: NewsItem;
  variant?: 'list' | 'grid';
}

export function NewsCard({ item, variant = 'list' }: NewsCardProps) {
  if (variant === 'grid') {
    return (
      <article className={styles.cardGrid}>
        <Link
          to={`/news/${item.id}`}
          className={styles.imageWrapGrid}
          aria-label={item.title}
          tabIndex={-1}
        >
          <Img src={item.imageUrl} alt="" className={styles.image} loading="lazy" />
          <span className={styles.categoryBadge}>{item.category}</span>
        </Link>
        <div className={styles.contentGrid}>
          <time dateTime={item.date} className={styles.date}>
            {formatDateShort(item.date).toUpperCase()}
          </time>
          <h3 className={styles.titleGrid}>
            <Link to={`/news/${item.id}`} className={styles.titleLink}>
              {item.title}
            </Link>
          </h3>
          <p className={styles.descGrid}>{item.description}</p>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <Link to={`/news/${item.id}`} className={styles.imageWrap} aria-label={item.title} tabIndex={-1}>
        <Img src={item.imageUrl} alt="" className={styles.image} loading="lazy" />
      </Link>
      <div className={styles.content}>
        <time dateTime={item.date} className={styles.date}>
          {formatDateShort(item.date).toUpperCase()}
        </time>
        <h3 className={styles.title}>
          <Link to={`/news/${item.id}`} className={styles.titleLink}>
            {item.title}
          </Link>
        </h3>
        <p className={styles.desc}>{item.description}</p>
      </div>
    </article>
  );
}