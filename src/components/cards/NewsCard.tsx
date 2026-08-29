import { Link } from 'react-router-dom';
import type { Article } from '../../data';
import { useTilt } from '../../hooks';
import { cx, formatDate } from '../../lib/format';
import { ArrowRight, Clock } from '../ui/Icon';
import styles from './NewsCard.module.css';

type Props = { article: Article; featured?: boolean };

export function NewsCard({ article, featured }: Props) {
  const ref = useTilt<HTMLElement>({ max: featured ? 2.5 : 5, lift: 8, spotlight: false });

  return (
    <article
      ref={ref}
      className={cx('sheen', styles.card, featured && styles.featured)}
      data-cursor="card"
    >
      <Link to={`/stiri/${article.slug}`} className={styles.media}>
        <img src={article.image} alt="" loading="lazy" />
        <span className={styles.category}>{article.category}</span>
      </Link>

      <div className={styles.body}>
        <p className={styles.meta}>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className={styles.dot} aria-hidden />
          <Clock size={14} /> {article.readingMinutes} min
        </p>
        <h3 className={styles.title}>
          <Link to={`/stiri/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <Link to={`/stiri/${article.slug}`} className={cx('link-arrow', styles.more)}>
          Citește articolul <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
