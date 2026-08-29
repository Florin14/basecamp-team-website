import type { ReactNode } from 'react';
import { MeshBackground } from '../ui/MeshBackground';
import { Reveal } from '../ui/Reveal';
import styles from './PageHeader.module.css';

type Props = {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  /** Conținut sub titlu: filtre, statistici, acțiuni. */
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, sub, children }: Props) {
  return (
    <header className={styles.header}>
      <MeshBackground soft grid />
      <div className="shell">
        <div className={styles.inner}>
          <Reveal>
            <p className="eyebrow">
              <span className={styles.dash} aria-hidden />
              {eyebrow}
            </p>
            <h1 className={styles.title}>{title}</h1>
            {sub ? <p className={`lead ${styles.sub}`}>{sub}</p> : null}
          </Reveal>
          {children ? (
            <Reveal className={styles.extra} delay={100}>
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}
