import { club } from '../data';
import { useDocumentTitle } from '../hooks';
import { Partners, Sponsors } from '../sections';

export function SponsorshipPage() {
  useDocumentTitle(
    `Sponsorizare — ${club.name}`,
    `Propunerea de parteneriat a ${club.fullName}: pachete, vizibilitate, buget și beneficii pentru sponsori.`,
  );

  return (
    <>
      <Partners />
      <Sponsors />
    </>
  );
}
