import { featuredArticle, latestNews } from '../data';
import { NewsCard } from '../components/cards';
import { Button } from '../components/ui/Button';
import { ArrowRight } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './NewsPreview.module.css';

export function NewsPreview() {
  const featured = featuredArticle();
  const rest = latestNews()
    .filter((a) => a.slug !== featured.slug)
    .slice(0, 3);

  return (
    <section className="section" aria-labelledby="stiri">
      <div className="shell">
        <SectionHead
          eyebrow="Știri"
          title="Ce se întâmplă la club"
          highlight="club"
          titleId="stiri"
          sub="Transferuri, comunicate, cronici de meci și interviuri."
          action={
            <Button to="/stiri" variant="ghost" size="sm">
              Toate știrile <ArrowRight size={15} />
            </Button>
          }
        />

        <Reveal className={styles.featured} variant="blur">
          <NewsCard article={featured} featured />
        </Reveal>

        <Reveal className={styles.grid} stagger={110}>
          {rest.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
