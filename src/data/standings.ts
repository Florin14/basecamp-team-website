import { club } from './club';
import { competitionById } from './competitions';
import { teams } from './teams';
import type { CompetitionId, Phase, StandingRow } from './types';

const us = club.name;

/** Clasamente pe competiție și pe fază. Fazele care nu au început încă lipsesc. */
export type StandingsMap = Partial<Record<CompetitionId, Partial<Record<Phase, StandingRow[]>>>>;

export const standings: StandingsMap = {
  // f4f: {
  //   regular: [
  //     { position: 1, team: 'AS Someșeni', short: 'SOM', played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 14, goalsAgainst: 6, points: 9, form: ['V', 'V', 'V'] },
  //     { position: 2, team: us, short: 'BSC', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 13, goalsAgainst: 9, points: 6, form: ['V', 'Î', 'V'] },
  //     { position: 3, team: 'Gruia Minifotbal', short: 'GRU', played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 11, goalsAgainst: 8, points: 6, form: ['Î', 'V', 'V'] },
  //     { position: 4, team: 'Mănăștur United', short: 'MAN', played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 9, goalsAgainst: 7, points: 5, form: ['E', 'V', 'E'] },
  //     { position: 5, team: 'Florești FC', short: 'FLO', played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 10, goalsAgainst: 10, points: 4, form: ['V', 'E', 'Î'] },
  //     { position: 6, team: 'Apahida Team', short: 'APA', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 9, goalsAgainst: 12, points: 3, form: ['V', 'Î', 'Î'] },
  //     { position: 7, team: 'Mărăști Sport', short: 'MAR', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 7, goalsAgainst: 10, points: 3, form: ['Î', 'V', 'Î'] },
  //     { position: 8, team: 'Zorilor FC', short: 'ZOR', played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 8, goalsAgainst: 12, points: 3, form: ['Î', 'V', 'Î'] },
  //     { position: 9, team: 'Baciu Minifotbal', short: 'BAC', played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 6, goalsAgainst: 8, points: 2, form: ['E', 'Î', 'E'] },
  //     { position: 10, team: 'Someș Sport', short: 'SMS', played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 5, goalsAgainst: 10, points: 1, form: ['E', 'Î', 'Î'] },
  //   ],
  // },
  ajm: {
    // Ordinea oficială din afișul etapei 1; golaverajul rezultă din cele 4 scoruri.
    // ACS Base Camp din AJM este același club cu FC Base Camp de pe site.
    regular: [
      { position: 1, team: teams.regionalFloresti.name, short: 'REG', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, points: 3, form: ['V'] },
      { position: 2, team: teams.studentii.name, short: 'STU', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 2, points: 3, form: ['V'] },
      { position: 3, team: teams.luceafarul.name, short: 'LUC', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, points: 3, form: ['V'] },
      { position: 4, team: teams.lionCubs.name, short: 'LIO', played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 1, goalsAgainst: 0, points: 3, form: ['V'] },
      { position: 5, team: teams.uCbt.name, short: 'UCB', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, form: [] },
      { position: 6, team: teams.etc.name, short: 'ETC', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, points: 0, form: ['Î'] },
      { position: 7, team: teams.hnh.name, short: 'HNH', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 1, points: 0, form: ['Î'] },
      { position: 8, team: teams.clujana.name, short: 'CFF', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 4, points: 0, form: ['Î'] },
      { position: 9, team: us, short: 'BSC', played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 5, points: 0, form: ['Î'] },
    ],
  },
  ats: {
    // Clasamentul publicat după etapa 5, verificat cu cele 31 de rezultate ATS.
    // Meciurile amânate nu contribuie la bilanț; ordinea este cea din tabelul oficial.
    regular: [
      { position: 1, team: teams.lionCubs.name, short: 'LIO', played: 5, won: 5, drawn: 0, lost: 0, goalsFor: 54, goalsAgainst: 10, points: 15, form: ['V', 'V', 'V', 'V', 'V'] },
      { position: 2, team: teams.safetyGroup.name, short: 'SAF', played: 4, won: 4, drawn: 0, lost: 0, goalsFor: 27, goalsAgainst: 7, points: 12, form: ['V', 'V', 'V', 'V'] },
      { position: 3, team: teams.luceafarul.name, short: 'LUC', played: 5, won: 4, drawn: 0, lost: 1, goalsFor: 26, goalsAgainst: 11, points: 12, form: ['V', 'V', 'V', 'V', 'Î'] },
      { position: 4, team: teams.hnh.name, short: 'HNH', played: 5, won: 3, drawn: 1, lost: 1, goalsFor: 27, goalsAgainst: 24, points: 10, form: ['V', 'Î', 'V', 'E', 'V'] },
      { position: 5, team: teams.transilvania.name, short: 'TRA', played: 5, won: 2, drawn: 1, lost: 2, goalsFor: 28, goalsAgainst: 17, points: 7, form: ['E', 'V', 'Î', 'Î', 'V'] },
      { position: 6, team: teams.unDoi.name, short: 'UND', played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 15, goalsAgainst: 30, points: 6, form: ['Î', 'Î', 'V', 'V'] },
      { position: 7, team: teams.cvbEngineering.name, short: 'CVB', played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 24, goalsAgainst: 25, points: 6, form: ['V', 'V', 'Î', 'Î', 'Î'] },
      { position: 8, team: teams.arobs.name, short: 'ARO', played: 4, won: 2, drawn: 0, lost: 2, goalsFor: 14, goalsAgainst: 21, points: 6, form: ['V', 'V', 'Î', 'Î'] },
      { position: 9, team: teams.stranierii.name, short: 'STR', played: 5, won: 2, drawn: 0, lost: 3, goalsFor: 17, goalsAgainst: 16, points: 6, form: ['Î', 'Î', 'Î', 'V', 'V'] },
      { position: 10, team: teams.ust.name, short: 'UST', played: 5, won: 1, drawn: 2, lost: 2, goalsFor: 22, goalsAgainst: 29, points: 5, form: ['E', 'E', 'Î', 'Î', 'V'] },
      { position: 11, team: teams.amarena.name, short: 'AMA', played: 4, won: 1, drawn: 0, lost: 3, goalsFor: 10, goalsAgainst: 16, points: 3, form: ['Î', 'Î', 'V', 'Î'] },
      { position: 12, team: teams.eagles.name, short: 'EAG', played: 4, won: 0, drawn: 1, lost: 3, goalsFor: 7, goalsAgainst: 27, points: 1, form: ['Î', 'Î', 'E', 'Î'] },
      { position: 13, team: teams.divg.name, short: 'DIV', played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 6, goalsAgainst: 7, points: 1, form: ['Î', 'E'] },
      { position: 14, team: us, short: 'BSC', played: 5, won: 0, drawn: 0, lost: 5, goalsFor: 11, goalsAgainst: 48, points: 0, form: ['Î', 'Î', 'Î', 'Î', 'Î'] },
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
