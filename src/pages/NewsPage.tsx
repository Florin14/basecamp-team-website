import { useMemo, useState } from 'react';
import { club, latestNews, newsCategories } from '../data';
import type { NewsCategory } from '../data';
import { useDocumentTitle } from '../hooks';
import { cx } from '../lib/format';
import { PageHeader } from '../components/layout';
import { NewsCard } from '../components/cards';
import { Reveal } from '../components/ui/Reveal';
import styles from './NewsPage.module.css';

type Filter = 'Toate' | NewsCategory;

export function NewsPage() {
  useDocumentTitle(
    `Știri — ${club.name}`,
    'Comunicate, transferuri, cronici de meci și interviuri de la AFC Vulturii Albaștri.',
  );
  const [filter, setFilter] = useState<Filter>('Toate');
  const filters: Filter[] = ['Toate', ...newsCategories()];

  const articles = useMemo(() => {
    const all = latestNews();
    return filter === 'Toate' ? all : all.filter((a) => a.category === filter);
  }, [filter]);

  const [lead, ...rest] = articles;

  return (
    <>
      <PageHeader
        eyebrow="Noutăți"
        title="Știri de la club"
        sub="Rezultate, transferuri, comunicate și interviuri din toate competițiile."
      >
        <Reveal className={styles.filters} stagger={60} pop role="group" aria-label="Filtrează după categorie">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={cx(styles.filter, filter === f && styles.filterActive)}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </Reveal>
      </PageHeader>

      <section className="section" aria-label="Articole">
        <div className="shell">
          {lead ? (
            <>
              <Reveal className={styles.lead} variant="blur">
                <NewsCard article={lead} featured />
              </Reveal>
              <Reveal className={styles.grid} stagger={90}>
                {rest.map((article) => (
                  <NewsCard key={article.slug} article={article} />
                ))}
              </Reveal>
            </>
          ) : (
            <p className={styles.empty}>Nu există articole în această categorie.</p>
          )}
        </div>
      </section>
    </>
  );
}
