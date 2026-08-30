import { useState } from 'react';
import {
  budget,
  club,
  coveragePlan,
  kitPlacements,
  monthlyTiers,
  partnerBenefits,
  seasonTiers,
  strategy,
} from '../data';
import type { KitPlacementId } from '../data';
import { useCountUp } from '../hooks';
import { cx } from '../lib/format';
import { Button } from '../components/ui/Button';
import { ArrowRight, Check, Mail, Phone } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import styles from './Partners.module.css';

const JERSEY_PATH =
  'M132 40 L188 40 L232 52 L272 86 L250 126 L218 110 L222 258 L98 258 L102 110 L70 126 L48 86 L88 52 Z';

const lei = (value: number) => value.toLocaleString('ro-RO');

function BudgetTotal() {
  const { ref, value } = useCountUp<HTMLParagraphElement>(budget.total, 1800);
  return (
    <p ref={ref} className={cx(styles.budgetTotal, 'tabular')}>
      {lei(value)} <span>lei / an</span>
    </p>
  );
}

export function Partners() {
  const [active, setActive] = useState<KitPlacementId>('piept');
  const placement = kitPlacements.find((p) => p.id === active) ?? kitPlacements[0];
  const maxGroup = Math.max(...budget.groups.map((g) => g.amount));

  const zoneProps = (id: KitPlacementId) => ({
    className: cx(styles.zone, active === id && styles.zoneActive),
    onMouseEnter: () => setActive(id),
    onFocus: () => setActive(id),
    onClick: () => setActive(id),
    tabIndex: 0,
    role: 'button' as const,
    'aria-pressed': active === id,
    'aria-label': `Poziție de sponsorizare: ${kitPlacements.find((p) => p.id === id)?.name}`,
  });

  return (
    <section className={styles.section} id="parteneri" aria-labelledby="parteneri-title">
      <span className={styles.orb} aria-hidden />

      <div className={`shell ${styles.inner}`}>
        <Reveal className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.dash} aria-hidden />
            Propunere de colaborare
          </p>
          <h1 id="parteneri-title" className={cx('editorial', styles.title)}>
            Un club construit <em>cu buget public</em>
          </h1>
          <p className={styles.lead}>
            FC Base Camp nu este doar o echipă de competiție, ci un proiect organizat, cu
            obiective clare și structură financiară transparentă. Mai jos e tot: unde se duc
            banii, ce pachete există și ce primești ca partener.
          </p>
        </Reveal>

        {/* ---------- Echipament + pachete lunare ---------- */}
        <div className={styles.grid}>
          <Reveal className={styles.kitWrap} variant="fade-right">
            <p className={cx('hand', styles.note)}>alege o zonă →</p>

            <svg
              className={styles.kit}
              viewBox="0 0 560 420"
              role="img"
              aria-label="Echipamentul de joc, cu pozițiile disponibile pentru parteneri"
            >
              <defs>
                <linearGradient id="kitFront" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2563EB" />
                  <stop offset="1" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="kitBack" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1E40AF" />
                  <stop offset="1" stopColor="#1E3A8A" />
                </linearGradient>
              </defs>

              <g transform="translate(10 0)">
                <path d={JERSEY_PATH} fill="url(#kitFront)" />
                <path
                  d="M132 40 a30 22 0 0 0 56 0"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity=".9"
                />
                <path d="M102 110 L98 258" stroke="#fff" strokeOpacity=".2" strokeWidth="3" />
                <path d="M218 110 L222 258" stroke="#fff" strokeOpacity=".2" strokeWidth="3" />
                <text x="160" y="245" textAnchor="middle" className={styles.kitLabel}>
                  FAȚĂ
                </text>
                <rect x="112" y="96" width="96" height="54" rx="10" {...zoneProps('piept')} />
                <rect x="58" y="82" width="40" height="38" rx="9" {...zoneProps('maneca')} />
              </g>

              <g transform="translate(290 0) scale(0.86) translate(20 20)">
                <path d={JERSEY_PATH} fill="url(#kitBack)" />
                <path d="M132 40 h56" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".9" />
                <text x="160" y="245" textAnchor="middle" className={styles.kitLabel}>
                  SECUNDAR
                </text>
                <rect x="108" y="120" width="104" height="80" rx="10" {...zoneProps('spate')} />
              </g>

              <g transform="translate(10 0)">
                <path
                  d="M104 288 h112 l10 84 h-48 l-18 -46 -18 46 h-48 Z"
                  fill="url(#kitFront)"
                  opacity=".92"
                />
                <rect x="118" y="300" width="52" height="34" rx="8" {...zoneProps('sort')} />
              </g>
            </svg>

            <div className={styles.card} key={placement.id}>
              <p className={styles.tier}>
                {placement.tier} · {placement.price}
              </p>
              <h3 className={styles.placeName}>{placement.name}</h3>
              <p className={styles.placeBody}>{placement.description}</p>
              <ul className={styles.perks}>
                {placement.perks.map((perk) => (
                  <li key={perk}>
                    <Check size={15} /> {perk}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className={styles.tiers} variant="fade-left" delay={120}>
            <p className={styles.tiersLabel}>
              Model recurent lunar — recomandat, pentru stabilitate financiară
            </p>
            {monthlyTiers.map((item) => (
              <article
                key={item.id}
                className={cx(styles.tierCard, item.featured && styles.tierFeatured)}
              >
                <div className={styles.tierHead}>
                  <h3 className={styles.tierName}>{item.name}</h3>
                  <p className={styles.tierPrice}>
                    {item.price} <span>{item.period}</span>
                  </p>
                </div>
                <ul className={styles.tierPerks}>
                  {item.perks.map((perk) => (
                    <li key={perk}>
                      <Check size={14} /> {perk}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className={styles.season}>
              <p className={styles.seasonLabel}>Alternativ, cu plată unică</p>
              {seasonTiers.map((item) => (
                <p key={item.name} className={styles.seasonRow}>
                  <span>{item.name}</span>
                  <strong>{item.price}</strong>
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------- Bugetul ---------- */}
        <Reveal className={styles.budget} variant="blur">
          <div className={styles.budgetHead}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.dash} aria-hidden />
                Buget real anual
              </p>
              <BudgetTotal />
              <p className={styles.budgetSub}>
                Suma categoriilor de mai jos — în propunerea clubului apare rotunjit ca{' '}
                {budget.stated}, adică ≈ {lei(budget.monthly)} lei pe lună. Membrii contribuie
                cu o taxă lunară fixă de {budget.memberFee} lei, care susține funcționarea de
                bază; sponsorizările merg către turnee, nivel competițional și profesionalizare.
              </p>
            </div>
          </div>

          <ul className={styles.budgetList}>
            {budget.groups.map((group) => (
              <li key={group.name} className={styles.budgetGroup}>
                <div className={styles.budgetRow}>
                  <span className={styles.budgetName}>{group.name}</span>
                  <span className={cx(styles.budgetAmount, 'tabular')}>
                    {lei(group.amount)} lei
                  </span>
                </div>
                <span className={styles.budgetTrack}>
                  <i style={{ width: `${(group.amount / maxGroup) * 100}%` }} />
                </span>
                <p className={styles.budgetItems}>
                  {group.items.map((item) => `${item.label} — ${lei(item.amount)} lei`).join(' · ')}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------- Plan și direcție ---------- */}
        <div className={styles.bottom}>
          <Reveal className={styles.plan} variant="fade-right">
            <h3 className={styles.blockTitle}>Plan de acoperire</h3>
            <p className={styles.blockSub}>
              Diversificarea parteneriatelor reduce riscul și asigură continuitatea proiectului.
            </p>
            <ul className={styles.planList}>
              {coveragePlan.map((row) => (
                <li key={row.tier}>
                  <strong>{row.count}</strong> {row.tier}
                </li>
              ))}
            </ul>
            <ul className={styles.benefits}>
              {partnerBenefits.map((benefit) => (
                <li key={benefit}>
                  <Check size={14} /> {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={styles.strategy} variant="fade-left" delay={100}>
            <h3 className={styles.blockTitle}>Direcție strategică · {strategy.horizon}</h3>
            <p className={styles.blockSub}>
              Obiectivul clubului este un buget stabil de <strong>{strategy.budgetTarget}</strong>,
              pentru:
            </p>
            <ul className={styles.strategyList}>
              {strategy.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className={cx('editorial', styles.closing)}>{strategy.closing}</p>

            <div className={styles.cta}>
              <Button
                href={`mailto:${club.contact.sponsorEmail}?subject=Propunere%20de%20colaborare%20FC%20Base%20Camp`}
                magnetic
                glow
              >
                Cere propunerea completă <ArrowRight size={16} />
              </Button>
              <p className={styles.ctaPerson}>
                Zimbru Florin · coordonator sponsorizări
                <span>
                  <Mail size={14} /> {club.contact.sponsorEmail}
                </span>
                <span>
                  <Phone size={14} /> {club.contact.sponsorPhone}
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
