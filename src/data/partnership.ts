/**
 * Propunerea de sponsorizare, conform documentului oficial al clubului.
 * Sumele și structura bugetului sunt reale.
 */

/** Zonele de vizibilitate de pe echipament, legate de pachetele de mai jos. */
export const kitPlacements = [
  {
    id: 'piept',
    name: 'Logo frontal',
    tier: 'Partener principal',
    price: '2.000 lei / lună',
    description:
      'Poziția cea mai vizibilă, pe pieptul echipamentului de joc. Apare în fiecare fotografie de meci și în toate materialele clubului.',
    perks: [
      'Logo frontal pe echipamentul de joc',
      'Vizibilitate maximă la toate competițiile',
      'Exclusivitate pe domeniu (opțional)',
    ],
  },
  {
    id: 'spate',
    name: 'Echipament secundar',
    tier: 'Partener oficial',
    price: '1.000 lei / lună',
    description:
      'Logo pe echipamentul secundar și pe cel de încălzire, plus prezență constantă în comunicările oficiale.',
    perks: [
      'Logo pe echipamentul secundar',
      'Expunere constantă online',
      'Prezență în comunicările oficiale',
    ],
  },
  {
    id: 'maneca',
    name: 'Mânecă și treninguri',
    tier: 'Partener suporter',
    price: '500 lei / lună',
    description:
      'Varianta accesibilă pentru companiile locale care vor prezență constantă, fără angajament mare.',
    perks: ['Vizibilitate online', 'Menționări oficiale'],
  },
  {
    id: 'sort',
    name: 'Șort și materiale',
    tier: 'Partener sezonier',
    price: '12.000 lei / sezon',
    description:
      'Plată unică pentru tot sezonul, cu logo pe echipament și prezență la turneele naționale.',
    perks: ['Logo pe echipament', 'Expunere online', 'Prezență la turnee'],
  },
] as const;

export type KitPlacementId = (typeof kitPlacements)[number]['id'];

type MonthlyTier = {
  id: string;
  name: string;
  price: string;
  period: string;
  featured?: boolean;
  perks: readonly string[];
};

/** Pachetele recurente, modelul recomandat de club. */
export const monthlyTiers: readonly MonthlyTier[] = [
  {
    id: 'suporter',
    name: 'Partener suporter',
    price: '500',
    period: 'lei / lună',
    perks: ['Vizibilitate online', 'Menționări oficiale'],
  },
  {
    id: 'oficial',
    name: 'Partener oficial',
    price: '1.000',
    period: 'lei / lună',
    perks: [
      'Logo pe echipament secundar',
      'Expunere constantă online',
      'Prezență în comunicările oficiale',
    ],
  },
  {
    id: 'principal',
    name: 'Partener principal',
    price: '2.000',
    period: 'lei / lună',
    featured: true,
    perks: [
      'Logo frontal pe echipament',
      'Vizibilitate maximă',
      'Prezență la toate competițiile',
      'Exclusivitate pe domeniu (opțional)',
    ],
  },
] as const;

/** Alternativa cu plată unică. */
export const seasonTiers = [
  { name: 'Partener sezonier', price: '12.000 lei / sezon', perks: 'Logo echipament · expunere online · prezență la turnee' },
  { name: 'Partener principal sezonier', price: '20.000 lei / sezon', perks: 'Logo frontal · integrare completă în comunicare · vizibilitate maximă' },
];

/** Bugetul anual, pe categorii. Sumele sunt în lei. */
const budgetGroups = [
  {
    name: 'Turnee',
    amount: 66000,
    items: [
      { label: '5 turnee majore × 10.000 lei', amount: 50000 },
      { label: '4 turnee de pregătire × 4.000 lei', amount: 16000 },
    ],
  },
  {
    name: 'Competiții oficiale',
    amount: 12000,
    items: [
      { label: 'AJM Cluj', amount: 10000 },
      { label: 'ATS Cluj', amount: 2000 },
    ],
  },
  {
    name: 'Terenuri',
    amount: 38880,
    items: [
      { label: 'Antrenamente', amount: 22880 },
      { label: 'Meciuri competitive', amount: 12000 },
      { label: 'Meciuri de pregătire', amount: 4000 },
    ],
  },
  {
    name: 'Echipamente și materiale',
    amount: 20000,
    items: [
      { label: 'Echipament de joc (2 seturi)', amount: 12000 },
      { label: 'Treninguri', amount: 5000 },
      { label: 'Mingi și materiale', amount: 3000 },
    ],
  },
  {
    name: 'Media și comunicare',
    amount: 21600,
    items: [
      { label: 'Filmări, editare, conținut', amount: 18000 },
      { label: 'Promovare online', amount: 3600 },
    ],
  },
] as const;

export const budget = {
  /** Suma categoriilor de mai jos — în propunere apare rotunjit la ~160.000 lei. */
  total: budgetGroups.reduce((sum, g) => sum + g.amount, 0),
  stated: '≈ 160.000 lei / an',
  monthly: 13300,
  target: 200000,
  memberFee: 100,
  groups: budgetGroups,
};

/** Câți parteneri caută clubul, pe fiecare nivel. */
export const coveragePlan = [
  { tier: 'Parteneri principali', count: '3–4' },
  { tier: 'Parteneri oficiali', count: '4–6' },
  { tier: 'Parteneri suporteri', count: '3–4' },
];

/** Cifrele de activitate arătate potențialilor parteneri. */
export const partnerReach = [
  { value: 5, suffix: '', label: 'turnee naționale', detail: 'majore, pe an' },
  { value: 4, suffix: '', label: 'turnee de pregătire', detail: 'în plus, anual' },
  { value: 4, suffix: '', label: 'zile pe săptămână', detail: 'antrenamente și jocuri' },
  { value: 3, suffix: '', label: 'competiții', detail: 'AJM, ATS și turnee FRM' },
];

export const partnerBenefits = [
  'Logo pe echipamentul de joc, în funcție de pachet',
  'Prezență în activitatea media constantă a clubului',
  'Expunere la turneele naționale și la competițiile locale',
  'Menționare în comunicările oficiale ale clubului',
  'Structură financiară transparentă, cu buget public',
];

/** Direcția pe trei ani, din propunerea de colaborare. */
export const strategy = {
  horizon: '3 ani',
  budgetTarget: '200.000 lei / an',
  points: [
    'Introducerea beneficiilor pentru jucători',
    'Bonusuri de performanță',
    'Consolidarea performanței la nivel național',
    'Dezvoltarea brandului sportiv regional',
  ],
  closing:
    'Un partener care intră acum în proiect devine parte din etapa de construcție, nu doar din etapa de rezultate.',
};
