import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { club, navLinks } from '../../data';
import { useScramble, useScrollProgress, useTheme } from '../../hooks';
import { cx } from '../../lib/format';
import { Button } from '../ui/Button';
import { Mail } from '../ui/Icon';
import { ThemeToggle } from './ThemeToggle';
import styles from './Nav.module.css';

export function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { stuck, hidden } = useScrollProgress(open);
  const location = useLocation();
  const { ref: logoRef, run: scrambleLogo } = useScramble<HTMLElement>('Base Camp');
  const headerRef = useRef<HTMLElement>(null);

  // Meniul mobil se închide la orice schimbare de rută.
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // Orice apăsare în afara antetului închide meniul.
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  // Blochează scroll-ul paginii cât timp meniul mobil e deschis.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header ref={headerRef} className={cx(styles.nav, stuck && styles.stuck, hidden && styles.hide)}>
      <div className={cx('shell', styles.inner)}>
        <NavLink
          to="/"
          className={styles.logo}
          aria-label={`${club.name} — pagina principală`}
          onMouseEnter={scrambleLogo}
        >
          <img src={club.crest} alt="" className={styles.crest} width={38} height={38} />
          <span className={styles.logoText}>
            FC <em ref={logoRef}>Base Camp</em>
          </span>
        </NavLink>

        <nav
          id="nav-links"
          className={cx(styles.links, open && styles.open)}
          aria-label="Navigare principală"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => cx(styles.link, isActive && styles.active)}
            >
              {link.label}
            </NavLink>
          ))}
          <span className={styles.mobileCta}>
            <Button to="/#contact" size="sm" block>
              <Mail size={16} /> Contact
            </Button>
          </span>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={toggle} />
          <span className={styles.desktopCta}>
            <Button to="/#contact" size="sm" magnetic glow>
              <Mail size={16} /> Contact
            </Button>
          </span>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <span
        className={cx(styles.scrim, open && styles.scrimOpen)}
        onClick={() => setOpen(false)}
        aria-hidden
      />
    </header>
  );
}
