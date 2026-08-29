import { cx } from '../../lib/format';
import styles from './FormPills.module.css';

const cls = { V: styles.win, E: styles.draw, 'Î': styles.loss } as const;
const label = { V: 'victorie', E: 'egal', 'Î': 'înfrângere' } as const;

/** Ultimele rezultate, cel mai recent la dreapta. */
export function FormPills({ form }: { form: ('V' | 'E' | 'Î')[] }) {
  return (
    <ul className={styles.list}>
      {form.map((r, i) => (
        <li
          key={i}
          className={cx(styles.pill, cls[r])}
          style={{ animationDelay: `${i * 70}ms` }}
          title={label[r]}
        >
          <span aria-hidden>{r}</span>
          <span className="sr-only">{label[r]}</span>
        </li>
      ))}
    </ul>
  );
}
