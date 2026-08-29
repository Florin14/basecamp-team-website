import { club, competitions, record, staff, useClubData } from '../data';
import { useInView, useParallax } from '../hooks';
import { cx } from '../lib/format';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import { Button } from '../components/ui/Button';
import { ArrowRight, Trophy, Users } from '../components/ui/Icon';
import styles from './ClubIntro.module.css';

/** Statistici de sezon afișate ca bare de progres. */
const seasonMeters = [
  { label: 'Posesie medie', value: 58, display: '58%' },
  { label: 'Precizia paselor', value: 81, display: '81%' },
  { label: 'Meciuri fără înfrângere', value: 88, display: '7 din 8' },
  { label: 'Goluri marcate acasă', value: 72, display: '72%' },
];

export function ClubIntro() {
  const head = staff[0];
  const { matches } = useClubData();
  const tally = record(matches);
  const visualRef = useParallax<HTMLDivElement>(0.07);
  const { ref: metersRef, inView: metersIn } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const { ref: lineRef, inView: lineIn } = useInView<HTMLDivElement>({ threshold: 0.2 });

  const facts = [
    { k: 'Înființat', v: `${club.founded} · ${club.city}` },
    { k: 'Teren propriu', v: `${club.venue} — ${club.venueDetail}` },
    { k: 'Competiții', v: competitions.map((c) => c.short).join(' · ') },
    { k: 'Bilanț sezon', v: `${tally.won}V · ${tally.drawn}E · ${tally.lost}Î` },
  ];

  return (
    <section className="section" aria-labelledby="despre-club">
      <div className="shell">
        <SectionHead
          eyebrow="Despre club"
          title="Un club de minifotbal construit pe rotație"
          highlight="minifotbal"
          titleId="despre-club"
          sub={club.description}
        />

        <div className={styles.grid}>
          <Reveal className={styles.visual} variant="clip">
            <div ref={visualRef} className={styles.frame}>
              <img src="/img/stadium.svg" alt={`${club.venue}, terenul echipei`} />
              <div className={`glass ${styles.overlay}`}>
                <p className={styles.overlayKey}>Terenul nostru</p>
                <p className={styles.overlayValue}>
                  {club.venue} · {club.venueDetail}
                </p>
              </div>
              <span className={styles.frameGlow} aria-hidden />
            </div>
            <span className={styles.halo} aria-hidden />
          </Reveal>

          <div ref={lineRef} className={styles.body}>
            <svg
              className={cx(styles.drawLine, lineIn && styles.drawLineIn)}
              viewBox="0 0 4 340"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M2 0 V340" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" />
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--blue-600)" />
                  <stop offset="1" stopColor="var(--blue-400)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>

            <Reveal variant="fade-left">
              <p className={styles.para}>
                FC Base Camp a pornit în 2016 dintr-un grup de opt oameni care jucau un
                campionat județean. Zece ani mai târziu, clubul are 14 jucători sub contract și
                joacă în patru competiții simultan.
              </p>
              <p className={styles.para}>
                La minifotbal, cu reprize scurte și schimbări nelimitate, rotația contează mai
                mult decât un prim șase foarte bun. De asta ne antrenăm de trei ori pe săptămână,
                cu toți jucătorii din lot.
              </p>

              <ul className={styles.facts}>
                {facts.map((f, i) => (
                  <li key={f.k} style={{ transitionDelay: `${i * 80}ms` }}>
                    <strong>{f.k}</strong>
                    <span>{f.v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div ref={metersRef} className={styles.meters}>
              {seasonMeters.map((m, i) => (
                <div key={m.label} className={styles.meter}>
                  <span className={styles.meterLabel}>{m.label}</span>
                  <span className={styles.meterNum}>{m.display}</span>
                  <span className={styles.track}>
                    <i
                      style={{
                        width: metersIn ? `${m.value}%` : 0,
                        transitionDelay: `${i * 120}ms`,
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            <Reveal className={styles.coach} variant="fade-left" delay={200}>
              <img src={head.photo} alt="" width={56} height={56} />
              <div>
                <p className={styles.coachRole}>
                  <Trophy size={15} /> {head.role}
                </p>
                <p className={styles.coachName}>{head.name}</p>
              </div>
              <Button to="/lot" variant="ghost" size="sm">
                <Users size={16} /> Staff <ArrowRight size={15} />
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
