import type { ElementType } from 'react';
import { useInView } from '../../hooks';
import { cx } from '../../lib/format';
import styles from './SplitText.module.css';

type Props = {
  text: string;
  as?: ElementType;
  /** Animă literă cu literă (titluri scurte) sau cuvânt cu cuvânt. */
  by?: 'char' | 'word';
  /** Întârzierea între unități, în ms. */
  step?: number;
  delay?: number;
  /** Sub-șir din `text` care primește gradientul animat. */
  highlight?: string;
  className?: string;
  id?: string;
};

/**
 * Titlu care se ridică din linia de bază, unitate cu unitate,
 * când intră în viewport.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  by = 'word',
  step = by === 'char' ? 26 : 60,
  delay = 0,
  highlight,
  className,
  id,
}: Props) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.25 });
  const words = text.split(' ');
  const highlighted = new Set<number>();
  if (highlight) {
    const parts = highlight.split(' ');
    const start = words.findIndex((_, i) => parts.every((p, k) => words[i + k] === p));
    if (start >= 0) parts.forEach((_, k) => highlighted.add(start + k));
  }
  let index = 0;

  return (
    <Tag ref={ref} id={id} className={cx(styles.split, inView && styles.in, className)}>
      {words.map((word, w) => (
        <span className={styles.word} key={`${word}-${w}`}>
          <span className={styles.mask}>
            {by === 'word' ? (
              <span
                className={cx(styles.unit, highlighted.has(w) && 'grad--live')}
                style={{ transitionDelay: `${delay + w * step}ms` }}
              >
                {word}
              </span>
            ) : (
              [...word].map((char, c) => (
                <span
                  className={cx(styles.unit, highlighted.has(w) && 'grad--live')}
                  key={`${char}-${c}`}
                  style={{ transitionDelay: `${delay + index++ * step}ms` }}
                >
                  {char}
                </span>
              ))
            )}
          </span>
          {w < words.length - 1 ? <span className={styles.space}> </span> : null}
        </span>
      ))}
    </Tag>
  );
}
