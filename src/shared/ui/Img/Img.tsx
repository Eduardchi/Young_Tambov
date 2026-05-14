// src/shared/ui/Img/Img.tsx
import type { ImgHTMLAttributes } from 'react';

type ImgProps = ImgHTMLAttributes<HTMLImageElement>;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function resolve(src: string | undefined) {
  if (!src || !src.startsWith('/')) return src;
  return BASE + src;
}

export function Img({ src, alt = '', ...props }: ImgProps) {
  return (
    <img
      src={resolve(src)}
      alt={alt}
      {...props}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.dataset.errored !== '1') {
          img.dataset.errored = '1';
          img.src = BASE + '/placeholder.svg';
        }
      }}
    />
  );
}
