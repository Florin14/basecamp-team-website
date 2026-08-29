import { useEffect, useRef } from 'react';

type Options = {
  /** Întârziere înainte de animație, în ms. */
  delay?: number;
  /** Distanță între copii pentru containerele `.stagger`, în ms. */
  stagger?: number;
  threshold?: number;
};

/**
 * Adaugă clasa `in` când elementul intră în viewport (o singură dată).
 * Portat din observer-ul global din v2/assets/js/main.js.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  delay = 0,
  stagger,
  threshold = 0.16,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay) el.style.setProperty('--d', `${delay}ms`);
    if (stagger) {
      Array.from(el.children).forEach((child, i) => {
        (child as HTMLElement).style.transitionDelay = `${i * stagger}ms`;
      });
    }

    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger, threshold]);

  return ref;
}
