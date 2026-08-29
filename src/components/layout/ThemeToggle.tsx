import type { Theme } from '../../hooks';
import { Moon, Sun } from '../ui/Icon';
import styles from './ThemeToggle.module.css';

type Props = { theme: Theme; onToggle: () => void };

export function ThemeToggle({ theme, onToggle }: Props) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Comută pe tema deschisă' : 'Comută pe tema întunecată'}
      title={dark ? 'Temă deschisă' : 'Temă întunecată'}
    >
      <span className={styles.track}>
        <span className={styles.thumb}>
          <Sun className={styles.sun} />
          <Moon className={styles.moon} />
        </span>
      </span>
    </button>
  );
}
