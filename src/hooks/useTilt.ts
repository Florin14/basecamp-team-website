import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from './useMediaQuery';

type Options = {
  /** Unghiul maxim de înclinare, în grade. */
  max?: number;
  /** Ridicare pe axa Z la hover, în px. */
  lift?: number;
  /** Setează și --mx/--my pentru efectul de spotlight. */
  spotlight?: boolean;
};

/** Înclinare 3D a cardului după poziția cursorului. */
export function useTilt<T extends HTMLElement = HTMLElement>({
  max = 7,
  lift = 10,
  spotlight = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;

    let raf = 0;
    let target = { rx: 0, ry: 0, on: 0 };
    let current = { rx: 0, ry: 0, on: 0 };

    const loop = () => {
      current = {
        rx: current.rx + (target.rx - current.rx) * 0.14,
        ry: current.ry + (target.ry - current.ry) * 0.14,
        on: current.on + (target.on - current.on) * 0.14,
      };
      el.style.transform =
        `perspective(900px) rotateX(${current.rx.toFixed(2)}deg) ` +
        `rotateY(${current.ry.toFixed(2)}deg) translate3d(0, ${(-lift * current.on).toFixed(1)}px, 0)`;
      if (
        Math.abs(target.rx - current.rx) > 0.01 ||
        Math.abs(target.ry - current.ry) > 0.01 ||
        Math.abs(target.on - current.on) > 0.01
      ) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      target = { rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, on: 1 };
      if (spotlight) {
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      kick();
    };

    const onLeave = () => {
      target = { rx: 0, ry: 0, on: 0 };
      kick();
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [max, lift, spotlight, fine, reduced]);

  return ref;
}
