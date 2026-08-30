import { club } from '../data';
import { useDocumentTitle } from '../hooks';
import {
  ClubIntro,
  Competitions,
  Contact,
  Gallery,
  Hero,
  NewsPreview,
  NextMatch,
  ResultsAndStandings,
  SquadPreview,
} from '../sections';

export function HomePage() {
  useDocumentTitle(`${club.name} — echipă de minifotbal din ${club.city}`, club.description);

  return (
    <>
      <Hero />
      <NextMatch />
      <ClubIntro />
      <SquadPreview />
      <Gallery />
      <Competitions />
      <NewsPreview />
      <ResultsAndStandings />
      <Contact />
    </>
  );
}
