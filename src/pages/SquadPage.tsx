import { useMemo, useState } from 'react';
import {
  averageAge,
  club,
  groupByPosition,
  positionLabels,
  positionOrder,
  squad,
  staff,
  topScorers,
} from '../data';
import type { Position } from '../data';
import { useDocumentTitle } from '../hooks';
import { cx, plural } from '../lib/format';
import { PageHeader } from '../components/layout';
import { PlayerCard, StaffCard } from '../components/cards';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './SquadPage.module.css';

type Filter = 'Toți' | Position;
const filters: Filter[] = ['Toți', ...positionOrder];

export function SquadPage() {
  useDocumentTitle(
    `Lot și staff — ${club.name}`,
    'Lotul de jucători și staff-ul tehnic AFC Vulturii Albaștri pentru sezonul curent.',
  );
  const [filter, setFilter] = useState<Filter>('Toți');

  const groups = useMemo(() => {
    const all = groupByPosition(squad);
    return filter === 'Toți' ? all : all.filter((g) => g.position === filter);
  }, [filter]);

  const avgAge = useMemo(() => averageAge().toString().replace('.', ','), []);

  const counts = useMemo(
    () => ({
      total: squad.length,
      goals: squad.reduce((s, p) => s + p.stats.goals, 0),
      foreign: squad.filter((p) => p.nationality !== 'România').length,
    }),
    [],
  );

  return (
    <>
      <PageHeader
        eyebrow={`Sezonul ${club.season}`}
        title="Lotul și staff-ul"
        sub={`${plural(counts.total, 'jucător', 'jucători')} sub contract, vârstă medie ${avgAge} ani, ${plural(
          counts.foreign,
          'jucător străin',
          'jucători străini',
        )}.`}
      >
        <div className={styles.filters} role="group" aria-label="Filtrează după post">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={cx(styles.filter, filter === f && styles.filterActive)}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f === 'Toți' ? 'Toți' : positionLabels[f]}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="section section--tight" aria-labelledby="golgheteri">
        <div className="shell">
          <SectionHead
            eyebrow="Golgheteri"
            title="Cine marchează pentru Base Camp"
            highlight="marchează"
            titleId="golgheteri"
            sub="Total goluri în tricoul clubului, în toate competițiile."
          />
          <Reveal className={styles.scorers} stagger={90}>
            {topScorers(5).map((player, i) => (
              <article key={player.id} className={cx('panel', styles.scorer)}>
                <span className={styles.rank}>{i + 1}</span>
                <img src={player.photo} alt="" width={48} height={48} />
                <div className={styles.scorerBody}>
                  <p className={styles.scorerName}>{player.name}</p>
                  <p className={styles.scorerMeta}>
                    {player.position} · {player.stats.appearances} meciuri
                  </p>
                </div>
                <p className={cx(styles.scorerGoals, 'tabular')}>
                  {player.stats.goals}
                  <span>goluri</span>
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-label="Jucători">
        <div className="shell">
          {groups.map((group) =>
            group.players.length ? (
              <div key={group.position} className={styles.group}>
                <h2 className={styles.groupTitle}>
                  {group.label}
                  <span className={styles.groupCount}>{group.players.length}</span>
                </h2>
                <Reveal className={styles.grid} stagger={80}>
                  {group.players.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </Reveal>
              </div>
            ) : null,
          )}
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="staff">
        <div className="shell">
          <SectionHead
            eyebrow="Staff"
            title="Oamenii de pe margine"
            highlight="margine"
            titleId="staff"
            sub="Patru oameni care pregătesc echipa pentru trei meciuri pe săptămână."
          />
          <Reveal className={styles.staffGrid} stagger={90}>
            {staff.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
