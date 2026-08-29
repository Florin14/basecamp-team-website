import { selectFrom } from '../lib/remote';
import { competitions } from './competitions';
import type { StandingsMap } from './standings';
import type { CompetitionId, Match, Phase, StandingRow } from './types';

/** Rândurile așa cum vin din tabelele Supabase. */
type MatchRow = {
  id: string;
  competition: string;
  round: string;
  kickoff: string;
  venue: string;
  home_name: string;
  home_short: string;
  home_crest: string | null;
  away_name: string;
  away_short: string;
  away_crest: string | null;
  home_score: number | null;
  away_score: number | null;
  report: string | null;
  updated_at: string | null;
};

type StandingRowRecord = {
  competition: string;
  phase: string | null;
  position: number;
  team: string;
  short: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  points: number;
  form: string[] | null;
  updated_at: string | null;
};

const knownCompetition = (value: string): CompetitionId | null =>
  competitions.some((c) => c.id === value) ? (value as CompetitionId) : null;

const knownPhase = (value: string | null): Phase =>
  value === 'playoff' || value === 'playout' ? value : 'regular';

const DEFAULT_CREST = '/img/crest-1.svg';

function toMatch(row: MatchRow): Match | null {
  const competition = knownCompetition(row.competition);
  if (!competition) return null;

  return {
    id: row.id,
    competition,
    round: row.round,
    kickoff: row.kickoff,
    venue: row.venue,
    home: {
      name: row.home_name,
      short: row.home_short,
      crest: row.home_crest ?? DEFAULT_CREST,
    },
    away: {
      name: row.away_name,
      short: row.away_short,
      crest: row.away_crest ?? DEFAULT_CREST,
    },
    score:
      row.home_score === null || row.away_score === null
        ? undefined
        : { home: row.home_score, away: row.away_score },
    report: row.report ?? undefined,
  };
}

function toStandingRow(row: StandingRowRecord): StandingRow {
  const form = (row.form ?? []).filter(
    (value): value is 'V' | 'E' | 'Î' => value === 'V' || value === 'E' || value === 'Î',
  );
  return {
    phase: knownPhase(row.phase),
    position: row.position,
    team: row.team,
    short: row.short,
    played: row.played,
    won: row.won,
    drawn: row.drawn,
    lost: row.lost,
    goalsFor: row.goals_for,
    goalsAgainst: row.goals_against,
    points: row.points,
    form,
  };
}

const latest = (values: (string | null)[]) => {
  const sorted = values.filter((v): v is string => Boolean(v)).sort();
  return sorted.length ? sorted[sorted.length - 1] : null;
};

export type RemoteSnapshot = {
  matches: Match[];
  standings: StandingsMap;
  updatedAt: string | null;
};

/** Aduce meciurile și clasamentele publicate de aplicația de scraping. */
export async function fetchSnapshot(signal?: AbortSignal): Promise<RemoteSnapshot> {
  const [matchRows, standingRows] = await Promise.all([
    selectFrom<MatchRow>('matches', 'select=*&order=kickoff.asc', signal),
    selectFrom<StandingRowRecord>(
      'standings',
      'select=*&order=competition.asc,phase.asc,position.asc',
      signal,
    ),
  ]);

  const matches = matchRows.map(toMatch).filter((m): m is Match => m !== null);

  const standings: StandingsMap = {};
  for (const row of standingRows) {
    const competition = knownCompetition(row.competition);
    if (!competition) continue;
    const phase = knownPhase(row.phase);
    const byPhase = (standings[competition] ??= {});
    (byPhase[phase] ??= []).push(toStandingRow(row));
  }

  return {
    matches,
    standings,
    updatedAt: latest([
      ...matchRows.map((r) => r.updated_at),
      ...standingRows.map((r) => r.updated_at),
    ]),
  };
}
