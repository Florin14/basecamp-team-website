import { useState } from 'react';
import {
  competitionById,
  fixtures,
  leagueCompetitions,
  results,
  useClubData,
} from '../data';
import type { CompetitionId, Phase } from '../data';
import { cx } from '../lib/format';
import { MatchCard, PhaseSwitcher, StandingsTable } from '../components/cards';
import { Button } from '../components/ui/Button';
import { ArrowRight } from '../components/ui/Icon';
import { MeshBackground } from '../components/ui/MeshBackground';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './ResultsAndStandings.module.css';

export function ResultsAndStandings() {
  const { matches } = useClubData();
  const leagues = leagueCompetitions();
  const [active, setActive] = useState<CompetitionId>(leagues[0].id);
  const [phase, setPhase] = useState<Phase>('regular');
  const recent = results(matches).slice(0, 2);
  const upcoming = fixtures(matches).slice(0, 1);
  const meta = competitionById(active);

  const selectCompetition = (id: CompetitionId) => {
    setActive(id);
    setPhase('regular');
  };

  return (
    <section className="section" aria-labelledby="rezultate">
      <MeshBackground soft />
      <div className={`shell ${styles.shell}`}>
        <SectionHead
          eyebrow="Rezultate și clasamente"
          title="Cum stăm în fiecare competiție"
          highlight="fiecare"
          titleId="rezultate"
          sub="Ultimele meciuri din toate competițiile și clasamentul din campionatul pe care îl alegi."
          action={
            <Button to="/meciuri" variant="ghost" size="sm">
              Toate meciurile <ArrowRight size={15} />
            </Button>
          }
        />

        <div className={styles.grid}>
          <Reveal className={styles.matches} stagger={110}>
            {[...upcoming, ...recent].map((match) => (
              <MatchCard key={match.id} match={match} compact />
            ))}
          </Reveal>

          <Reveal className={styles.table} variant="fade-left" delay={120}>
            <div className={styles.tableSticky}>
              <div className={styles.switcher} role="group" aria-label="Alege competiția">
                {leagues.map((competition) => (
                  <button
                    key={competition.id}
                    type="button"
                    className={cx(styles.switch, active === competition.id && styles.switchActive)}
                    style={{ '--accent': competition.accent } as React.CSSProperties}
                    onClick={() => selectCompetition(competition.id)}
                    aria-pressed={active === competition.id}
                  >
                    {competition.short}
                  </button>
                ))}
              </div>

              <div className={styles.tableMetaRow}>
                <p className={styles.tableMeta}>
                  {meta.name} · {meta.scope}
                </p>
                <PhaseSwitcher
                  competition={active}
                  value={phase}
                  onChange={setPhase}
                  accent={meta.accent}
                />
              </div>

              <StandingsTable key={`${active}-${phase}`} competition={active} phase={phase} limit={6} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
