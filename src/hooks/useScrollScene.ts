import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useMediaQuery';

type Scene = {
  /** 0 înainte de secțiune, 1 după ce a fost parcursă complet. */
  progress: number;
  /** Pasul curent, calculat din progres. */
  step: number;
  /** Secțiunea este în dreptul ecranului. */
  active: boolean;
};

/**
 * Progresul scroll-ului printr-o secțiune înaltă cu conținut fixat (sticky).
 * Elementul de referință este containerul înalt, nu panoul lipit.
 */
export function useScrollScene<T extends HTMLElement = HTMLDivElement>(steps: number) {
  const ref = useRef<T>(null);
  const [scene, setScene] = useState<Scene>({ progress: 0, step: 0, active: false });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setScene({ progress: 1, step: steps - 1, active: true });
      return;
    }

    let ticking = false;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      // Cuantificat la 0,5%: destul pentru bara de progres, dar taie
      // majoritatea re-randărilor secțiunii în timpul scroll-ului.
      const progress = Math.round(Math.min(Math.max(raw, 0), 1) * 200) / 200;
      // Ultimul pas rămâne activ până la finalul secțiunii.
      const step = Math.min(steps - 1, Math.floor(progress * steps));
      setScene((current) =>
        current.progress === progress && current.step === step
          ? current
          : { progress, step, active: rect.top < window.innerHeight && rect.bottom > 0 },
      );
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [steps, reduced]);

  return { ref, ...scene };
}
