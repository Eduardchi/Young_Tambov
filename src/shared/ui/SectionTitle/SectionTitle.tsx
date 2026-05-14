// src/shared/ui/SectionTitle/SectionTitle.tsx
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './SectionTitle.module.scss';

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  accent?: boolean;
  light?: boolean;
  align?: 'left' | 'center';
  tag?: 'h1' | 'h2' | 'h3';
}

export function SectionTitle({
  title,
  subtitle,
  accent = false,
  light = false,
  align = 'left',
  tag: Tag = 'h2',
  className,
  id,
  ...rest
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        styles.wrapper,
        {
          [styles['wrapper--accent']]: accent,
          [styles['wrapper--center']]: align === 'center',
          [styles['wrapper--light']]: light,
        },
        className,
      )}
      {...rest}
    >
      <Tag id={id} className={styles.title}>{title}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}