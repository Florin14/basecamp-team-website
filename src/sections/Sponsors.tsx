import { mainSponsor, sponsors } from '../data';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './Sponsors.module.css';

export function Sponsors() {
  const marquee = [...sponsors, ...sponsors];

  return (
    <section className="section section--soft section--tight" aria-labelledby="sponsori">
      <div className="shell">
        <SectionHead
          eyebrow="Sponsori și parteneri"
          title="Cei care ne țin pe teren"
          highlight="teren"
          titleId="sponsori"
          sub={
            mainSponsor
              ? `${mainSponsor.name} este sponsorul principal al clubului pentru sezonul curent.`
              : undefined
          }
        />
      </div>

      <Reveal className={styles.marquee}>
        <div className={styles.track}>
          {marquee.map((sponsor, i) => (
            <a
              key={`${sponsor.name}-${i}`}
              className={styles.logo}
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
              aria-hidden={i >= sponsors.length}
              tabIndex={i >= sponsors.length ? -1 : 0}
            >
              <img src={sponsor.logo} alt={sponsor.name} height={40} loading="lazy" />
            </a>
          ))}
        </div>
      </Reveal>

      <div className="shell">
        <Reveal className={styles.tiers} stagger={80} pop>
          {(['Principal', 'Oficial', 'Partener'] as const).map((tier) => (
            <div key={tier} className={styles.tier}>
              <p className={styles.tierName}>{tier}</p>
              <p className={styles.tierList}>
                {sponsors
                  .filter((s) => s.tier === tier)
                  .map((s) => s.name)
                  .join(' · ')}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
