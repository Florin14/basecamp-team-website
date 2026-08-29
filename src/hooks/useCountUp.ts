import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useMediaQuery';

/** Numără de la 0 la `to` când elementul devine vizibil. */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(to: number, duration = 1500) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || !('IntersectionObserver' in window)) {
      setValue(to);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries[0]?.isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return { ref, value };
}
