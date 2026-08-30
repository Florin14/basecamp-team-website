import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomePage } from './pages';

/**
 * Doar pagina principală intră în bundle-ul inițial; restul se încarcă
 * la prima navigare, ca prima vizită să nu plătească pentru tot site-ul.
 * Suspense-ul care le acoperă stă în `Layout`, în jurul lui `Outlet`.
 */
const ClubPage = lazy(() => import('./pages/ClubPage').then((m) => ({ default: m.ClubPage })));
const SquadPage = lazy(() => import('./pages/SquadPage').then((m) => ({ default: m.SquadPage })));
const MatchesPage = lazy(() =>
  import('./pages/MatchesPage').then((m) => ({ default: m.MatchesPage })),
);
const NewsPage = lazy(() => import('./pages/NewsPage').then((m) => ({ default: m.NewsPage })));
const ArticlePage = lazy(() =>
  import('./pages/ArticlePage').then((m) => ({ default: m.ArticlePage })),
);
const SponsorshipPage = lazy(() =>
  import('./pages/SponsorshipPage').then((m) => ({ default: m.SponsorshipPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="club" element={<ClubPage />} />
        <Route path="lot" element={<SquadPage />} />
        <Route path="meciuri" element={<MatchesPage />} />
        <Route path="stiri" element={<NewsPage />} />
        <Route path="stiri/:slug" element={<ArticlePage />} />
        <Route path="sponsorizare" element={<SponsorshipPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
