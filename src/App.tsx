import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  ArticlePage,
  HomePage,
  MatchesPage,
  NewsPage,
  NotFoundPage,
  SquadPage,
} from './pages';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="lot" element={<SquadPage />} />
        <Route path="meciuri" element={<MatchesPage />} />
        <Route path="stiri" element={<NewsPage />} />
        <Route path="stiri/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
