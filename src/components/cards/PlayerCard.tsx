import { ageOf } from '../../data';
import type { Player } from '../../data';
import { useTilt } from '../../hooks';
import styles from './PlayerCard.module.css';

export function PlayerCard({ player }: { player: Player }) {
  const ref = useTilt<HTMLElement>({ max: 8, lift: 12 });

  return (
    <article ref={ref} className={`panel sheen ${styles.card}`} data-cursor="card">
      <span className={styles.number} aria-hidden>
        {player.number}
      </span>
      <span className={styles.ring} aria-hidden />
      {player.captain ? <span className={styles.captain}>Căpitan</span> : null}

      <div className={styles.media}>
        <img src={player.photo} alt={player.name} width={220} height={260} loading="lazy" />
      </div>

      <div className={styles.body}>
        <p className={styles.position}>{player.position}</p>
        <h3 className={styles.name}>{player.name}</h3>
        <p className={styles.meta}>
          {ageOf(player.birthDate)} ani · {player.heightCm} cm · {player.nationality}
        </p>

        <dl className={styles.stats}>
          {/* <div>
            <dt>Meciuri</dt>
            <dd className="tabular">{player.stats.appearances}</dd>
          </div> */}
          <div>
            <dt>Goluri</dt>
            <dd className="tabular">{player.stats.goals}</dd>
          </div>
          <div>
            <dt>Pase D.</dt>
            <dd className="tabular">{player.stats.assists}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
