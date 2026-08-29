import { Link } from 'react-router-dom';
import { club, competitions, navLinks } from '../../data';
import { Mail, Phone, Pin } from '../ui/Icon';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.top}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <img src={club.crest} alt="" width={44} height={44} />
            <span>
              FC <em>{club.short}</em>
            </span>
          </Link>
          <p className={styles.motto}>{club.motto}</p>
          <p className={styles.founded}>
            Înființat în {club.founded} · {club.city} · {club.sport}
          </p>
        </div>

        <nav className={styles.col} aria-label="Navigare subsol">
          <h3 className={styles.colTitle}>Club</h3>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className={styles.colLink}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Competiții</h3>
          {competitions.map((c) => (
            <p key={c.id} className={styles.colLine}>
              <span className={styles.dot} style={{ background: c.accent }} aria-hidden />
              {c.short}
            </p>
          ))}
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact</h3>
          <p className={styles.contactLine}>
            <Pin size={16} /> {club.contact.venue}
          </p>
          <a className={styles.contactLine} href={`mailto:${club.contact.email}`}>
            <Mail size={16} /> {club.contact.email}
          </a>
          <a className={styles.contactLine} href={`tel:${club.contact.phone.replace(/\s/g, '')}`}>
            <Phone size={16} /> {club.contact.phone}
          </a>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Urmărește-ne</h3>
          <ul className={styles.socials}>
            {club.socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.name}
                  <span className={styles.handle}>{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`shell ${styles.bottom}`}>
        <p>
          © {year} {club.name}. Toate drepturile rezervate.
        </p>
        <p className={styles.stadium}>
          {club.fullName} · {club.venue}
        </p>
      </div>
    </footer>
  );
}
