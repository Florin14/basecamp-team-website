import { club } from '../data';
import { useDocumentTitle } from '../hooks';
import { Story } from '../sections';

export function ClubPage() {
  useDocumentTitle(
    `Povestea clubului — ${club.name}`,
    `Cum a ajuns ${club.fullName} de la un grup de opt oameni la patru competiții de minifotbal.`,
  );

  return <Story />;
}
