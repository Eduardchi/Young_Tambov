// src/shared/ui/Badge/Badge.tsx
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.scss';

export type BadgeVariant = 'primary' | 'accent' | 'neutral' | 'success' | 'category';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = 'neutral', className, children, ...rest }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[`badge--${variant}`], className)} {...rest}>
      {children}
    </span>
  );
}