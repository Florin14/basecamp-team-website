import { club, competitions, record, useClubData } from '../data';
import { useCountUp } from '../hooks';
import { cx, pluralWord } from '../lib/format';
import { CompetitionCard } from '../components/cards';
import { MeshBackground } from '../components/ui/MeshBackground';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './Competitions.module.css';

const squadSize = club.highlights.find((h) => h.label === 'Jucători în lot')?.value ?? 14;

function BigStat({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const { ref, value: shown } = useCountUp<HTMLParagraphElement>(value, 1400);
  return (
    <div className={styles.bigStat}>
      <p ref={ref} className={cx(styles.bigValue, 'tabular')}>
        {shown}
        {suffix}
      </p>
      <p className={styles.bigLabel}>{label}</p>
    </div>
  );
}

export function Competitions() {
  const { matches } = useClubData();
  const tally = record(matches);

  return (
    <section className="section section--soft" id="competitii" aria-labelledby="competitii-title">
      <MeshBackground soft />
      <div className={`shell ${styles.shell}`}>
        <SectionHead
          eyebrow="Competiții"
          title="Patru competiții în același sezon"
          highlight="Patru"
          titleId="competitii-title"
          sub={`Liga Națională, Cupa României, campionatul județean și liga corporate — până la trei meciuri pe săptămână pentru un lot de ${squadSize} jucători.`}
        />

        <Reveal className={styles.summary} stagger={110}>
          <BigStat
            value={tally.played}
            label={pluralWord(tally.played, 'meci jucat', 'meciuri jucate')}
          />
          <BigStat value={tally.won} label={pluralWord(tally.won, 'victorie', 'victorii')} />
          <BigStat value={tally.scored} label="goluri marcate" />
          <BigStat value={competitions.length} label="competiții active" />
        </Reveal>

        <div className={styles.grid}>
          {competitions.map((competition, i) => (
            <Reveal key={competition.id} variant="blur" delay={i * 90} className={styles.item}>
              <CompetitionCard competition={competition} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
