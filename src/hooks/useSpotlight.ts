import { useEffect, useRef } from 'react';
import { useFinePointer } from './useMediaQuery';

/** Setează --mx/--my pe card pentru efectul de spotlight la hover. */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const fine = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [fine]);

  return ref;
}
