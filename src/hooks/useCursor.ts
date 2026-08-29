import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from './useMediaQuery';

/**
 * Cursor personalizat: punct care urmărește exact mouse-ul și un inel cu lag.
 * Activ doar pe pointer fin, fără reduced-motion.
 */
export function useCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      wrap.classList.add('on');
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest('[data-cursor], a, button');
      wrap.classList.remove('hover', 'card');
      if (!target) return;
      const kind = (target as HTMLElement).dataset.cursor;
      wrap.classList.add(kind === 'card' ? 'card' : 'hover');
    };
    const onLeave = () => wrap.classList.remove('on');

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  return { wrapRef, dotRef, ringRef, enabled };
}
