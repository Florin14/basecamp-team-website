import { gallery } from '../data';
import { Reveal } from '../components/ui/Reveal';
import { SectionHead } from '../components/ui/SectionHead';
import styles from './Gallery.module.css';

export function Gallery() {
  return (
    <section className="section" aria-labelledby="galerie">
      <div className="shell">
        <SectionHead
          eyebrow="Galerie"
          title="Sezonul, în imagini"
          highlight="imagini"
          titleId="galerie"
          sub="Momente de pe Base Camp Arena, de la antrenamente și din deplasări."
        />

        <Reveal className={styles.grid} stagger={90}>
          {gallery.map((photo) => (
            <figure key={photo.id} className={`sheen ${styles.item}`} data-cursor="card">
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <figcaption className={styles.caption}>
                <span className={styles.captionTitle}>{photo.caption}</span>
                <span className={styles.captionMeta}>{photo.match}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
