import { useEffect, useState } from 'react';
import { useReducedMotion } from './useMediaQuery';

/**
 * Progresul ecranului de întâmpinare. Urcă animat până la 90% și se
 * completează când pagina a terminat de încărcat.
 */
export function usePreloader(minDuration = 900) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(reduced ? 100 : 8);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const started = performance.now();

    const tick = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + Math.random() * 14));
    }, 110);

    const finish = () => {
      clearInterval(tick);
      const wait = Math.max(0, minDuration - (performance.now() - started));
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setDone(true), 520);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    return () => {
      clearInterval(tick);
      window.removeEventListener('load', finish);
    };
  }, [minDuration, reduced]);

  // Blochează scroll-ul cât timp ecranul de întâmpinare este vizibil.
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  return { progress: Math.min(progress, 100), done };
}
