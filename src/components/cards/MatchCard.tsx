import { competitionById, isHome, outcome } from '../../data';
import type { Match } from '../../data';
import { useCountUp, useTilt } from '../../hooks';
import { capitalize, cx, formatShortDate, formatTime, formatWeekday } from '../../lib/format';
import { Pin } from '../ui/Icon';
import styles from './MatchCard.module.css';

const outcomeLabel = { V: 'Victorie', E: 'Egal', 'Î': 'Înfrângere' } as const;
const outcomeClass = { V: styles.badgeWin, E: styles.badgeDraw, 'Î': styles.badgeLoss } as const;

/** Cifră de scor care urcă de la 0 când cardul intră în viewport. */
function ScoreDigit({ value }: { value: number }) {
  const { ref, value: shown } = useCountUp<HTMLSpanElement>(value, 900);
  return (
    <span ref={ref} className={styles.digit}>
      {shown}
    </span>
  );
}

export function MatchCard({ match, compact = false }: { match: Match; compact?: boolean }) {
  const ref = useTilt<HTMLElement>({ max: compact ? 4 : 6, lift: 8 });
  const competition = competitionById(match.competition);
  const played = match.score !== undefined;
  const res = outcome(match);
  const home = isHome(match);

  return (
    <article
      ref={ref}
      className={cx('panel', 'sheen', styles.card, compact && styles.compact, played && styles.played)}
      style={{ '--accent': competition.accent } as React.CSSProperties}
      data-cursor="card"
    >
      <header className={styles.head}>
        <span className={styles.competition}>{competition.short}</span>
        <span className={styles.round}>{match.round}</span>
        {res ? (
          <span className={cx(styles.badge, outcomeClass[res])}>{outcomeLabel[res]}</span>
        ) : (
          <span className={cx(styles.badge, styles.badgeNext)}>{home ? 'Acasă' : 'Deplasare'}</span>
        )}
      </header>

      <div className={styles.teams}>
        <div className={styles.team}>
          <img src={match.home.crest} alt="" width={44} height={44} loading="lazy" />
          <span className={styles.teamName}>{match.home.name}</span>
        </div>

        <div className={styles.middle}>
          {played ? (
            <p className={cx(styles.score, 'tabular')}>
              <ScoreDigit value={match.score!.home} />
              <span className={styles.dash}>–</span>
              <ScoreDigit value={match.score!.away} />
            </p>
          ) : (
            <>
              <p className={cx(styles.time, 'tabular')}>{formatTime(match.kickoff)}</p>
              <p className={styles.day}>
                {capitalize(formatWeekday(match.kickoff))}, {formatShortDate(match.kickoff)}
              </p>
            </>
          )}
        </div>

        <div className={styles.team}>
          <img src={match.away.crest} alt="" width={44} height={44} loading="lazy" />
          <span className={styles.teamName}>{match.away.name}</span>
        </div>
      </div>

      <footer className={styles.foot}>
        <p className={styles.venue}>
          <Pin size={15} /> {match.venue}
        </p>
        {played && match.report ? <p className={styles.report}>{match.report}</p> : null}
      </footer>
    </article>
  );
}
