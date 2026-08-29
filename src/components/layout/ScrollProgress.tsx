import { useScrollProgress } from '../../hooks';
import styles from './ScrollProgress.module.css';

/** Bara subțire de progres din partea de sus a paginii. */
export function ScrollProgress() {
  const { progress } = useScrollProgress();
  return (
    <div className={styles.wrap} aria-hidden>
      <span className={styles.bar} style={{ width: `${progress}%` }} />
    </div>
  );
}
