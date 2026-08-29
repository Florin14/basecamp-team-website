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
  Partners,
  ResultsAndStandings,
  SquadPreview,
  Sponsors,
  Story,
} from '../sections';

export function HomePage() {
  useDocumentTitle(`${club.name} — echipă de minifotbal din ${club.city}`, club.description);

  return (
    <>
      <Hero />
      {/* Întâi povestea și prezentarea clubului... */}
      <Story />
      <NextMatch />
      <ClubIntro />
      <SquadPreview />
      <Gallery />
      {/* ...apoi propunerea pentru parteneri... */}
      <Partners />
      <Competitions />
      <NewsPreview />
      {/* ...și abia la final detaliile tehnice. */}
      <ResultsAndStandings />
      <Sponsors />
      <Contact />
    </>
  );
}
