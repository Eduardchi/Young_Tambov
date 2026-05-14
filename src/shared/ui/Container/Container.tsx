// src/shared/ui/Container/Container.tsx
import type { HTMLAttributes, ElementType } from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  narrow?: boolean;
}

export function Container({ as: Tag = 'div', narrow = false, className, children, ...rest }: ContainerProps) {
  return (
    <Tag className={clsx(styles.container, { [styles['container--narrow']]: narrow }, className)} {...rest}>
      {children}
    </Tag>
  );
}