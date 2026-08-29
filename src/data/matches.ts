import { club } from './club';
import type { CompetitionId, Match, Team } from './types';

const us: Team = { name: club.name, short: 'BSC', crest: club.crest };

const opponent = (name: string, short: string, crestIndex: number): Team => ({
  name,
  short,
  crest: `/img/crest-${(crestIndex % 6) + 1}.svg`,
});

export const teams = {
  us,
  // Liga Națională — Seria C
  craiova: opponent('United Craiova', 'UCR', 0),
  sighisoara: opponent('Real Sighișoara', 'RSG', 1),
  cluj: opponent('Old Boys Cluj', 'OBC', 2),
  timisoara: opponent('Fair Play Timișoara', 'FPT', 3),
  iasi: opponent('Team Star Iași', 'TSI', 4),
  sibiu: opponent('Atletic Sibiu', 'ATS', 5),
  alba: opponent('Dinamic Alba', 'DAL', 0),
  deva: opponent('Speed Deva', 'SPD', 1),
  mures: opponent('Nova Mureș', 'NVM', 2),
  // Campionatul Județean Brașov
  kronstadt: opponent('Kronstadt Minifotbal', 'KRO', 3),
  corona: opponent('Corona Săcele', 'COR', 4),
  tractorul: opponent('Tractorul Brașov', 'TRB', 5),
  poiana: opponent('Poiana Team', 'POI', 0),
  codlea: opponent('Codlea United', 'COD', 1),
  ghimbav: opponent('Ghimbav Minifotbal', 'GHI', 2),
  zizin: opponent('Zizin FC', 'ZIZ', 3),
  // Liga Corporate Brașov
  novatech: opponent('Nova Tech Team', 'NVT', 4),
  delta: opponent('Delta Systems', 'DLT', 5),
  kronlog: opponent('Kron Logistic', 'KRL', 0),
  alpin: opponent('Alpin Software', 'ALP', 1),
  rulment: opponent('Rulment Team', 'RUL', 2),
  carpat: opponent('Carpat Media', 'CPM', 3),
  vertigo: opponent('Vertigo Labs', 'VRT', 4),
} as const;

const HOME = club.venue;

/** Toate meciurile sezonului, din cele patru competiții, în ordine cronologică. */
export const matches: Match[] = [
  {
    id: 'm-01', competition: 'lnm', round: 'Etapa 1',
    kickoff: '2026-08-01T19:00:00+03:00', venue: HOME,
    home: us, away: teams.craiova, score: { home: 5, away: 2 },
    report: 'Start perfect în Seria C, cu trei goluri în ultimele opt minute.',
  },
  {
    id: 'm-02', competition: 'judetean', round: 'Etapa 1',
    kickoff: '2026-08-05T20:00:00+03:00', venue: 'Sala Sportivă Kronstadt, Brașov',
    home: teams.kronstadt, away: us, score: { home: 3, away: 3 },
    report: 'Derby-ul orașului s-a terminat egal, după ce am condus cu 3-1.',
  },
  {
    id: 'm-03', competition: 'corporate', round: 'Etapa 1',
    kickoff: '2026-08-08T18:30:00+03:00', venue: HOME,
    home: us, away: teams.novatech, score: { home: 6, away: 1 },
    report: 'Prima victorie în ediția a VIII-a a ligii corporate.',
  },
  {
    id: 'm-04', competition: 'lnm', round: 'Etapa 2',
    kickoff: '2026-08-12T19:30:00+03:00', venue: 'Arena Mureșul, Sighișoara',
    home: teams.sighisoara, away: us, score: { home: 4, away: 2 },
    report: 'Singura înfrângere de până acum, într-un meci decis de două contraatacuri.',
  },
  {
    id: 'm-05', competition: 'judetean', round: 'Etapa 2',
    kickoff: '2026-08-15T19:00:00+03:00', venue: HOME,
    home: us, away: teams.corona, score: { home: 7, away: 2 },
    report: 'Cel mai bun meci ofensiv al sezonului: patru goluri pentru Moldovan.',
  },
  {
    id: 'm-06', competition: 'cupa', round: '16-imi de finală',
    kickoff: '2026-08-19T20:00:00+03:00', venue: HOME,
    home: us, away: teams.deva, score: { home: 4, away: 3 },
    report: 'Calificare în optimi după un gol în ultimul minut al prelungirilor.',
  },
  {
    id: 'm-07', competition: 'corporate', round: 'Etapa 2',
    kickoff: '2026-08-22T18:00:00+03:00', venue: 'Baza Sportivă Delta, Brașov',
    home: teams.delta, away: us, score: { home: 3, away: 3 },
    report: 'Egalare în ultimele secunde, cu portarul trimis în atac.',
  },
  {
    id: 'm-08', competition: 'lnm', round: 'Etapa 3',
    kickoff: '2026-08-26T19:00:00+03:00', venue: HOME,
    home: us, away: teams.cluj, score: { home: 6, away: 3 },
    report: 'A doua victorie în Liga Națională, cu debutul lui Matei Dinu.',
  },

  // ---------- Programate ----------
  {
    id: 'm-09', competition: 'judetean', round: 'Etapa 3',
    kickoff: '2026-09-02T20:00:00+03:00', venue: 'Sala Tractorul, Brașov',
    home: teams.tractorul, away: us,
  },
  {
    id: 'm-10', competition: 'lnm', round: 'Etapa 4',
    kickoff: '2026-09-05T19:30:00+03:00', venue: 'Arena Bega, Timișoara',
    home: teams.timisoara, away: us,
  },
  {
    id: 'm-11', competition: 'corporate', round: 'Etapa 3',
    kickoff: '2026-09-09T18:30:00+03:00', venue: HOME,
    home: us, away: teams.kronlog,
  },
  {
    id: 'm-12', competition: 'cupa', round: 'Optimi de finală',
    kickoff: '2026-09-13T19:00:00+03:00', venue: 'Arena Cibin, Sibiu',
    home: teams.sibiu, away: us,
  },
  {
    id: 'm-13', competition: 'lnm', round: 'Etapa 5',
    kickoff: '2026-09-19T19:00:00+03:00', venue: HOME,
    home: us, away: teams.iasi,
  },
  {
    id: 'm-14', competition: 'judetean', round: 'Etapa 4',
    kickoff: '2026-09-23T20:00:00+03:00', venue: HOME,
    home: us, away: teams.poiana,
  },
  {
    id: 'm-15', competition: 'corporate', round: 'Etapa 4',
    kickoff: '2026-09-30T18:00:00+03:00', venue: 'Arena Alpin, Brașov',
    home: teams.alpin, away: us,
  },
  {
    id: 'm-16', competition: 'lnm', round: 'Etapa 6',
    kickoff: '2026-10-03T19:30:00+03:00', venue: 'Arena Cibin, Sibiu',
    home: teams.sibiu, away: us,
  },
  {
    id: 'm-17', competition: 'judetean', round: 'Etapa 5',
    kickoff: '2026-10-10T19:00:00+03:00', venue: HOME,
    home: us, away: teams.codlea,
  },
  {
    id: 'm-18', competition: 'corporate', round: 'Etapa 5',
    kickoff: '2026-10-14T18:30:00+02:00', venue: HOME,
    home: us, away: teams.rulment,
  },
  {
    id: 'm-19', competition: 'lnm', round: 'Etapa 7',
    kickoff: '2026-10-17T19:00:00+02:00', venue: HOME,
    home: us, away: teams.alba,
  },
  {
    id: 'm-20', competition: 'judetean', round: 'Etapa 6',
    kickoff: '2026-10-24T20:00:00+02:00', venue: 'Sala Ghimbav',
    home: teams.ghimbav, away: us,
  },
];

export const isPlayed = (m: Match) => m.score !== undefined;
export const isHome = (m: Match) => m.home.name === club.name;

/** Rezultatul din perspectiva clubului. */
export function outcome(m: Match): 'V' | 'E' | 'Î' | null {
  if (!m.score) return null;
  const ours = isHome(m) ? m.score.home : m.score.away;
  const theirs = isHome(m) ? m.score.away : m.score.home;
  if (ours > theirs) return 'V';
  if (ours < theirs) return 'Î';
  return 'E';
}

/** Golurile marcate și primite de echipă într-un meci jucat. */
export function ourGoals(m: Match) {
  if (!m.score) return null;
  return isHome(m)
    ? { scored: m.score.home, conceded: m.score.away }
    : { scored: m.score.away, conceded: m.score.home };
}

const byKickoff = (a: Match, b: Match) => +new Date(a.kickoff) - +new Date(b.kickoff);

export const results = (all: Match[] = matches) => all.filter(isPlayed).sort(byKickoff).reverse();
export const fixtures = (all: Match[] = matches) => all.filter((m) => !isPlayed(m)).sort(byKickoff);
export const nextMatch = (all: Match[] = matches): Match | undefined => fixtures(all)[0];
export const lastMatch = (all: Match[] = matches): Match | undefined => results(all)[0];

export const byCompetition = (id: CompetitionId, all: Match[] = matches) =>
  all.filter((m) => m.competition === id);

/** Bilanț V/E/Î și golaveraj, opțional pe o singură competiție. */
export function record(all: Match[] = matches) {
  const played = all.filter(isPlayed);
  const tally = { played: played.length, won: 0, drawn: 0, lost: 0, scored: 0, conceded: 0 };
  for (const m of played) {
    const goals = ourGoals(m)!;
    tally.scored += goals.scored;
    tally.conceded += goals.conceded;
    const res = outcome(m);
    if (res === 'V') tally.won += 1;
    else if (res === 'E') tally.drawn += 1;
    else tally.lost += 1;
  }
  return tally;
}

/** Ultimele rezultate ale echipei, ca serie de forme. */
export const formGuide = (limit = 5, all: Match[] = matches) =>
  results(all)
    .slice(0, limit)
    .map((m) => outcome(m)!)
    .reverse();
