import type { ImgHTMLAttributes } from 'react';
import { DEFAULT_TEAM_CREST } from '../../data/teams';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'>;

export function TeamCrest({ src, alt = '', width = 44, height = 44, style, ...props }: Props) {
  return (
    <img
      {...props}
      src={src?.trim() || DEFAULT_TEAM_CREST}
      alt={alt}
      width={width}
      height={height}
      style={{ width, height, objectFit: 'contain', ...style }}
      onError={({ currentTarget }) => {
        if (currentTarget.getAttribute('src') !== DEFAULT_TEAM_CREST) {
          currentTarget.src = DEFAULT_TEAM_CREST;
        }
      }}
    />
  );
}
