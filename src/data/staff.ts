import type { StaffMember } from './types';

export const staff: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Marius Dobre',
    role: 'Antrenor principal',
    since: '2019',
    photo: '/img/staff-1.svg',
    bio: 'Fost jucător de minifotbal cu 6 sezoane în Liga Națională. Pune accent pe rotații scurte și presing pe toată suprafața terenului.',
  },
  {
    id: 'st-2',
    name: 'Andrei Pîrvu',
    role: 'Antrenor secund · analist',
    since: '2022',
    photo: '/img/staff-2.svg',
    bio: 'Se ocupă de fazele fixe și de analiza video a adversarilor din cele patru competiții.',
  },
  {
    id: 'st-3',
    name: 'Cristina Neagu',
    role: 'Preparator fizic',
    since: '2023',
    photo: '/img/staff-3.svg',
    bio: 'Gestionează încărcătura într-un sezon cu până la trei meciuri pe săptămână.',
  },
  {
    id: 'st-4',
    name: 'Radu Ionescu',
    role: 'Manager de echipă',
    since: '2016',
    photo: '/img/staff-4.svg',
    bio: 'Cofondator al clubului. Se ocupă de înscrieri în competiții, logistică și parteneriate.',
  },
];
