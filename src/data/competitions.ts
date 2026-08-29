import type { Competition, CompetitionId, Phase, PhaseInfo } from './types';

const regular = (note: string): PhaseInfo => ({ id: 'regular', label: 'Sezon regulat', note });
const playoff = (note: string): PhaseInfo => ({ id: 'playoff', label: 'Play-off', note });
const playout = (note: string): PhaseInfo => ({ id: 'playout', label: 'Play-out', note });

/** Competițiile în care FC Base Camp este înscris în sezonul 2026/2027. */
export const competitions: Competition[] = [
  {
    id: 'lnm',
    name: 'Liga Națională de Minifotbal',
    short: 'Liga Națională',
    format: 'Campionat',
    scope: 'Seria C — Centru',
    season: '2026/2027',
    hasStandings: true,
    playoffCut: 6,
    relegationCount: 1,
    phases: [
      regular('Toate cele 10 echipe, tur-retur, 18 etape.'),
      playoff('Primele 6 după sezonul regulat, cu jumătate din punctele acumulate.'),
      playout('Ultimele 4 după sezonul regulat. Ultima clasată retrogradează.'),
    ],
    goal: 'Play-off și un loc în primele două, pentru turneul final',
    accent: '#2563EB',
  },
  {
    id: 'cupa',
    name: 'Cupa României la Minifotbal',
    short: 'Cupa României',
    format: 'Cupă',
    scope: 'Fază națională, eliminatoriu',
    season: '2026/2027',
    hasStandings: false,
    phases: [],
    goal: 'Sferturile de finală',
    accent: '#7C3AED',
  },
  {
    id: 'judetean',
    name: 'Campionatul Județean Brașov',
    short: 'Campionatul Județean',
    format: 'Campionat',
    scope: 'Județul Brașov',
    season: '2026/2027',
    hasStandings: true,
    playoffCut: 4,
    phases: [
      regular('Opt echipe, tur-retur, 14 etape.'),
      playoff('Primele 4, cu punctele păstrate integral. Câștigătoarea ia titlul județean.'),
      playout('Ultimele 4, pentru stabilirea clasamentului final.'),
    ],
    goal: 'Apărarea titlului câștigat în 2025',
    accent: '#0EA5E9',
  },
  {
    id: 'corporate',
    name: 'Liga Corporate Brașov',
    short: 'Liga Corporate',
    format: 'Campionat',
    scope: 'Competiție de companii, ediția a VIII-a',
    season: '2026/2027',
    hasStandings: true,
    phases: [regular('Opt echipe, tur-retur, 14 etape. Clasament unic, fără play-off.')],
    goal: 'Podium',
    accent: '#059669',
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
