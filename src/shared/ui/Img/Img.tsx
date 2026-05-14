// src/shared/ui/Img/Img.tsx
import type { ImgHTMLAttributes } from 'react';

type ImgProps = ImgHTMLAttributes<HTMLImageElement>;

export function Img({ src, alt = '', ...props }: ImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      {...props}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.dataset.errored !== '1') {
          img.dataset.errored = '1';
          img.src = '/placeholder.svg';
        }
      }}
    />
  );
}