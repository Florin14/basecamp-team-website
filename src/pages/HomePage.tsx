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
  Sponsors,
} from '../sections';

export function HomePage() {
  useDocumentTitle(
    `${club.name} — echipă de minifotbal din ${club.city}`,
    club.description,
  );

  return (
    <>
      <Hero />
      <NextMatch />
      <Competitions />
      <ClubIntro />
      <SquadPreview />
      <ResultsAndStandings />
      <NewsPreview />
      <Gallery />
      <Sponsors />
      <Contact />
    </>
  );
}
