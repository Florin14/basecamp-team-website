import { club, competitions, formGuide, nextMatch, useClubData } from '../data';
import {
  useCountUp,
  useFinePointer,
  useParallax,
  useReducedMotion,
  useScramble,
} from '../hooks';
import { formatShortDate, formatTime } from '../lib/format';
import { FormPills } from '../components/cards';
import { Button } from '../components/ui/Button';
import { ArrowRight, Ball, Calendar, Trophy, Users } from '../components/ui/Icon';
import { MeshBackground } from '../components/ui/MeshBackground';
import { Reveal } from '../components/ui/Reveal';
import { SplitText } from '../components/ui/SplitText';
import styles from './Hero.module.css';

function Stat({ label, value }: { label: string; value: number }) {
  const { ref, value: shown } = useCountUp<HTMLElement>(value);
  return (
    <div className={styles.stat}>
      <dd ref={ref} className="tabular">
        {shown.toLocaleString('ro-RO')}
      </dd>
      <dt>{label}</dt>
    </div>
  );
}

export function Hero() {
  const { matches } = useClubData();
  const next = nextMatch(matches);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const decor = fine && !reduced;
  const form = formGuide(5, matches);

  const ballRef = useParallax<HTMLSpanElement>(0.16);
  const crestRef = useParallax<HTMLSpanElement>(-0.1);
  const chipRef = useParallax<HTMLSpanElement>(0.22);
  // Decodarea rulează o singură dată, la încărcare: reluarea la hover clipea urât.
  const { ref: scrambleRef } = useScramble<HTMLSpanElement>(club.motto, { auto: true });

  return (
    <section className={styles.hero}>
      <MeshBackground grid />

      {decor ? (
        <div className={styles.scene} aria-hidden>
          <span ref={ballRef} className={`${styles.float} ${styles.floatBall}`}>
            <span className="floaty">
              <Ball size={64} className="spin-slow" />
            </span>
          </span>
          <span ref={crestRef} className={`${styles.float} ${styles.floatCrest}`}>
            <span className="floaty">
              <img src={club.crest} alt="" width={104} height={104} />
            </span>
          </span>
          <span className={`${styles.float} ${styles.floatDot} breathe`} />
          <span className={`${styles.float} ${styles.floatDot2} breathe`} />
          <span className={`${styles.float} ${styles.floatRing} spin-slow`} />
          {next ? (
            <span ref={chipRef} className={`${styles.float} ${styles.chipWrap}`}>
              <span className={`glass ${styles.chip} floaty`}>
                <span className={styles.chipIcon}>
                  <Calendar size={15} />
                </span>
                <span className={styles.chipText}>
                  <span className={styles.chipLabel}>Următorul meci</span>
                  <span className={styles.chipValue}>
                    {formatShortDate(next.kickoff)} · {formatTime(next.kickoff)}
                  </span>
                </span>
              </span>
            </span>
          ) : null}
          <span className={`${styles.float} ${styles.formChipWrap}`}>
            <span className={`glass ${styles.formChip}`}>
              <span className={styles.formChipLabel}>Ultimele 5</span>
              <FormPills form={form} />
            </span>
          </span>
        </div>
      ) : null}

      <div className={`shell ${styles.inner}`}>
        <Reveal className={`glass ${styles.eyebrow}`} variant="scale">
          <span className="pulse-dot" aria-hidden />
          {club.city} · {competitions.length} competiții · sezonul {club.season}
        </Reveal>

        <h1 className={styles.title}>
          <SplitText text="FC Base" by="char" className={styles.line} />
          <SplitText
            text="Camp"
            by="char"
            delay={260}
            className={`${styles.line} grad--live`}
          />
        </h1>

        <p className={styles.sub}>
          <span ref={scrambleRef} className={styles.scramble}>
            {club.motto}
          </span>
        </p>

        <Reveal as="p" className={styles.subLine} delay={420}>
          Din <strong>{club.city}</strong>, de la{' '}
          <span className={styles.mark}>{club.venue}</span> — lot, program, rezultate și
          clasamente din toate competițiile.
        </Reveal>

        <Reveal className={styles.cta} delay={520}>
          <Button to="/meciuri" magnetic glow>
            <Trophy size={17} /> Meciuri și clasamente
          </Button>
          <Button to="/lot" variant="ghost" magnetic>
            <Users size={16} /> Vezi lotul <ArrowRight size={16} />
          </Button>
        </Reveal>

        <Reveal as="dl" className={styles.stats} delay={620}>
          {club.highlights.map((h) => (
            <Stat key={h.label} label={h.label} value={h.value} />
          ))}
        </Reveal>
      </div>

      <div className={styles.ticker} aria-hidden>
        <div className={styles.tickerTrack}>
          {[...competitions, ...competitions, ...competitions].map((c, i) => (
            <span className={styles.tickerItem} key={`${c.id}-${i}`}>
              <span className={styles.tickerDot} style={{ background: c.accent }} />
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden>
        <span className={styles.mouse}>
          <span />
        </span>
        <span className={styles.hintLabel}>Derulează</span>
      </div>
    </section>
  );
}
