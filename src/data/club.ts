/**
 * Datele clubului. Identitatea, contactele și competițiile sunt reale;
 * loturile, meciurile și clasamentele sunt încă date demo.
 */
export const club = {
  name: 'FC Base Camp',
  fullName: 'FC Base Camp Cluj-Napoca',
  short: 'Base Camp',
  sport: 'minifotbal',
  crest: '/img/crest.png',
  crestLarge: '/img/crest-large.png',
  founded: 2017,
  city: 'Cluj-Napoca',
  county: 'jud. Cluj',
  venue: 'Liceul Eugen Pora',
  venueDetail: 'terenul de sport al liceului, Cluj-Napoca',
  season: '2026/2027',
  motto: 'Minifotbal la Cluj, din 2017',
  colors: ['Albastru', 'Alb'],
  /** Ritmul săptămânal de activitate. */
  weeklyDays: 4,
  description:
    'Echipă competitivă de minifotbal din Cluj-Napoca, activă în Campionatul Județean ' +
    'AJM Cluj, în Liga 1 All Time Sport și la turneele naționale organizate sub egida ' +
    'Federației Române de Minifotbal. Patru zile pe săptămână de antrenamente și jocuri ' +
    'competitive, coordonate de jucătorii înșiși.',
  contact: {
    email: 'acsbasecamp@gmail.com',
    phone: '+40 745 831 815',
    /** Sponsorizări — persoană dedicată. */
    sponsorEmail: 'zimbru.florin.4@gmail.com',
    sponsorPhone: '+40 742 705 935',
    city: 'Cluj-Napoca',
    venue: 'Liceul Eugen Pora, Cluj-Napoca',
  },
  socials: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61556336091700',
      handle: 'FC Base Camp',
    },
  ],
  highlights: [
    { label: 'Ani de activitate', value: new Date().getFullYear() - 2017 },
    { label: 'Competiții în sezon', value: 3 },
    { label: 'Zile de activitate / săpt.', value: 4 },
    { label: 'Turnee naționale / an', value: 5 },
  ],
} as const;

export const navLinks = [
  { to: '/', label: 'Acasă' },
  { to: '/lot', label: 'Lot' },
  { to: '/meciuri', label: 'Meciuri' },
  { to: '/stiri', label: 'Știri' },
] as const;
