import { useEffect, useState } from 'react';
import { useReducedMotion } from './useMediaQuery';

const SEEN_KEY = 'bc:preloader-seen';

/** Ecranul de întâmpinare a fost deja afișat în sesiunea curentă? */
function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    // Modul privat poate bloca sessionStorage — atunci îl arătăm normal.
    return false;
  }
}

/**
 * Progresul ecranului de întâmpinare. Apare o singură dată pe sesiune și
 * dispare imediat ce aplicația a randat primul cadru — nu așteaptă
 * fonturile sau imaginile, ca să nu întârzie inutil prima interacțiune.
 */
export function usePreloader(fadeMs = 260) {
  const reduced = useReducedMotion();
  const [skip] = useState(() => reduced || alreadySeen());
  const [progress, setProgress] = useState(skip ? 100 : 12);
  const [done, setDone] = useState(skip);
  // După fade scoatem stratul din DOM, ca să nu rămână un layer fix inutil.
  const [gone, setGone] = useState(skip);

  useEffect(() => {
    if (skip) return;

    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Fără sessionStorage doar reapare la următoarea navigare completă.
    }

    const timers: number[] = [];
    let raf = 0;

    // Două cadre: primul confirmă montarea, al doilea că s-a și pictat.
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        raf = 0;
        setProgress(100);
        timers.push(window.setTimeout(() => setDone(true), fadeMs));
        timers.push(window.setTimeout(() => setGone(true), fadeMs + 320));
      });
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [skip, fadeMs]);

  // Blochează scroll-ul cât timp ecranul de întâmpinare este vizibil.
  useEffect(() => {
    if (done) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [done]);

  return { progress: Math.min(progress, 100), done, gone };
}
