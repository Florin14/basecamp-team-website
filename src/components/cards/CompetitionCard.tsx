import { Link } from 'react-router-dom';
import { byCompetition, ourRow, record, useClubData } from '../../data';
import type { Competition } from '../../data';
import { useCountUp, useTilt } from '../../hooks';
import { cx } from '../../lib/format';
import { FormPills } from './FormPills';
import { ArrowRight, Trophy } from '../ui/Icon';
import styles from './CompetitionCard.module.css';

function Stat({ label, value }: { label: string; value: number }) {
  const { ref, value: shown } = useCountUp<HTMLSpanElement>(value, 1100);
  return (
    <div className={styles.stat}>
      <span ref={ref} className={cx(styles.statValue, 'tabular')}>
        {shown}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export function CompetitionCard({ competition }: { competition: Competition }) {
  const ref = useTilt<HTMLElement>({ max: 6, lift: 10 });
  const { matches, standings } = useClubData();
  const tally = record(byCompetition(competition.id, matches));
  const row = ourRow(competition.id, 'regular', standings);

  return (
    <article
      ref={ref}
      className={cx('panel', 'sheen', styles.card)}
      style={{ '--accent': competition.accent } as React.CSSProperties}
      data-cursor="card"
    >
      <span className={styles.glow} aria-hidden />

      <header className={styles.head}>
        <span className={styles.format}>{competition.format}</span>
        {row ? (
          <span className={styles.position}>
            <Trophy size={14} /> locul {row.position}
          </span>
        ) : (
          <span className={styles.position}>{competition.scope.split(',')[0]}</span>
        )}
      </header>

      <h3 className={styles.name}>{competition.short}</h3>
      <p className={styles.scope}>{competition.scope}</p>

      <div className={styles.stats}>
        <Stat label="jucate" value={tally.played} />
        <Stat label="victorii" value={tally.won} />
        <Stat label="marcate" value={tally.scored} />
      </div>

      {row ? (
        <div className={styles.form}>
          <span className={styles.formLabel}>Formă</span>
          <FormPills form={row.form} />
        </div>
      ) : null}

      <p className={styles.goal}>
        <span>Obiectiv</span> {competition.goal}
      </p>

      <Link to="/meciuri" className={cx('link-arrow', styles.link)}>
        Meciuri și clasament <ArrowRight size={15} />
      </Link>
    </article>
  );
}
