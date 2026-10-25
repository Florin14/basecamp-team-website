import { club } from './club';
import type { Team } from './types';

export const DEFAULT_TEAM_CREST = '/img/teams/default.svg';

const opponent = (name: string, short: string, filename?: string): Team => ({
  name,
  short,
  crest: filename ? `/img/teams/${filename}` : DEFAULT_TEAM_CREST,
});

/** Echipe comune celor două competiții; siglele lipsă folosesc imaginea implicită. */
export const teams = {
  us: { name: club.name, short: 'BSC', crest: '/img/teams/basecamp.jpeg' } satisfies Team,
  // AJM Cluj (Lion Cubs, Luceafărul și HNH participă și la ATS).
  regionalFloresti: opponent('ACS Regional Florești', 'REG', 'regional.jpg'),
  studentii: opponent('ACS Studenții Cluj Napoca', 'STU', 'studentii.jpg'),
  luceafarul: opponent('CS Luceafărul Cluj', 'LUC', 'luceafarul.jpg'),
  lionCubs: opponent('ACS Lion Cubs', 'LIO', 'lion cubs.jpg'),
  uCbt: opponent('CS U CBT', 'UCB', 'cbt.jpg'),
  etc: opponent('CS ETC', 'ETC', 'etc.jpg'),
  hnh: opponent('AS HNH Cluj-Napoca', 'HNH', 'hnh.jpg'),
  clujana: opponent('CFF Clujana', 'CFF', 'clujana.jpg'),
  // ATS Cluj, Divizia A.
  safetyGroup: opponent('Safety Group', 'SAF', 'safety.jpg'),
  transilvania: opponent('Transilvania FC', 'TRA', 'transilvania.jpg'),
  unDoi: opponent('UN-DOI.RO', 'UND', 'un-doi.jfif'),
  cvbEngineering: opponent('CVB Engineering', 'CVB', 'cvb_engineering.jpg'),
  arobs: opponent('Asociația Sportivă AROBS', 'ARO', 'arobs.jpg'),
  stranierii: opponent('ACS Stranierii 2009', 'STR', 'stranierii.jfif'),
  ust: opponent('UST Cluj', 'UST', 'ust.png'),
  amarena: opponent('Amarena', 'AMA', 'amarena.jpeg'),
  eagles: opponent('FC Eagles Cluj', 'EAG', 'fc_eagles.jpeg'),
  divg: opponent('Asociația Club Sportiv DIVG Cluj', 'DIV', 'gemina.jpg'),
};

export const teamByName = (name: string): Team | undefined =>
  Object.values(teams).find((team) => team.name === name);
