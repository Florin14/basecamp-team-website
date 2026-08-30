import type { Competition, CompetitionId, Phase, PhaseInfo } from './types';

const regular = (note: string): PhaseInfo => ({ id: 'regular', label: 'Sezon regulat', note });
const playoff = (note: string): PhaseInfo => ({ id: 'playoff', label: 'Play-off', note });
const playout = (note: string): PhaseInfo => ({ id: 'playout', label: 'Play-out', note });

/**
 * Competițiile în care este înscris FC Base Camp.
 * Structura fazelor pentru AJM este o presupunere — de confirmat cu regulamentul.
 */
export const competitions: Competition[] = [
  {
    id: 'f4f',
    name: 'Friends4Football',
    short: 'F4F Cluj',
    format: 'Campionat',
    scope: 'Friends4Football, Cluj-Napoca',
    season: '2026',
    hasStandings: true,
    playoffCut: 7,
    relegationCount: 1,
    phases: [
      regular('Sezon regulat, doar tur, cu toate echipele înscrise.'),
      playoff('Primele 7 din sezonul regulat se bat pentru titlu.'),
      playout('Restul echipelor, pentru calificarea in play-off-ul care da echipa de pe locul 3 in clasamentul final.'),
    ],
    goal: 'Play-off și lupta pentru titlu',
    accent: '#2563EB',
  },
  {
    id: 'ajm',
    name: 'Campionatul Județean de Minifotbal',
    short: 'AJM Cluj',
    format: 'Campionat',
    scope: 'Asociația Județeană de Minifotbal Cluj',
    season: '2026/2027',
    hasStandings: true,
    playoffCut: 6,
    relegationCount: 1,
    phases: [
      regular('Sezon regulat, tur-retur, cu toate echipele înscrise.'),
      playoff('Primele 6 din sezonul regulat se bat pentru titlul județean.'),
      playout('Restul echipelor, pentru stabilirea clasamentului final.'),
    ],
    goal: 'Play-off și lupta pentru titlul județean',
    accent: '#2563EB',
  },
  {
    id: 'ats',
    name: 'Liga 1 All Time Sport',
    short: 'ATS Cluj',
    format: 'Campionat',
    scope: 'Campionatul All Time Sport, Cluj-Napoca',
    season: '2026/2027',
    hasStandings: true,
    phases: [regular('Clasament unic, tur-retur.')],
    goal: 'Primele trei locuri',
    accent: '#0EA5E9',
  },
  {
    id: 'frm',
    name: 'Turnee naționale',
    short: 'Turnee FRM',
    format: 'Turnee',
    scope: 'Sub egida Federației Române de Minifotbal',
    season: '2026/2027',
    hasStandings: false,
    phases: [],
    goal: '1-2 turnee majore pe an, plus turnee de pregătire',
    accent: '#7C3AED',
  },
];

export const competitionById = (id: CompetitionId): Competition =>
  competitions.find((c) => c.id === id) ?? competitions[0];

export const competitionName = (id: CompetitionId) => competitionById(id).short;

export const leagueCompetitions = () => competitions.filter((c) => c.hasStandings);

/** Are competiția play-off/play-out, sau doar un clasament unic? */
export const hasPhases = (id: CompetitionId) => competitionById(id).phases.length > 1;

export const phaseInfo = (id: CompetitionId, phase: Phase): PhaseInfo | undefined =>
  competitionById(id).phases.find((p) => p.id === phase);
