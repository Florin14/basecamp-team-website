import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from './useMediaQuery';

/** Butoane „magnetice”: elementul urmărește ușor cursorul (doar pointer fin). */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(
  enabled = true,
  strength = 0.28,
) {
  const ref = useRef<T>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || !fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * (strength * 1.5);
      el.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  }, [enabled, fine, reduced, strength]);

  return ref;
}
