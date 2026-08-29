import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cx } from '../../lib/format';
import styles from './PageTransition.module.css';

/**
 * Fiecare navigare intră cu un fade-up scurt, plus o „perdea” care
 * mătură ecranul de la stânga la dreapta.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [stage, setStage] = useState<'enter' | 'idle'>('idle');

  useEffect(() => {
    setStage('enter');
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setStage('idle'));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <span key={pathname} className={styles.curtain} aria-hidden />
      <div className={cx(styles.page, stage === 'enter' && styles.entering)}>{children}</div>
    </>
  );
}
