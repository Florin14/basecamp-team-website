import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { useReducedMotion } from './useMediaQuery';

/** Undă circulară care pornește din punctul de click. */
export function useRipple() {
  const reduced = useReducedMotion();

  return useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (reduced) return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const wave = document.createElement('span');
      wave.className = 'ripple';
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${event.clientX - rect.left - size / 2}px`;
      wave.style.top = `${event.clientY - rect.top - size / 2}px`;
      wave.addEventListener('animationend', () => wave.remove());
      el.appendChild(wave);
    },
    [reduced],
  );
}
