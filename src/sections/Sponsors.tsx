import { club, coveragePlan, monthlyTiers, sponsors } from '../data';
import { cx } from '../lib/format';
import { Button } from '../components/ui/Button';
import { ArrowRight } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './Sponsors.module.css';

export function Sponsors() {
  const hasSponsors = sponsors.length > 0;

  return (
    <section className="section section--soft section--tight" aria-labelledby="sponsori">
      <div className="shell">
        <SectionHead
          eyebrow="Parteneri"
          serif
          title={hasSponsors ? 'Cei care ne țin pe teren' : 'Locurile de partener sunt libere'}
          highlight={hasSponsors ? 'teren' : 'libere'}
          titleId="sponsori"
          sub={
            hasSponsors
              ? 'Companiile care susțin clubul în sezonul curent.'
              : 'Suntem la începutul etapei de construcție. Primii parteneri intră acum, când proiectul se așază — nu după ce vin rezultatele.'
          }
        />

        {hasSponsors ? (
          <Reveal className={styles.marquee}>
            <div className={styles.track}>
              {[...sponsors, ...sponsors].map((sponsor, i) => (
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
        ) : (
          <>
            <Reveal className={styles.slots} stagger={110}>
              {coveragePlan.map((row, i) => {
                const tier = monthlyTiers[monthlyTiers.length - 1 - i];
                return (
                  <article key={row.tier} className={cx('panel', styles.slot)}>
                    <p className={styles.slotCount}>{row.count}</p>
                    <p className={styles.slotTier}>{row.tier}</p>
                    {tier ? (
                      <p className={styles.slotPrice}>
                        de la {tier.price} {tier.period}
                      </p>
                    ) : null}
                    <span className={styles.slotBadge}>locuri disponibile</span>
                  </article>
                );
              })}
            </Reveal>

            <Reveal className={styles.cta} delay={160}>
              <p className={styles.ctaText}>
                Logo-ul companiei tale poate fi primul pe echipamentul FC Base Camp.
              </p>
              <Button href="#parteneri" variant="ghost" magnetic>
                Vezi pachetele și bugetul <ArrowRight size={16} />
              </Button>
              <Button href={`mailto:${club.contact.sponsorEmail}`} size="sm">
                Scrie-ne direct
              </Button>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
