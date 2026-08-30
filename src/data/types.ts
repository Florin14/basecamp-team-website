export type Position = 'Portar' | 'Fundaș' | 'Mijlocas' | 'Atacant';

export type Player = {
  id: string;
  name: string;
  number: number;
  position: Position;
  nationality: string;
  birthDate: string;
  heightCm: number;
  foot: 'Dreptul' | 'Stângul' | 'Ambele';
  joined: string;
  photo: string;
  stats: { appearances: number; goals: number; assists: number };
  captain?: boolean;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  since: string;
  photo: string;
  bio?: string;
  phone?: string;
  email?: string;
};

/** Competițiile în care echipa este înscrisă în sezonul curent. */
export type CompetitionId = 'f4f' | 'ajm' | 'ats' | 'frm';

/** Fazele unui campionat cu play-off/play-out. */
export type Phase = 'regular' | 'playoff' | 'playout';

export type PhaseInfo = {
  id: Phase;
  label: string;
  /** Explicație afișată când faza nu a început încă. */
  note: string;
};

export type Competition = {
  id: CompetitionId;
  name: string;
  short: string;
  format: 'Campionat' | 'Cupă' | 'Turnee';
  scope: string;
  season: string;
  /** Competițiile eliminatorii nu au clasament. */
  hasStandings: boolean;
  /** Fazele cu clasament propriu; un campionat simplu are doar `regular`. */
  phases: PhaseInfo[];
  /** Câte echipe intră în play-off după sezonul regulat. */
  playoffCut?: number;
  /** Câte echipe retrogradează din play-out. */
  relegationCount?: number;
  goal: string;
  /** Culoare de accent, folosită pentru etichete și grafice. */
  accent: string;
};

export type Team = {
  name: string;
  short: string;
  crest: string;
};

export type Match = {
  id: string;
  competition: CompetitionId;
  round: string;
  /** ISO 8601 cu fus orar. */
  kickoff: string;
  venue: string;
  home: Team;
  away: Team;
  /** Lipsește pentru meciurile care nu s-au jucat. */
  score?: { home: number; away: number };
  report?: string;
  liveUrl?: string;
};

export type StandingRow = {
  /** Faza din care face parte rândul. */
  phase?: Phase;
  position: number;
  team: string;
  short: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  /** Ultimele meciuri, cel mai recent la final. */
  form: ('V' | 'E' | 'Î')[];
};

export type NewsCategory = 'Știri' | 'Transferuri' | 'Competiții' | 'Comunicat' | 'Interviu';

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  date: string;
  author: string;
  readingMinutes: number;
  image: string;
  /** Paragrafe de text simplu. */
  body: string[];
  featured?: boolean;
};

export type Sponsor = {
  name: string;
  tier: 'Principal' | 'Oficial' | 'Partener';
  url: string;
  logo: string;
};

export type Photo = {
  id: string;
  src: string;
  caption: string;
  match: string;
};
