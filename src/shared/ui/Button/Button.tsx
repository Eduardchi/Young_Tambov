// src/shared/ui/Button/Button.tsx
import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'outline-dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: never;
  href?: never;
  to?: never;
}

interface ButtonAsAnchor extends BaseButtonProps {
  as: 'a';
  href: string;
  to?: never;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

interface ButtonAsLink extends BaseButtonProps, Omit<LinkProps, 'className'> {
  as: 'link';
  href?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', fullWidth = false, className } = props;

  const cls = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    { [styles['button--fullWidth']]: fullWidth },
    className,
  );

  if (props.as === 'a') {
    const { as: _a, variant: _v, size: _s, fullWidth: _f, className: _c, ...rest } = props;
    return <a className={cls} {...rest} />;
  }

  if (props.as === 'link') {
    const { as: _a, variant: _v, size: _s, fullWidth: _f, className: _c, ...rest } = props;
    return <Link className={cls} {...rest} />;
  }

  const { variant: _v, size: _s, fullWidth: _f, className: _c, ...rest } = props as ButtonAsButton;
  return <button className={cls} {...rest} />;
}