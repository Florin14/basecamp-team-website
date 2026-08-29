import { competitionById } from '../../data';
import type { CompetitionId, Phase } from '../../data';
import { cx } from '../../lib/format';
import styles from './PhaseSwitcher.module.css';

type Props = {
  competition: CompetitionId;
  value: Phase;
  onChange: (phase: Phase) => void;
  accent?: string;
};

/** Sezon regulat / play-off / play-out, pentru campionatele cu faze. */
export function PhaseSwitcher({ competition, value, onChange, accent }: Props) {
  const phases = competitionById(competition).phases;
  if (phases.length < 2) return null;

  return (
    <div
      className={styles.wrap}
      role="group"
      aria-label="Alege faza campionatului"
      style={accent ? ({ '--accent': accent } as React.CSSProperties) : undefined}
    >
      {phases.map((phase) => (
        <button
          key={phase.id}
          type="button"
          className={cx(styles.phase, value === phase.id && styles.active)}
          onClick={() => onChange(phase.id)}
          aria-pressed={value === phase.id}
          title={phase.note}
        >
          {phase.label}
        </button>
      ))}
    </div>
  );
}
