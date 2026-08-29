import { useMemo, useState } from 'react';
import {
  byCompetition,
  club,
  competitions,
  fixtures,
  leagueCompetitions,
  ourRow,
  record,
  results,
  useClubData,
} from '../data';
import type { CompetitionId, Phase } from '../data';
import { useDocumentTitle } from '../hooks';
import { cx, plural } from '../lib/format';
import { PageHeader } from '../components/layout';
import { MatchCard, PhaseSwitcher, StandingsTable } from '../components/cards';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './MatchesPage.module.css';

type Tab = 'program' | 'rezultate' | 'clasamente';
type Filter = CompetitionId | 'toate';

const tabs: { id: Tab; label: string }[] = [
  { id: 'program', label: 'Program' },
  { id: 'rezultate', label: 'Rezultate' },
  { id: 'clasamente', label: 'Clasamente' },
];

export function MatchesPage() {
  useDocumentTitle(
    `Meciuri și clasamente — ${club.name}`,
    'Programul, rezultatele și clasamentele FC Base Camp din AJM Cluj, ATS Cluj și turneele naționale.',
  );
  const { matches, standings, source, updatedAt } = useClubData();
  const [tab, setTab] = useState<Tab>('program');
  const [filter, setFilter] = useState<Filter>('toate');
  const [phases, setPhases] = useState<Partial<Record<CompetitionId, Phase>>>({});

  const pool = useMemo(
    () => (filter === 'toate' ? matches : byCompetition(filter, matches)),
    [filter, matches],
  );
  const upcoming = fixtures(pool);
  const past = results(pool);
  const tally = useMemo(() => record(matches), [matches]);
  const leagues = leagueCompetitions();

  return (
    <>
      <PageHeader
        eyebrow={`${club.sport} · sezonul ${club.season}`}
        title="Meciuri și clasamente"
        sub={`${plural(tally.played, 'meci jucat', 'meciuri jucate')} în ${plural(
          competitions.length,
          'competiție',
          'competiții',
        )}: ${plural(tally.won, 'victorie', 'victorii')}, ${plural(
          tally.drawn,
          'egal',
          'egaluri',
        )}, ${plural(tally.lost, 'înfrângere', 'înfrângeri')}. Golaveraj ${tally.scored}:${tally.conceded}.`}
      >
        {source === 'remote' && updatedAt ? (
          <p className={styles.updated}>
            <span className="pulse-dot" aria-hidden /> Date actualizate automat ·{' '}
            {new Date(updatedAt).toLocaleString('ro-RO', {
              day: 'numeric',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        ) : null}

        <div className={styles.tabs} role="tablist" aria-label="Secțiuni">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              className={cx(styles.tab, tab === t.id && styles.tabActive)}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="section" aria-label="Meciuri">
        <div className="shell">
          {tab !== 'clasamente' ? (
            <Reveal className={styles.filters} stagger={60} pop>
              <button
                type="button"
                className={cx(styles.filter, filter === 'toate' && styles.filterActive)}
                onClick={() => setFilter('toate')}
                aria-pressed={filter === 'toate'}
              >
                Toate competițiile
              </button>
              {competitions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={cx(styles.filter, filter === c.id && styles.filterActive)}
                  style={{ '--accent': c.accent } as React.CSSProperties}
                  onClick={() => setFilter(c.id)}
                  aria-pressed={filter === c.id}
                >
                  <span className={styles.filterDot} aria-hidden />
                  {c.short}
                </button>
              ))}
            </Reveal>
          ) : null}

          {tab === 'program' ? (
            <div id="panel-program" role="tabpanel" aria-labelledby="tab-program">
              {upcoming.length ? (
                <Reveal key={filter} className={styles.grid} stagger={90}>
                  {upcoming.map((m) => (
                    <MatchCard key={m.id} match={m} />
                  ))}
                </Reveal>
              ) : (
                <p className={styles.empty}>Nu există meciuri programate pentru acest filtru.</p>
              )}
            </div>
          ) : null}

          {tab === 'rezultate' ? (
            <div id="panel-rezultate" role="tabpanel" aria-labelledby="tab-rezultate">
              {past.length ? (
                <Reveal key={filter} className={styles.grid} stagger={90}>
                  {past.map((m) => (
                    <MatchCard key={m.id} match={m} />
                  ))}
                </Reveal>
              ) : (
                <p className={styles.empty}>Nu există rezultate pentru acest filtru.</p>
              )}
            </div>
          ) : null}

          {tab === 'clasamente' ? (
            <div id="panel-clasamente" role="tabpanel" aria-labelledby="tab-clasamente">
              {leagues.map((competition, i) => {
                const phase = phases[competition.id] ?? 'regular';
                const row = ourRow(competition.id, phase, standings);
                const played = record(byCompetition(competition.id, matches));
                return (
                  <div key={competition.id} className={styles.league}>
                    <SectionHead
                      eyebrow={competition.format}
                      title={competition.name}
                      highlight={competition.short.split(' ').slice(-1)[0]}
                      sub={
                        row
                          ? `Locul ${row.position} după ${plural(
                              row.played,
                              'etapă',
                              'etape',
                            )} — ${row.points} puncte, golaveraj ${played.scored}:${played.conceded}.`
                          : competition.scope
                      }
                      action={
                        <PhaseSwitcher
                          competition={competition.id}
                          value={phase}
                          accent={competition.accent}
                          onChange={(next) =>
                            setPhases((current) => ({ ...current, [competition.id]: next }))
                          }
                        />
                      }
                    />
                    <Reveal delay={i * 60}>
                      <StandingsTable competition={competition.id} phase={phase} />
                    </Reveal>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
