export { club, navLinks } from './club';
export {
  competitionById,
  competitionName,
  competitions,
  hasPhases,
  leagueCompetitions,
  phaseInfo,
} from './competitions';
export { gallery } from './gallery';
export {
  budget,
  coveragePlan,
  kitPlacements,
  monthlyTiers,
  partnerBenefits,
  partnerReach,
  seasonTiers,
  strategy,
} from './partnership';
export type { KitPlacementId } from './partnership';
export { story } from './story';
export {
  byCompetition,
  fixtures,
  formGuide,
  isHome,
  isPlayed,
  lastMatch,
  matches,
  nextMatch,
  ourGoals,
  outcome,
  record,
  results,
  teams,
} from './matches';
export {
  articleBySlug,
  featuredArticle,
  latestNews,
  news,
  newsCategories,
  relatedArticles,
} from './news';
export {
  ageOf,
  averageAge,
  groupByPosition,
  positionLabels,
  positionOrder,
  squad,
  topScorers,
} from './squad';
export {
  availablePhases,
  goalDiff,
  ourRow,
  standings,
  standingsFor,
  zoneLegend,
  zoneOf,
} from './standings';
export type { StandingsMap, Zone } from './standings';
export { DataProvider, useClubData } from './DataProvider';
export { staff } from './staff';
export { mainSponsor, sponsors } from './sponsors';
export type * from './types';
