import { useEffect, useState } from 'react';

export type ScrollState = {
  /** 0–100, cât din pagină s-a parcurs. */
  progress: number;
  /** Peste 20px de la început — nav-ul devine „stuck”. */
  stuck: boolean;
  /** Scroll în jos, sub 420px — nav-ul se ascunde. */
  hidden: boolean;
  /** Peste 70% din înălțimea ecranului — butonul „sus” apare. */
  pastHero: boolean;
};

/** Progres de scroll + stările de chrome, cu citiri într-un singur rAF. */
export function useScrollProgress(navLocked = false): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    stuck: false,
    hidden: false,
    pastHero: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const read = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Rotunjim progresul la 0,5% — bara de scroll arată la fel, dar
      // scăpăm de un re-render al antetului la fiecare cadru.
      const progress = max > 0 ? Math.round((y / max) * 200) / 2 : 0;
      const next: ScrollState = {
        progress,
        stuck: y > 20,
        hidden: y > lastY && y > 420 && !navLocked,
        pastHero: y > window.innerHeight * 0.7,
      };
      lastY = y;
      ticking = false;
      setState((current) =>
        current.progress === next.progress &&
        current.stuck === next.stuck &&
        current.hidden === next.hidden &&
        current.pastHero === next.pastHero
          ? current
          : next,
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [navLocked]);

  return state;
}
