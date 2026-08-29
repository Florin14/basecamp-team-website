import { useDocumentTitle } from '../hooks';
import { club } from '../data';
import { Button } from '../components/ui/Button';
import { ArrowRight, Ball } from '../components/ui/Icon';
import { MeshBackground } from '../components/ui/MeshBackground';
import { Reveal } from '../components/ui/Reveal';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  useDocumentTitle(`Pagină negăsită — ${club.name}`);

  return (
    <section className={styles.wrap}>
      <MeshBackground grid />
      <Reveal className={`shell ${styles.inner}`} variant="scale">
        <span className={`${styles.icon} floaty`} aria-hidden>
          <Ball size={44} className="spin-slow" />
        </span>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Mingea a ieșit în afara terenului</h1>
        <p className={styles.sub}>
          Pagina căutată nu există sau a fost mutată. Repune jocul de la una dintre rutele de mai
          jos.
        </p>
        <div className={styles.actions}>
          <Button to="/" magnetic>
            Înapoi acasă <ArrowRight size={17} />
          </Button>
          <Button to="/meciuri" variant="ghost">
            Vezi programul
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
