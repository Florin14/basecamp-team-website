import type { Sponsor } from './types';

/**
 * Clubul își caută încă partenerii. Lista rămâne goală până la primele
 * contracte — secțiunea afișează locurile disponibile, nu logo-uri inventate.
 */
export const sponsors: Sponsor[] = [];

export const mainSponsor = sponsors.find((s) => s.tier === 'Principal');
