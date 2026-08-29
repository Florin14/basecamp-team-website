import { Link, Navigate, useParams } from 'react-router-dom';
import { articleBySlug, club, relatedArticles } from '../data';
import { useDocumentTitle } from '../hooks';
import { formatDate } from '../lib/format';
import { NewsCard } from '../components/cards';
import { ArrowRight, Clock } from '../components/ui/Icon';
import { MeshBackground } from '../components/ui/MeshBackground';
import { Reveal } from '../components/ui/Reveal';
import { SplitText } from '../components/ui/SplitText';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './ArticlePage.module.css';

export function ArticlePage() {
  const { slug = '' } = useParams();
  const article = articleBySlug(slug);

  useDocumentTitle(
    article ? `${article.title} — ${club.name}` : 'Articol negăsit',
    article?.excerpt,
  );

  if (!article) return <Navigate to="/stiri" replace />;

  const related = relatedArticles(article.slug);

  return (
    <>
      <header className={styles.header}>
        <MeshBackground soft />
        <div className={`shell ${styles.headInner}`}>
          <Reveal>
            <nav className={styles.crumbs} aria-label="Navigare ierarhică">
              <Link to="/stiri">Știri</Link>
              <span aria-hidden>/</span>
              <span>{article.category}</span>
            </nav>
            <SplitText as="h1" text={article.title} className={styles.title} />
            <p className={styles.meta}>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className={styles.sep} aria-hidden>
                ·
              </span>
              {article.author}
              <span className={styles.sep} aria-hidden>
                ·
              </span>
              <Clock size={14} /> {article.readingMinutes} min de citit
            </p>
          </Reveal>
        </div>
      </header>

      <article className={styles.article}>
        <div className="shell">
          <Reveal className={styles.cover} variant="clip">
            <img src={article.image} alt="" />
          </Reveal>

          <div className={styles.body}>
            <Reveal as="p" className={styles.excerpt}>
              {article.excerpt}
            </Reveal>
            {article.body.map((paragraph, i) => (
              <Reveal as="p" key={i} className={styles.para} delay={i * 40}>
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.back}>
            <Link to="/stiri" className="link-arrow">
              Înapoi la toate știrile <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </article>

      {related.length ? (
        <section className="section section--soft" aria-labelledby="alte-stiri">
          <div className="shell">
            <SectionHead eyebrow="Continuă" title="Alte știri" titleId="alte-stiri" />
            <Reveal className={styles.related} stagger={90}>
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} />
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}
    </>
  );
}
