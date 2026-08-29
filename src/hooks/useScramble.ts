import { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from './useMediaQuery';

const GLYPHS = '▚▞▛▜◤◥◣◢/\\|_-=+*#';

/**
 * Efect de „decodare” a textului: literele se stabilizează una câte una.
 * Scrie direct în DOM, ca să nu re-randeze componenta la fiecare cadru.
 */
export function useScramble<T extends HTMLElement = HTMLSpanElement>(
  text: string,
  { auto = false }: { auto?: boolean } = {},
) {
  const ref = useRef<T>(null);
  const raf = useRef(0);
  const reduced = useReducedMotion();

  const run = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = text;
      return;
    }

    cancelAnimationFrame(raf.current);
    const chars = [...text];
    const settleAt = chars.map((_, i) => i * 1.4 + Math.random() * 5);
    let frame = 0;

    const tick = () => {
      let done = true;
      el.textContent = chars
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (frame >= settleAt[i] + 7) return char;
          done = false;
          if (frame >= settleAt[i]) return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          return ' ';
        })
        .join('');
      frame += 1;
      if (done) el.textContent = text;
      else raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
  }, [reduced, text]);

  useEffect(() => {
    const el = ref.current;
    if (el) el.textContent = text;
    if (!auto) return () => cancelAnimationFrame(raf.current);
    const id = window.setTimeout(run, 60);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(raf.current);
    };
  }, [auto, run, text]);

  return { ref, run };
}
