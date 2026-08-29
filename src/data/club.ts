/**
 * Datele clubului. Sunt date demo — se înlocuiesc cu cele reale
 * fără a modifica componentele.
 */
export const club = {
  name: 'FC Base Camp',
  short: 'Base Camp',
  sport: 'minifotbal',
  crest: '/img/crest.svg',
  founded: 2016,
  city: 'Brașov',
  county: 'jud. Brașov',
  venue: 'Base Camp Arena',
  venueDetail: 'teren sintetic acoperit, 60 × 40 m',
  season: '2026/2027',
  motto: 'Minifotbal la Brașov, din 2016',
  colors: ['Albastru', 'Alb'],
  description:
    'Echipă de minifotbal din Brașov, înscrisă în patru competiții în sezonul curent: ' +
    'Liga Națională, Cupa României, campionatul județean și liga corporate. ' +
    'Un lot de 14 jucători, antrenamente de trei ori pe săptămână pe Base Camp Arena.',
  contact: {
    address: 'Str. Institutului 8, Brașov 500123',
    email: 'contact@fcbasecamp.ro',
    press: 'presa@fcbasecamp.ro',
    join: 'selectie@fcbasecamp.ro',
    phone: '+40 268 000 000',
  },
  socials: [
    { name: 'Facebook', url: 'https://facebook.com/', handle: '/fcbasecamp' },
    { name: 'Instagram', url: 'https://instagram.com/', handle: '@fcbasecamp' },
    { name: 'YouTube', url: 'https://youtube.com/', handle: '/FCBaseCampTV' },
    { name: 'TikTok', url: 'https://tiktok.com/', handle: '@fcbasecamp' },
  ],
  highlights: [
    { label: 'Ani de la înființare', value: 10 },
    { label: 'Competiții în sezon', value: 4 },
    { label: 'Trofee câștigate', value: 7 },
    { label: 'Jucători în lot', value: 14 },
  ],
} as const;

export const navLinks = [
  { to: '/', label: 'Acasă' },
  { to: '/lot', label: 'Lot' },
  { to: '/meciuri', label: 'Meciuri' },
  { to: '/stiri', label: 'Știri' },
] as const;
