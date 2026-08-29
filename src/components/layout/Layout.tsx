import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BackToTop } from './BackToTop';
import { Cursor } from './Cursor';
import { Footer } from './Footer';
import { Nav } from './Nav';
import { PageTransition } from './PageTransition';
import { Preloader } from './Preloader';
import { ScrollProgress } from './ScrollProgress';

/**
 * Duce pagina în capăt la fiecare navigare; dacă ruta are ancoră,
 * derulează la elementul respectiv.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    const target = document.querySelector(hash);
    if (!target) return;
    // Lăsăm pagina să se randeze înainte de a derula la ancoră.
    const id = requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  return (
    <>
      <Preloader />
      <ScrollManager />
      <ScrollProgress />
      <Cursor />
      <a className="skip-link" href="#main">
        Sari la conținut
      </a>
      <Nav />
      <main id="main">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
