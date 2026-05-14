// src/entities/SupportProgram/ui/SupportCard.tsx
import { Button } from '@shared/ui/Button/Button';
import { Img } from '@shared/ui/Img/Img';
import { formatDate } from '@shared/lib/utils';
import type { SupportProgram, SupportCategory } from '@shared/types';
import styles from './SupportCard.module.scss';

interface SupportCardProps {
  program: SupportProgram;
}

const CATEGORY_COLORS: Record<SupportCategory, string> = {
  Гранты:          '#e8506a',
  Стипендии:       '#4b6cf7',
  Жильё:           '#3ecf8e',
  Трудоустройство: '#f5a623',
  Обучение:        '#9b59b6',
};

export function SupportCard({ program }: SupportCardProps) {
  const color = CATEGORY_COLORS[program.category];

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Img
          src={program.imageUrl}
          alt=""
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category} style={{ color }}>
            {program.category}
          </span>
          <span className={styles.deadline}>
            {program.deadline ? `до ${formatDate(program.deadline)}` : 'Прямо сейчас'}
          </span>
        </div>
        <h3 className={styles.title}>{program.title}</h3>
        <p className={styles.desc}>{program.description}</p>
        <Button as="a" href="#" variant="secondary" size="sm">
          Узнать подробнее
        </Button>
      </div>
    </article>
  );
}