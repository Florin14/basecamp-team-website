import type { Player, Position } from './types';

/** Lot de 14 jucători — format de minifotbal: 1 portar + 5 jucători de câmp. */
export const squad: Player[] = [
  // ---------- Portari ----------
  {
    id: 'p-1', name: 'Sleam Sebastian', number: 33, position: 'Portar', nationality: 'România',
    birthDate: '2001-10-18', heightCm: 180, foot: 'Dreptul', joined: '2026', photo: '/img/players/seby_sleam.jpeg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  {
    id: 'p-21', name: 'Rusu Mihai', number: 1, position: 'Portar', nationality: 'România',
    birthDate: '1998-10-16', heightCm: 180, foot: 'Dreptul', joined: '2026', photo: '/img/players/mihai_rusu.JPG',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  // {
  //   id: 'p-2', name: 'Darius Toma', number: 12, position: 'Portar', nationality: 'România',
  //   birthDate: '2000-07-30', heightCm: 184, foot: 'Dreptul', joined: '2024', photo: photo(1),
  //   stats: { appearances: 38, goals: 0, assists: 1 },
  // },

  // ---------- Fundași ----------
  {
    id: 'p-3', name: 'Bogdan Tiut', number: 17, position: 'Fundaș', nationality: 'România',
    birthDate: '1984-11-17', heightCm: 178, foot: 'Dreptul', joined: '2017', photo: '/img/players/bogdan_tiut.jpeg',
    stats: { appearances: 0, goals: 1, assists: 0 }, captain: true,
  },
  {
    id: 'p-4', name: 'Rares Muresan', number: 2, position: 'Fundaș', nationality: 'România',
    birthDate: '1984-05-04', heightCm: 172, foot: 'Dreptul', joined: '2023', photo: '/img/players/mury.jpg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  {
    id: 'p-6', name: 'Florin Zimbru', number: 14, position: 'Fundaș', nationality: 'România',
    birthDate: '2002-04-14', heightCm: 183, foot: 'Stângul', joined: '2026', photo: '/img/players/florin_zimbru.jpeg',
    stats: { appearances: 0, goals: 3, assists: 0 },
  },

  // ---------- Mijlocași ----------
  {
    id: 'p-7', name: 'Paul Petrean', number: 10, position: 'Mijlocas', nationality: 'România',
    birthDate: '1988-04-20', heightCm: 171, foot: 'Ambele', joined: '2017', photo: '/img/players/paul_petrean.jpeg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  {
    id: 'p-8', name: 'Robert Sim', number: 22, position: 'Mijlocas', nationality: 'România',
    birthDate: '2003-04-22', heightCm: 180, foot: 'Dreptul', joined: '2024', photo: '/img/players/robert_sim.jpeg',
    stats: { appearances: 0, goals: 2, assists: 0 },
  },
  {
    id: 'p-9', name: 'Vlad Rusu', number: 78, position: 'Mijlocas', nationality: 'România',
    birthDate: '2000-05-27', heightCm: 181, foot: 'Dreptul', joined: '2022', photo: '/img/players/vladut_rusu.jpeg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
   {
    id: 'p-10', name: 'Luca Cenan', number: 18, position: 'Mijlocas', nationality: 'România',
    birthDate: '2008-08-18', heightCm: 180, foot: 'Dreptul', joined: '2026', photo: '',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },

    {
    id: 'p-19', name: 'Radu Pop', number: 25, position: 'Mijlocas', nationality: 'România',
    birthDate: '2003-05-21', heightCm: 177, foot: 'Dreptul', joined: '2026', photo: '/img/players/radu_pop.JPG',
    stats: { appearances: 0, goals: 1, assists: 0 },
  },
      {
    id: 'p-16', name: 'Norbert Birtalan', number: 27, position: 'Mijlocas', nationality: 'România',
    birthDate: '1995-06-23', heightCm: 174, foot: 'Dreptul', joined: '2026', photo: '/img/players/norby_birtalan.jpeg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  
    {
    id: 'p-17', name: 'Ovidiu Deac', number: 81, position: 'Mijlocas', nationality: 'România',
    birthDate: '1999-10-19', heightCm: 180, foot: 'Dreptul', joined: '2026', photo: '/img/players/ovidiu_deac.jpeg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  {
    id: 'p-14', name: 'Stefan Pop Coman', number: 13, position: 'Mijlocas', nationality: 'România',
    birthDate: '1991-08-03', heightCm: 178, foot: 'Stângul', joined: '2024', photo: '/img/players/stefan_coman.jpeg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  // ---------- Atacanți ----------
  {
    id: 'p-12', name: 'Raul Hosu', number: 9, position: 'Atacant', nationality: 'România',
    birthDate: '2001-06-27', heightCm: 185, foot: 'Dreptul', joined: '2025', photo: '/img/players/raul_hosu.png',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
  {
    id: 'p-13', name: 'Tony Tamas', number: 19, position: 'Atacant', nationality: 'România',
    birthDate: '2003-10-04', heightCm: 176, foot: 'Stângul', joined: '2024', photo: '/img/players/tony_tamas.jpeg',
    stats: { appearances: 0, goals: 1, assists: 0 },
  },
  
   {
    id: 'p-15', name: 'Raul Pop', number: 16, position: 'Atacant', nationality: 'România',
    birthDate: '1991-04-20', heightCm: 179, foot: 'Dreptul', joined: '2026', photo: '/img/players/raul_pop.jpeg',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },

  {
    id: 'p-18', name: 'Claudiu Veres', number: 7, position: 'Atacant', nationality: 'România',
    birthDate: '2000-06-17', heightCm: 177, foot: 'Dreptul', joined: '2025', photo: '',
    stats: { appearances: 0, goals: 0, assists: 0 },
  },
   {
    id: 'p-11', name: 'Cristian Steopei', number: 20, position: 'Atacant', nationality: 'România',
    birthDate: '2004-09-20', heightCm: 173, foot: 'Stângul', joined: '2025', photo: '/img/players/cristi_steopei.png',
    stats: { appearances: 0, goals: 1, assists: 0 },
  },
  {
    id: 'p-20', name: 'Paul Gliga', number: 88, position: 'Atacant', nationality: 'România',
    birthDate: '2005-10-08', heightCm: 182, foot: 'Dreptul', joined: '2026', photo: '/img/players/paul_gliga.JPG',
    stats: { appearances: 0, goals: 2, assists: 0 },
  },
];

export const positionOrder: Position[] = ['Portar', 'Fundaș', 'Mijlocas', 'Atacant'];

export const positionLabels: Record<Position, string> = {
  Portar: 'Portari',
  Fundaș: 'Fundași',
  Mijlocas: 'Mijlocași',
  Atacant: 'Atacanți',
};

export function groupByPosition(players: Player[]) {
  return positionOrder.map((position) => ({
    position,
    label: positionLabels[position],
    players: players.filter((p) => p.position === position).sort((a, b) => a.number - b.number),
  }));
}

export function ageOf(birthDate: string, now = new Date()): number {
  const b = new Date(birthDate);
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age -= 1;
  return age;
}

/** Vârsta medie a lotului, cu o zecimală. */
export function averageAge(players: Player[] = squad): number {
  const total = players.reduce((sum, p) => sum + ageOf(p.birthDate), 0);
  return Math.round((total / players.length) * 10) / 10;
}

/** Golgheterii clubului, pentru clasamentul intern de pe pagina de lot. */
export function topScorers(limit = 5, players: Player[] = squad) {
  return [...players].sort((a, b) => b.stats.goals - a.stats.goals).slice(0, limit);
}
