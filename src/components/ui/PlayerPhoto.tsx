import type { ImgHTMLAttributes } from 'react';

const DEFAULT_PLAYER_PHOTO = '/img/player-1.svg';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'alt'> & { alt: string };

export function PlayerPhoto({ src, ...props }: Props) {
  return (
    <img
      {...props}
      src={src?.trim() || DEFAULT_PLAYER_PHOTO}
      onError={({ currentTarget }) => {
        if (currentTarget.getAttribute('src') !== DEFAULT_PLAYER_PHOTO) {
          currentTarget.src = DEFAULT_PLAYER_PHOTO;
        }
      }}
    />
  );
}
