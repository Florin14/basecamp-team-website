import { useReducedMotion, useScrollProgress } from '../../hooks';
import { cx } from '../../lib/format';
import { ChevronUp } from '../ui/Icon';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const { pastHero } = useScrollProgress();
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      className={cx(styles.fab, pastHero && styles.show)}
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
      aria-label="Înapoi sus"
      tabIndex={pastHero ? 0 : -1}
    >
      <ChevronUp />
    </button>
  );
}
