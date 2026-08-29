import type { ReactNode } from 'react';
import { cx } from '../../lib/format';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import styles from './SectionHead.module.css';

type Props = {
  eyebrow: string;
  /** Titlul secțiunii, animat cuvânt cu cuvânt. */
  title: string;
  /** Sub-șir din titlu care primește gradientul animat. */
  highlight?: string;
  titleId?: string;
  sub?: ReactNode;
  /** Acțiune afișată în dreapta (link „vezi toate”, butoane de navigare). */
  action?: ReactNode;
  light?: boolean;
  /** Titlu cu serif editorial, pentru secțiunile de prezentare. */
  serif?: boolean;
};

export function SectionHead({
  eyebrow,
  title,
  highlight,
  titleId,
  sub,
  action,
  light,
  serif,
}: Props) {
  return (
    <div className={cx(styles.head, action && styles.row)}>
      <div className={styles.text}>
        <Reveal as="p" className={cx('eyebrow', light && 'eyebrow--light', styles.eyebrow)}>
          <span className={styles.dash} aria-hidden />
          {eyebrow}
        </Reveal>
        <SplitText
          as="h2"
          id={titleId}
          text={title}
          highlight={highlight}
          className={cx('h2', styles.title, serif && 'editorial', serif && styles.serif, light && styles.titleLight)}
        />
        {sub ? (
          <Reveal as="p" className={cx('lead', styles.sub)} delay={160}>
            {sub}
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal className={styles.action} variant="fade-left" delay={220}>
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
