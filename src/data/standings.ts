import { club } from './club';
import { competitionById } from './competitions';
import type { CompetitionId, Phase, StandingRow } from './types';

const us = club.name;

/** Clasamente pe competiție și pe fază. Fazele care nu au început încă lipsesc. */
export type StandingsMap = Partial<Record<CompetitionId, Partial<Record<Phase, StandingRow[]>>>>;

export const standings: StandingsMap = {
  ajm: {
    regular: [
      { position: 1, team: 'AS Someșeni', short: 'SOM', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 14, goalsAgainst: 6, points: 9, form: ['V', 'V', 'V'] },
      { position: 2, team: us, short: 'BSC', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 13, goalsAgainst: 9, points: 6, form: ['V', 'Î', 'V'] },
      { position: 3, team: 'Gruia Minifotbal', short: 'GRU', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 11, goalsAgainst: 8, points: 6, form: ['Î', 'V', 'V'] },
      { position: 4, team: 'Mănăștur United', short: 'MAN', played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 9, goalsAgainst: 7, points: 5, form: ['E', 'V', 'E'] },
      { position: 5, team: 'Florești FC', short: 'FLO', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 10, goalsAgainst: 10, points: 4, form: ['V', 'E', 'Î'] },
      { position: 6, team: 'Apahida Team', short: 'APA', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 9, goalsAgainst: 12, points: 3, form: ['V', 'Î', 'Î'] },
      { position: 7, team: 'Mărăști Sport', short: 'MAR', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 7, goalsAgainst: 10, points: 3, form: ['Î', 'V', 'Î'] },
      { position: 8, team: 'Zorilor FC', short: 'ZOR', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 8, goalsAgainst: 12, points: 3, form: ['Î', 'V', 'Î'] },
      { position: 9, team: 'Baciu Minifotbal', short: 'BAC', played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 6, goalsAgainst: 8, points: 2, form: ['E', 'Î', 'E'] },
      { position: 10, team: 'Someș Sport', short: 'SMS', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 5, goalsAgainst: 10, points: 1, form: ['E', 'Î', 'Î'] },
    ],
  },
  ats: {
    regular: [
      { position: 1, team: 'Napoca All Stars', short: 'NAP', played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 8, goalsAgainst: 5, points: 4, form: ['E', 'V'] },
      { position: 2, team: us, short: 'BSC', played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 10, goalsAgainst: 5, points: 4, form: ['E', 'V'] },
      { position: 3, team: 'Ferdinand Team', short: 'FER', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 7, goalsAgainst: 6, points: 3, form: ['V', 'Î'] },
      { position: 4, team: 'Polus United', short: 'POL', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 6, points: 3, form: ['Î', 'V'] },
      { position: 5, team: 'Iris Sport', short: 'IRI', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 6, points: 3, form: ['V', 'Î'] },
      { position: 6, team: 'Bună Ziua FC', short: 'BZI', played: 2, won: 0, drawn: 2, lost: 0, goalsFor: 4, goalsAgainst: 4, points: 2, form: ['E', 'E'] },
      { position: 7, team: 'Gheorgheni Team', short: 'GHE', played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 5, points: 1, form: ['Î', 'E'] },
      { position: 8, team: 'Dâmbul Rotund', short: 'DAM', played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 10, points: 1, form: ['E', 'Î'] },
    ],
  },
};

export const standingsFor = (
  id: CompetitionId,
  phase: Phase = 'regular',
  source: StandingsMap = standings,
): StandingRow[] => source[id]?.[phase] ?? [];

/** Fazele care au deja rânduri publicate. */
export const availablePhases = (id: CompetitionId, source: StandingsMap = standings): Phase[] =>
  competitionById(id)
    .phases.filter((p) => (source[id]?.[p.id]?.length ?? 0) > 0)
    .map((p) => p.id);

export const ourRow = (
  id: CompetitionId,
  phase: Phase = 'regular',
  source: StandingsMap = standings,
) => standingsFor(id, phase, source).find((r) => r.team === club.name);

export type Zone = 'promotion' | 'playoff' | 'playout' | 'relegation';

/**
 * Zona în care se află o poziție. În sezonul regulat marchează cine prinde
 * play-off-ul; în play-off cine promovează, în play-out cine retrogradează.
 */
export function zoneOf(
  id: CompetitionId,
  position: number,
  phase: Phase = 'regular',
  source: StandingsMap = standings,
): Zone | null {
  const competition = competitionById(id);
  const table = standingsFor(id, phase, source);
  if (!table.length) return null;

  if (phase === 'playout') {
    const relegated = competition.relegationCount ?? 0;
    return relegated && position > table.length - relegated ? 'relegation' : null;
  }
  if (phase === 'playoff') {
    return position <= 2 ? 'promotion' : null;
  }
  // Sezon regulat
  if (competition.playoffCut) {
    return position <= competition.playoffCut ? 'playoff' : 'playout';
  }
  if (position === 1) return 'promotion';
  return position <= 3 ? 'playoff' : null;
}

/** Legenda de sub tabel, diferită de la o fază la alta. */
export function zoneLegend(id: CompetitionId, phase: Phase = 'regular') {
  const competition = competitionById(id);
  if (phase === 'playout') {
    return competition.relegationCount
      ? [{ zone: 'relegation' as const, label: 'Retrogradare' }]
      : [];
  }
  if (phase === 'playoff') {
    return [{ zone: 'promotion' as const, label: 'Calificare la turneul final' }];
  }
  if (competition.playoffCut) {
    return [
      { zone: 'playoff' as const, label: `Play-off (primele ${competition.playoffCut})` },
      { zone: 'playout' as const, label: 'Play-out' },
    ];
  }
  return [
    { zone: 'promotion' as const, label: 'Câștigătoare' },
    { zone: 'playoff' as const, label: 'Podium' },
  ];
}

export const goalDiff = (row: StandingRow) => row.goalsFor - row.goalsAgainst;
