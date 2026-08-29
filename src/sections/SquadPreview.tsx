import { useRef } from 'react';
import { averageAge, squad } from '../data';
import { useReducedMotion } from '../hooks';
import { plural } from '../lib/format';
import { PlayerCard } from '../components/cards';
import { Button } from '../components/ui/Button';
import { ArrowRight, ChevronLeft, ChevronRight } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './SquadPreview.module.css';

/** Jucătorii scoși în față pe pagina principală. */
const spotlight = ['p-3', 'p-12', 'p-13', 'p-8', 'p-1', 'p-11'];

export function SquadPreview() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const players = spotlight
    .map((id) => squad.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('article');
    const step = (card?.clientWidth ?? 300) + 24;
    rail.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section className="section" aria-labelledby="lot-preview">
      <div className="shell">
        <SectionHead
          eyebrow="Lotul"
          serif
          title="Șase pe teren, paisprezece în rotație"
          highlight="paisprezece"
          titleId="lot-preview"
          sub={`${plural(squad.length, 'jucător', 'jucători')} sub contract, vârstă medie ${averageAge()
            .toString()
            .replace('.', ',')} ani.`}
          action={
            <span className={styles.navButtons}>
              <button
                type="button"
                className="round-btn"
                onClick={() => scrollBy(-1)}
                aria-label="Jucătorii anteriori"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className="round-btn"
                onClick={() => scrollBy(1)}
                aria-label="Jucătorii următori"
              >
                <ChevronRight />
              </button>
            </span>
          }
        />
      </div>

      <Reveal className={styles.railWrap}>
        <div className={styles.rail} ref={railRef} tabIndex={0} aria-label="Jucători">
          <div className={styles.track}>
            {players.map((player) => (
              <div className={styles.item} key={player.id}>
                <PlayerCard player={player} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="shell">
        <Reveal className={styles.cta}>
          <Button to="/lot" variant="ghost" magnetic>
            Tot lotul și staff-ul <ArrowRight size={17} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
