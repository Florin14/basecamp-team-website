import { club } from '../../data';
import { usePreloader } from '../../hooks';
import { cx } from '../../lib/format';
import styles from './Preloader.module.css';

/** Ecran de întâmpinare: sigla se desenează, bara umple, apoi dispare. */
export function Preloader() {
  const { progress, done } = usePreloader();

  return (
    <div className={cx(styles.wrap, done && styles.done)} aria-hidden={done}>
      <div className={styles.inner}>
        <svg className={styles.mark} viewBox="0 0 96 96" width="88" height="88" aria-hidden>
          <path
            className={styles.shield}
            d="M48 6 84 17v32c0 21-16 34-36 40C28 83 12 70 12 49V17Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle
            className={styles.ball}
            cx="48"
            cy="44"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
        <p className={styles.name}>{club.name}</p>
        <div className={styles.bar}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.label}>Se încarcă · {Math.round(progress)}%</p>
      </div>
    </div>
  );
}
