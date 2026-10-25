import { club } from './club';
import { teams } from './teams';
import type { CompetitionId, Match } from './types';

export { teams } from './teams';

const us = teams.us;

const AJM_VENUE = 'Baza Sportivă Colina';
const PORA = 'Liceul Eugen Pora';
const ENERGETIC = 'Liceul Energetic';
const BRANCUSI = 'Liceul Constantin Brâncuși';
const FLORESTI = 'Stadion Florești';
const CMC = 'Baza CMC';
const UNCONFIRMED_VENUE = 'Locație de stabilit';

/**
 * AJM: toate rezultatele etapei 1 și programul etapei 2, din afișul 2026/2027.
 * Base Camp – Regional: 21 octombrie, 20:30, confirmat de club.
 * Pentru celelalte meciuri ale etapei 1, data și ora nu apar în afiș.
 * ATS: etapele 1–5 și programul etapei 6 din capturile Diviziei A.
 * Meciurile amânate nu au kickoff; 01.01.1970 din sursă nu este o dată reală.
 */
export const matches: Match[] = [
  // ---------- AJM · Etapa 1 ----------
  {
    id: 'ajm-01-lion-hnh', competition: 'ajm', round: 'Etapa 1',
    venue: AJM_VENUE,
    home: teams.lionCubs, away: teams.hnh, score: { home: 1, away: 0 },
  },
  {
    id: 'ajm-01-basecamp-regional', competition: 'ajm', round: 'Etapa 1',
    kickoff: '2026-10-21T20:30:00+03:00', venue: AJM_VENUE,
    home: us, away: teams.regionalFloresti, score: { home: 1, away: 5 },
  },
  {
    id: 'ajm-01-etc-luceafarul', competition: 'ajm', round: 'Etapa 1',
    venue: AJM_VENUE,
    home: teams.etc, away: teams.luceafarul, score: { home: 1, away: 2 },
  },
  {
    id: 'ajm-01-clujana-studentii', competition: 'ajm', round: 'Etapa 1',
    venue: AJM_VENUE,
    home: teams.clujana, away: teams.studentii, score: { home: 2, away: 4 },
  },

  // ---------- AJM · Etapa 2 · Studenții Cluj stă ----------
  {
    id: 'ajm-02-luceafarul-clujana', competition: 'ajm', round: 'Etapa 2',
    kickoff: '2026-10-28T20:30:00+02:00', venue: `${AJM_VENUE} · Terenul 1`,
    home: teams.luceafarul, away: teams.clujana,
  },
  {
    id: 'ajm-02-regional-etc', competition: 'ajm', round: 'Etapa 2',
    kickoff: '2026-10-28T20:30:00+02:00', venue: `${AJM_VENUE} · Terenul 2`,
    home: teams.regionalFloresti, away: teams.etc,
  },
  {
    id: 'ajm-02-hnh-basecamp', competition: 'ajm', round: 'Etapa 2',
    kickoff: '2026-10-28T21:30:00+02:00', venue: `${AJM_VENUE} · Terenul 1`,
    home: teams.hnh, away: us,
  },
  {
    id: 'ajm-02-ucbt-lion', competition: 'ajm', round: 'Etapa 2',
    kickoff: '2026-10-28T21:30:00+02:00', venue: `${AJM_VENUE} · Terenul 2`,
    home: teams.uCbt, away: teams.lionCubs,
  },

  // ---------- ATS · Etapa 1 ----------
  {
    id: 'ats-01-luceafarul-undoi', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-09-25T21:00:00+03:00', venue: PORA,
    home: teams.luceafarul, away: teams.unDoi, score: { home: 10, away: 2 },
  },
  {
    id: 'ats-01-lion-stranierii', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-09-22T21:00:00+03:00', venue: FLORESTI,
    home: teams.lionCubs, away: teams.stranierii, score: { home: 6, away: 2 },
  },
  {
    id: 'ats-01-basecamp-hnh', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-09-23T20:00:00+03:00', venue: PORA,
    home: us, away: teams.hnh, score: { home: 4, away: 9 },
  },
  {
    id: 'ats-01-divg-cvb', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-09-23T20:00:00+03:00', venue: CMC,
    home: teams.divg, away: teams.cvbEngineering, score: { home: 1, away: 2 },
  },
  {
    id: 'ats-01-ust-transilvania', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-09-21T21:00:00+03:00', venue: PORA,
    home: teams.ust, away: teams.transilvania, score: { home: 6, away: 6 },
  },
  {
    id: 'ats-01-arobs-eagles', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-09-24T19:00:00+03:00', venue: PORA,
    home: teams.arobs, away: teams.eagles, score: { home: 6, away: 4 },
  },
  {
    id: 'ats-01-safety-amarena', competition: 'ats', round: 'Etapa 1',
    kickoff: '2026-09-21T20:00:00+03:00', venue: BRANCUSI,
    home: teams.safetyGroup, away: teams.amarena, score: { home: 4, away: 1 },
  },

  // ---------- ATS · Etapa 2 ----------
  {
    id: 'ats-02-stranierii-luceafarul', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-09-30T20:00:00+03:00', venue: PORA,
    home: teams.stranierii, away: teams.luceafarul, score: { home: 0, away: 1 },
  },
  {
    id: 'ats-02-lion-basecamp', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-10-02T21:00:00+03:00', venue: FLORESTI,
    home: teams.lionCubs, away: us, score: { home: 18, away: 0 },
  },
  {
    id: 'ats-02-cvb-hnh', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-09-29T20:00:00+03:00', venue: ENERGETIC,
    home: teams.cvbEngineering, away: teams.hnh, score: { home: 14, away: 8 },
  },
  {
    id: 'ats-02-eagles-transilvania', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-09-30T21:00:00+03:00', venue: 'Club Winners',
    home: teams.eagles, away: teams.transilvania, score: { home: 1, away: 7 },
  },
  {
    id: 'ats-02-amarena-arobs', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-10-02T20:00:00+03:00', venue: CMC,
    home: teams.amarena, away: teams.arobs, score: { home: 2, away: 5 },
  },
  {
    id: 'ats-02-undoi-safety', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-09-30T21:00:00+03:00', venue: ENERGETIC,
    home: teams.unDoi, away: teams.safetyGroup, score: { home: 0, away: 12 },
  },
  {
    id: 'ats-02-ust-divg', competition: 'ats', round: 'Etapa 2',
    kickoff: '2026-09-28T21:00:00+03:00', venue: PORA,
    home: teams.ust, away: teams.divg, score: { home: 5, away: 5 },
  },

  // ---------- ATS · Etapa 3 ----------
  {
    id: 'ats-03-undoi-stranierii', competition: 'ats', round: 'Etapa 3',
    kickoff: '2026-10-14T19:00:00+03:00', venue: 'Club Transilvania · Terenul 2',
    home: teams.unDoi, away: teams.stranierii, score: { home: 6, away: 4 },
  },
  {
    id: 'ats-03-basecamp-luceafarul', competition: 'ats', round: 'Etapa 3',
    kickoff: '2026-10-07T20:00:00+03:00', venue: PORA,
    home: us, away: teams.luceafarul, score: { home: 2, away: 7 },
  },
  {
    id: 'ats-03-lion-cvb', competition: 'ats', round: 'Etapa 3',
    kickoff: '2026-10-06T22:00:00+03:00', venue: 'Club Transilvania · Terenul 1',
    home: teams.lionCubs, away: teams.cvbEngineering, score: { home: 7, away: 3 },
  },
  {
    id: 'ats-03-hnh-ust', competition: 'ats', round: 'Etapa 3',
    kickoff: '2026-10-05T20:00:00+03:00', venue: PORA,
    home: teams.hnh, away: teams.ust, score: { home: 5, away: 3 },
  },
  {
    id: 'ats-03-divg-eagles', competition: 'ats', round: 'Etapa 3',
    postponed: true, venue: UNCONFIRMED_VENUE,
    home: teams.divg, away: teams.eagles,
  },
  {
    id: 'ats-03-transilvania-amarena', competition: 'ats', round: 'Etapa 3',
    kickoff: '2026-10-06T20:00:00+03:00', venue: ENERGETIC,
    home: teams.transilvania, away: teams.amarena, score: { home: 3, away: 5 },
  },
  {
    id: 'ats-03-safety-arobs', competition: 'ats', round: 'Etapa 3',
    kickoff: '2026-10-05T20:00:00+03:00', venue: BRANCUSI,
    home: teams.safetyGroup, away: teams.arobs, score: { home: 6, away: 3 },
  },

  // ---------- ATS · Etapa 4 ----------
  {
    id: 'ats-04-stranierii-basecamp', competition: 'ats', round: 'Etapa 4',
    kickoff: '2026-10-14T20:00:00+03:00', venue: PORA,
    home: teams.stranierii, away: us, score: { home: 7, away: 1 },
  },
  {
    id: 'ats-04-cvb-luceafarul', competition: 'ats', round: 'Etapa 4',
    kickoff: '2026-10-19T21:30:00+03:00', venue: ENERGETIC,
    home: teams.cvbEngineering, away: teams.luceafarul, score: { home: 3, away: 5 },
  },
  {
    id: 'ats-04-lion-ust', competition: 'ats', round: 'Etapa 4',
    kickoff: '2026-10-13T22:00:00+03:00', venue: 'Club Transilvania · Terenul 1',
    home: teams.lionCubs, away: teams.ust, score: { home: 10, away: 4 },
  },
  {
    id: 'ats-04-hnh-eagles', competition: 'ats', round: 'Etapa 4',
    kickoff: '2026-10-13T20:00:00+03:00', venue: 'Liceul cu Program Sportiv Cluj-Napoca',
    home: teams.hnh, away: teams.eagles, score: { home: 1, away: 1 },
  },
  {
    id: 'ats-04-amarena-divg', competition: 'ats', round: 'Etapa 4',
    postponed: true, venue: UNCONFIRMED_VENUE,
    home: teams.amarena, away: teams.divg,
  },
  {
    id: 'ats-04-safety-transilvania', competition: 'ats', round: 'Etapa 4',
    kickoff: '2026-10-12T20:00:00+03:00', venue: BRANCUSI,
    home: teams.safetyGroup, away: teams.transilvania, score: { home: 5, away: 3 },
  },
  {
    id: 'ats-04-arobs-undoi', competition: 'ats', round: 'Etapa 4',
    postponed: true, venue: UNCONFIRMED_VENUE,
    home: teams.arobs, away: teams.unDoi,
  },

  // ---------- ATS · Etapa 5 ----------
  {
    id: 'ats-05-undoi-basecamp', competition: 'ats', round: 'Etapa 5',
    kickoff: '2026-10-20T21:00:00+03:00', venue: ENERGETIC,
    home: teams.unDoi, away: us, score: { home: 7, away: 4 },
  },
  {
    id: 'ats-05-stranierii-cvb', competition: 'ats', round: 'Etapa 5',
    kickoff: '2026-10-21T20:00:00+03:00', venue: PORA,
    home: teams.stranierii, away: teams.cvbEngineering, score: { home: 4, away: 2 },
  },
  {
    id: 'ats-05-luceafarul-ust', competition: 'ats', round: 'Etapa 5',
    kickoff: '2026-10-23T21:00:00+03:00', venue: PORA,
    home: teams.luceafarul, away: teams.ust, score: { home: 3, away: 4 },
  },
  {
    id: 'ats-05-lion-eagles', competition: 'ats', round: 'Etapa 5',
    kickoff: '2026-10-23T21:00:00+03:00', venue: FLORESTI,
    home: teams.lionCubs, away: teams.eagles, score: { home: 13, away: 1 },
  },
  {
    id: 'ats-05-amarena-hnh', competition: 'ats', round: 'Etapa 5',
    kickoff: '2026-10-23T20:00:00+03:00', venue: CMC,
    home: teams.amarena, away: teams.hnh, score: { home: 2, away: 4 },
  },
  {
    id: 'ats-05-divg-safety', competition: 'ats', round: 'Etapa 5',
    postponed: true, venue: UNCONFIRMED_VENUE,
    home: teams.divg, away: teams.safetyGroup,
  },
  {
    id: 'ats-05-transilvania-arobs', competition: 'ats', round: 'Etapa 5',
    kickoff: '2026-10-20T20:00:00+03:00', venue: ENERGETIC,
    home: teams.transilvania, away: teams.arobs, score: { home: 9, away: 0 },
  },

  // ---------- ATS · Etapa 6 ----------
  {
    id: 'ats-06-cvb-basecamp', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-27T20:00:00+02:00', venue: ENERGETIC,
    home: teams.cvbEngineering, away: us,
  },
  {
    id: 'ats-06-ust-stranierii', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-28T20:00:00+02:00', venue: PORA,
    home: teams.ust, away: teams.stranierii,
  },
  {
    id: 'ats-06-eagles-luceafarul', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-27T20:30:00+02:00', venue: 'Liceul Tehnofrig',
    home: teams.eagles, away: teams.luceafarul,
  },
  {
    id: 'ats-06-amarena-lion', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-30T20:00:00+02:00', venue: CMC,
    home: teams.amarena, away: teams.lionCubs,
  },
  {
    id: 'ats-06-hnh-safety', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-26T21:00:00+02:00', venue: PORA,
    home: teams.hnh, away: teams.safetyGroup,
  },
  {
    id: 'ats-06-arobs-divg', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-29T19:00:00+02:00', venue: PORA,
    home: teams.arobs, away: teams.divg,
  },
  {
    id: 'ats-06-undoi-transilvania', competition: 'ats', round: 'Etapa 6',
    kickoff: '2026-10-28T21:00:00+02:00', venue: ENERGETIC,
    home: teams.unDoi, away: teams.transilvania,
  },
];

export const isPlayed = (m: Match) => m.score !== undefined;
export const isHome = (m: Match) => m.home.name === club.name;
export const isOurMatch = (m: Match) => isHome(m) || m.away.name === club.name;

/** Rezultatul din perspectiva clubului. */
export function outcome(m: Match): 'V' | 'E' | 'Î' | null {
  if (!m.score || !isOurMatch(m)) return null;
  const ours = isHome(m) ? m.score.home : m.score.away;
  const theirs = isHome(m) ? m.score.away : m.score.home;
  if (ours > theirs) return 'V';
  if (ours < theirs) return 'Î';
  return 'E';
}

/** Golurile marcate și primite de echipă într-un meci jucat. */
export function ourGoals(m: Match) {
  if (!m.score || !isOurMatch(m)) return null;
  return isHome(m)
    ? { scored: m.score.home, conceded: m.score.away }
    : { scored: m.score.away, conceded: m.score.home };
}

/** Meciurile fără dată confirmată rămân la final, în ambele ordini. */
const byKickoff = (a: Match, b: Match, newestFirst = false) => {
  if (!a.kickoff) return b.kickoff ? 1 : 0;
  if (!b.kickoff) return -1;
  const delta = +new Date(a.kickoff) - +new Date(b.kickoff);
  return newestFirst ? -delta : delta;
};

export const results = (all: Match[] = matches) =>
  all.filter(isPlayed).sort((a, b) => byKickoff(a, b, true));
export const fixtures = (all: Match[] = matches) =>
  all.filter((m) => !isPlayed(m)).sort((a, b) => byKickoff(a, b));
export const nextMatch = (all: Match[] = matches): Match | undefined =>
  fixtures(all).find((m) => isOurMatch(m) && !m.postponed);
export const lastMatch = (all: Match[] = matches): Match | undefined => results(all).find(isOurMatch);

export const byCompetition = (id: CompetitionId, all: Match[] = matches) =>
  all.filter((m) => m.competition === id);

/** Bilanț V/E/Î și golaveraj, opțional pe o singură competiție. */
export function record(all: Match[] = matches) {
  const played = all.filter((m) => isPlayed(m) && isOurMatch(m));
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
    .filter(isOurMatch)
    .slice(0, limit)
    .map((m) => outcome(m)!)
    .reverse();
