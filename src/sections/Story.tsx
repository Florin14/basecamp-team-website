import { story } from '../data';
import { useScrollScene } from '../hooks';
import { cx } from '../lib/format';
import styles from './Story.module.css';

/**
 * Secțiune parcursă la scroll: panoul din dreapta rămâne fixat, iar anul,
 * imaginea și textul se schimbă pe măsură ce cobori.
 */
export function Story() {
  const { ref, progress, step } = useScrollScene<HTMLDivElement>(story.length);

  return (
    <section className={styles.section} aria-labelledby="poveste">
      <div
        ref={ref}
        className={styles.scroller}
        style={{ height: `${story.length * 100}vh` }}
      >
        <div className={styles.sticky}>
          <div className={`shell ${styles.inner}`}>
            <div className={styles.left}>
              <p className={styles.eyebrow}>
                <span className={styles.dash} aria-hidden />
                Povestea clubului
              </p>
              <h2 id="poveste" className={cx('editorial', styles.title)}>
                De la opt oameni <em>la patru competiții</em>
              </h2>

              <ol className={styles.steps}>
                {story.map((item, i) => (
                  <li
                    key={item.year}
                    className={cx(styles.step, i === step && styles.stepActive)}
                    aria-current={i === step ? 'step' : undefined}
                  >
                    <span className={styles.stepYear}>{item.year}</span>
                    <span className={styles.stepKicker}>{item.kicker}</span>
                  </li>
                ))}
              </ol>

              <div className={styles.rail} aria-hidden>
                <span className={styles.railFill} style={{ transform: `scaleY(${progress})` }} />
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.stage}>
                {story.map((item, i) => (
                  <figure
                    key={item.year}
                    className={cx(styles.card, i === step && styles.cardActive)}
                    style={{ zIndex: story.length - Math.abs(i - step) }}
                    aria-hidden={i !== step}
                  >
                    <img src={item.image} alt="" loading="lazy" />
                    <span className={styles.year}>{item.year}</span>
                    <figcaption className={styles.caption}>
                      <p className={styles.captionTitle}>{item.title}</p>
                      <p className={styles.captionBody}>{item.body}</p>
                      <p className={styles.captionStat}>
                        <strong>{item.stat.value}</strong> {item.stat.label}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
