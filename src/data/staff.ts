import type { StaffMember } from './types';

/** Clubul nu are antrenor oficial: echipa e coordonată de fondatorul ei. */
export const staff: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Bogdan Tiut',
    role: 'Coordonator echipă',
    since: '2017',
    photo: '/img/staff-1.svg',
    bio: 'Clubul este proiectul lui. Se ocupă de tot ce ține echipa în picioare: înscrieri în competiții, program de antrenamente, logistică la turnee și relația cu federația.',
    phone: '+40 745 831 815',
    email: 'acsbasecamp@gmail.com',
  },
  {
    id: 'st-2',
    name: 'Zimbru Florin',
    role: 'Coordonator sponsorizări',
    since: '2017',
    photo: '/img/staff-2.svg',
    bio: 'Punctul de contact pentru companiile care vor să devină parteneri ai clubului.',
    phone: '+40 742 705 935',
    email: 'zimbru.florin.4@gmail.com',
  },
];
