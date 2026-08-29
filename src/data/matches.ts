import { club } from './club';
import type { CompetitionId, Match, Team } from './types';

const us: Team = { name: club.name, short: 'BSC', crest: club.crest };

const opponent = (name: string, short: string, crestIndex: number): Team => ({
  name,
  short,
  crest: `/img/crest-${(crestIndex % 6) + 1}.svg`,
});

/**
 * Adversarii sunt încă date demo — se înlocuiesc din Supabase, prin aplicația
 * de scraping, fără deploy.
 */
export const teams = {
  us,
  // AJM Cluj
  someseni: opponent('AS Someșeni', 'SOM', 0),
  gruia: opponent('Gruia Minifotbal', 'GRU', 1),
  manastur: opponent('Mănăștur United', 'MAN', 2),
  floresti: opponent('Florești FC', 'FLO', 3),
  apahida: opponent('Apahida Team', 'APA', 4),
  marasti: opponent('Mărăști Sport', 'MAR', 5),
  zorilor: opponent('Zorilor FC', 'ZOR', 0),
  baciu: opponent('Baciu Minifotbal', 'BAC', 1),
  // ATS Cluj
  atsNapoca: opponent('Napoca All Stars', 'NAP', 2),
  atsFerdinand: opponent('Ferdinand Team', 'FER', 3),
  atsPolus: opponent('Polus United', 'POL', 4),
  atsIris: opponent('Iris Sport', 'IRI', 5),
  atsBuna: opponent('Bună Ziua FC', 'BZI', 0),
  atsGheorgheni: opponent('Gheorgheni Team', 'GHE', 1),
  atsDambul: opponent('Dâmbul Rotund', 'DAM', 2),
  // Turnee naționale
  turneuOradea: opponent('CS Oradea Mini', 'ORA', 3),
  turneuTimis: opponent('Timiș Select', 'TIM', 4),
};

const HOME = club.venue;

/** Meciurile sezonului. Date demo până la conectarea sursei live. */
export const matches: Match[] = [
  {
    id: 'm-01', competition: 'ajm', round: 'Etapa 1',
    kickoff: '2026-08-04T20:00:00+03:00', venue: HOME,
    home: us, away: teams.someseni, score: { home: 5, away: 2 },
    report: 'Start bun de campionat, cu trei goluri în ultimele opt minute.',
  },
  {
    id: 'm-02', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-08-07T21:00:00+03:00', venue: 'Baza sportivă All Time Sport, Cluj-Napoca',
    home: teams.atsNapoca, away: us, score: { home: 3, away: 3 },
    report: 'Egalare în ultimele secunde, cu portarul trimis în atac.',
  },
  {
    id: 'm-03', competition: 'ajm', round: 'Etapa 2',
    kickoff: '2026-08-11T20:00:00+03:00', venue: 'Sala Gruia, Cluj-Napoca',
    home: teams.gruia, away: us, score: { home: 2, away: 4 },
    report: 'A doua victorie în AJM, cu o dublă a lui Nicolae Sava.',
  },
  {
    id: 'm-04', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-08-14T21:00:00+03:00', venue: HOME,
    home: us, away: teams.atsFerdinand, score: { home: 6, away: 1 },
    report: 'Cel mai bun meci ofensiv al verii.',
  },
  {
    id: 'm-05', competition: 'frm', round: 'Turneu național · grupe',
    kickoff: '2026-08-22T11:00:00+03:00', venue: 'Complex sportiv, Oradea',
    home: us, away: teams.turneuOradea, score: { home: 3, away: 1 },
    report: 'Calificare din grupă la primul turneu major al sezonului.',
  },
  {
    id: 'm-06', competition: 'frm', round: 'Turneu național · sferturi',
    kickoff: '2026-08-22T16:30:00+03:00', venue: 'Complex sportiv, Oradea',
    home: teams.turneuTimis, away: us, score: { home: 4, away: 3 },
    report: 'Eliminare în sferturi, după prelungiri.',
  },
  {
    id: 'm-07', competition: 'ajm', round: 'Etapa 3',
    kickoff: '2026-08-25T20:00:00+03:00', venue: HOME,
    home: us, away: teams.manastur, score: { home: 4, away: 0 },
    report: 'Primul meci fără gol primit din acest sezon.',
  },

  // ---------- Programate ----------
  {
    id: 'm-08', competition: 'ats', round: 'Etapa 3',
    kickoff: '2026-09-04T21:00:00+03:00', venue: HOME,
    home: us, away: teams.atsPolus,
  },
  {
    id: 'm-09', competition: 'ajm', round: 'Etapa 4',
    kickoff: '2026-09-08T20:00:00+03:00', venue: 'Sala Florești',
    home: teams.floresti, away: us,
  },
  {
    id: 'm-10', competition: 'ats', round: 'Etapa 4',
    kickoff: '2026-09-11T21:00:00+03:00', venue: 'Baza sportivă Iris, Cluj-Napoca',
    home: teams.atsIris, away: us,
  },
  {
    id: 'm-11', competition: 'ajm', round: 'Etapa 5',
    kickoff: '2026-09-15T20:00:00+03:00', venue: HOME,
    home: us, away: teams.apahida,
  },
  {
    id: 'm-12', competition: 'frm', round: 'Turneu de pregătire',
    kickoff: '2026-09-19T10:00:00+03:00', venue: 'Complex sportiv, Turda',
    home: us, away: teams.turneuTimis,
  },
  {
    id: 'm-13', competition: 'ats', round: 'Etapa 5',
    kickoff: '2026-09-25T21:00:00+03:00', venue: HOME,
    home: us, away: teams.atsBuna,
  },
  {
    id: 'm-14', competition: 'ajm', round: 'Etapa 6',
    kickoff: '2026-09-29T20:00:00+03:00', venue: 'Sala Mărăști, Cluj-Napoca',
    home: teams.marasti, away: us,
  },
  {
    id: 'm-15', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-02T21:00:00+03:00', venue: 'Sala Gheorgheni, Cluj-Napoca',
    home: teams.atsGheorgheni, away: us,
  },
  {
    id: 'm-16', competition: 'ajm', round: 'Etapa 7',
    kickoff: '2026-10-06T20:00:00+03:00', venue: HOME,
    home: us, away: teams.zorilor,
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
