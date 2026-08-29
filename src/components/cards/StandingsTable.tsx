import {
  club,
  competitionById,
  goalDiff,
  standingsFor,
  useClubData,
  zoneLegend,
  zoneOf,
} from '../../data';
import type { CompetitionId, Phase } from '../../data';
import { useInView } from '../../hooks';
import { cx, signed } from '../../lib/format';
import { FormPills } from './FormPills';
import styles from './StandingsTable.module.css';

type Props = {
  competition: CompetitionId;
  /** Faza afișată; implicit sezonul regulat. */
  phase?: Phase;
  /** Afișează doar primele N echipe (plus rândul clubului, dacă e în afara listei). */
  limit?: number;
  /** Ascunde coloanele secundare. */
  compact?: boolean;
};

export function StandingsTable({ competition, phase = 'regular', limit, compact }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { standings } = useClubData();
  const table = standingsFor(competition, phase, standings);
  const meta = competitionById(competition);
  const rows = limit ? table.slice(0, limit) : table;
  const usRow = table.find((r) => r.team === club.name);
  const usVisible = rows.some((r) => r.team === club.name);
  const shown = !usVisible && usRow ? [...rows, usRow] : rows;
  const maxPoints = Math.max(1, ...table.map((r) => r.points));

  if (!table.length) {
    const note = meta.phases.find((p) => p.id === phase)?.note;
    return (
      <div ref={ref} className={cx(styles.wrap, styles.empty)}>
        <p className={styles.emptyTitle}>Faza nu a început încă</p>
        {note ? <p className={styles.emptyNote}>{note}</p> : null}
      </div>
    );
  }

  return (
    <div ref={ref} className={cx(styles.wrap, compact && styles.compactWrap, inView && styles.in)}>
      <table className={styles.table}>
        <caption className="sr-only">
          Clasament {meta.name}, sezonul {meta.season}
        </caption>
        <thead>
          <tr>
            <th scope="col" className={styles.pos}>
              #
            </th>
            <th scope="col" className={styles.club}>
              Echipă
            </th>
            <th scope="col">M</th>
            <th scope="col" className={styles.hideSm}>
              V
            </th>
            <th scope="col" className={styles.hideSm}>
              E
            </th>
            <th scope="col" className={styles.hideSm}>
              Î
            </th>
            <th scope="col" className={styles.hideMd}>
              GM:GP
            </th>
            <th scope="col">GD</th>
            <th scope="col" className={styles.pts}>
              P
            </th>
            {!compact ? (
              <th scope="col" className={styles.hideMd}>
                Formă
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {shown.map((row, i) => {
            const zone = zoneOf(competition, row.position, phase, standings);
            const ours = row.team === club.name;
            return (
              <tr
                key={row.position}
                style={{ animationDelay: `${i * 55}ms` }}
                className={cx(
                  styles.row,
                  ours && styles.ours,
                  zone && styles[zone],
                  !usVisible && ours && styles.detached,
                )}
              >
                <td className={cx(styles.pos, 'tabular')}>{row.position}</td>
                <th scope="row" className={styles.club}>
                  <span className={styles.short}>{row.short}</span>
                  <span className={styles.name}>{row.team}</span>
                </th>
                <td className="tabular">{row.played}</td>
                <td className={cx(styles.hideSm, 'tabular')}>{row.won}</td>
                <td className={cx(styles.hideSm, 'tabular')}>{row.drawn}</td>
                <td className={cx(styles.hideSm, 'tabular')}>{row.lost}</td>
                <td className={cx(styles.hideMd, 'tabular')}>
                  {row.goalsFor}:{row.goalsAgainst}
                </td>
                <td className="tabular">{signed(goalDiff(row))}</td>
                <td className={cx(styles.pts, 'tabular')}>
                  <span className={styles.ptsValue}>{row.points}</span>
                  <span
                    className={styles.ptsBar}
                    style={{ '--fill': `${(row.points / maxPoints) * 100}%` } as React.CSSProperties}
                    aria-hidden
                  />
                </td>
                {!compact ? (
                  <td className={styles.hideMd}>{inView ? <FormPills form={row.form} /> : null}</td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ul className={styles.legend}>
        {zoneLegend(competition, phase).map((entry) => (
          <li key={entry.zone}>
            <span className={cx(styles.key, styles[`key-${entry.zone}`])} /> {entry.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
