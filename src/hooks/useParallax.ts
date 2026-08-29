import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useMediaQuery';

/**
 * Deplasare pe verticală proporțională cu poziția elementului în viewport.
 * `speed` pozitiv = se mișcă mai lent decât pagina.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.12) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let ticking = false;
    let visible = true;

    const apply = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking || !visible) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    // Nu calculăm nimic cât timp elementul e departe de ecran.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) onScroll();
      },
      { rootMargin: '20% 0px' },
    );
    io.observe(el);

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.style.transform = '';
    };
  }, [speed, reduced]);

  return ref;
}
