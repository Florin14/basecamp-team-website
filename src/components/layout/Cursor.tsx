import { useCursor } from '../../hooks';
import styles from './Cursor.module.css';

/** Cursor personalizat (punct + inel cu lag). Ascuns pe touch. */
export function Cursor() {
  const { wrapRef, dotRef, ringRef, enabled } = useCursor();
  if (!enabled) return null;
  return (
    <div ref={wrapRef} className={styles.cursor} aria-hidden>
      <span ref={dotRef} className={styles.dot} />
      <span ref={ringRef} className={styles.ring} />
    </div>
  );
}
