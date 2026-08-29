import { useEffect, useRef, useState } from 'react';
import { competitionById, isHome, lastMatch, nextMatch, outcome, useClubData } from '../data';
import { useCountdown } from '../hooks';
import { cx, formatKickoff } from '../lib/format';
import { Button } from '../components/ui/Button';
import { ArrowRight, Pin, Trophy } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import styles from './NextMatch.module.css';

const units = ['zile', 'ore', 'minute', 'secunde'] as const;
const pad = (n: number) => String(n).padStart(2, '0');

/** Cifră care alunecă în sus la fiecare schimbare de valoare. */
function Flip({ value }: { value: string }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState<string | null>(null);
  const timer = useRef<number>();

  useEffect(() => {
    if (value === current) return;
    setPrevious(current);
    setCurrent(value);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPrevious(null), 420);
    return () => window.clearTimeout(timer.current);
  }, [value, current]);

  return (
    <span className={styles.flip}>
      {previous !== null ? <span className={styles.flipOut}>{previous}</span> : null}
      <span className={previous !== null ? styles.flipIn : undefined}>{current}</span>
    </span>
  );
}

export function NextMatch() {
  const { matches } = useClubData();
  const match = nextMatch(matches);
  const previous = lastMatch(matches);
  const countdown = useCountdown(match?.kickoff ?? new Date());

  if (!match) return null;

  const competition = competitionById(match.competition);
  const home = isHome(match);
  const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds];
  const prevResult = previous ? outcome(previous) : null;

  return (
    <section className={styles.section} aria-labelledby="urmatorul-meci">
      <span className={styles.orb} aria-hidden />
      <span className={styles.orb2} aria-hidden />

      <div className={`shell ${styles.inner}`}>
        <Reveal className={styles.main} variant="fade-right">
          <p className={styles.kicker}>
            <span className="pulse-dot" aria-hidden /> Următorul meci
            <span className={styles.kickerSep} aria-hidden />
            <span className={styles.kickerComp}>
              <Trophy size={13} /> {competition.short} · {match.round}
            </span>
          </p>

          <h2 id="urmatorul-meci" className={styles.fixture}>
            <span className={styles.side}>{match.home.short === 'BSC' ? 'Base Camp' : match.home.name}</span>
            <span className={styles.vs}>vs</span>
            <span className={styles.side}>{match.away.short === 'BSC' ? 'Base Camp' : match.away.name}</span>
          </h2>

          <p className={styles.when}>{formatKickoff(match.kickoff)}</p>
          <p className={styles.where}>
            <Pin size={16} /> {match.venue} · {home ? 'meci acasă' : 'deplasare'}
          </p>

          <div className={styles.actions}>
            <Button to="/meciuri" variant="light" magnetic>
              Programul complet <ArrowRight size={16} />
            </Button>
            <Button to="/lot" variant="outline-light">
              Lotul pentru meci
            </Button>
          </div>
        </Reveal>

        <Reveal className={styles.side2} variant="fade-left" delay={120}>
          <div className={styles.countdown}>
            {values.map((v, i) => (
              <div key={units[i]} className={styles.unit}>
                <span className={cx(styles.value, 'tabular')}>
                  <Flip value={pad(v)} />
                </span>
                <span className={styles.unitLabel}>{units[i]}</span>
              </div>
            ))}
          </div>

          {previous && prevResult ? (
            <div className={styles.previous}>
              <p className={styles.previousLabel}>Ultimul rezultat</p>
              <p className={styles.previousScore}>
                <span>{previous.home.short}</span>
                <strong className="tabular">
                  {previous.score!.home}–{previous.score!.away}
                </strong>
                <span>{previous.away.short}</span>
              </p>
              <p className={styles.previousMeta}>
                {competitionById(previous.competition).short} · {previous.round}
              </p>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
