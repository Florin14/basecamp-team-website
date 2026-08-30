import type { Player, Position } from './types';

/**
 * Placeholder pentru jucătorii fără poză reală încă — cele 6 siluete din
 * `public/img/` se rotesc ciclic. Pozele reale stau în `public/img/players/`
 * și se pun direct pe câmpul `photo`.
 */
const photo = (i: number) => `/img/player-${(i % 6) + 1}.svg`;

/** Lot de 14 jucători — format de minifotbal: 1 portar + 5 jucători de câmp. */
export const squad: Player[] = [
  // ---------- Portari ----------
  {
    id: 'p-1', name: 'Sleam Sebastian', number: 1, position: 'Portar', nationality: 'România',
    birthDate: '1993-03-12', heightCm: 189, foot: 'Dreptul', joined: '2017', photo: photo(0),
    stats: { appearances: 214, goals: 2, assists: 6 },
  },
  // {
  //   id: 'p-2', name: 'Darius Toma', number: 12, position: 'Portar', nationality: 'România',
  //   birthDate: '2000-07-30', heightCm: 184, foot: 'Dreptul', joined: '2024', photo: photo(1),
  //   stats: { appearances: 38, goals: 0, assists: 1 },
  // },

  // ---------- Fundași ----------
  {
    id: 'p-3', name: 'Bogdan Tiut', number: 17, position: 'Fundaș', nationality: 'România',
    birthDate: '1984-05-22', heightCm: 186, foot: 'Dreptul', joined: '2016', photo: '/img/players/bogdan_tiut.jfif',
    stats: { appearances: 268, goals: 24, assists: 31 }, captain: true,
  },
  {
    id: 'p-4', name: 'Rares Muresan', number: 2, position: 'Fundaș', nationality: 'România',
    birthDate: '1994-11-04', heightCm: 179, foot: 'Dreptul', joined: '2019', photo: '/img/players/mury.jpg',
    stats: { appearances: 172, goals: 18, assists: 44 },
  },
  {
    id: 'p-6', name: 'Florin Zimbru', number: 14, position: 'Fundaș', nationality: 'România',
    birthDate: '1996-12-02', heightCm: 183, foot: 'Dreptul', joined: '2025', photo: '/img/players/florin.jpg',
    stats: { appearances: 41, goals: 3, assists: 9 },
  },

  // ---------- Mijlocași ----------
  {
    id: 'p-7', name: 'Paul Petrean', number: 6, position: 'Mijlocas', nationality: 'România',
    birthDate: '1995-08-19', heightCm: 178, foot: 'Dreptul', joined: '2018', photo: '',
    stats: { appearances: 198, goals: 61, assists: 78 },
  },
  {
    id: 'p-8', name: 'Robert Sim', number: 8, position: 'Mijlocas', nationality: 'România',
    birthDate: '1997-01-25', heightCm: 174, foot: 'Stângul', joined: '2020', photo: '/img/players/robi.jpg',
    stats: { appearances: 156, goals: 74, assists: 92 },
  },
  {
    id: 'p-9', name: 'Vlad Rusu', number: 14, position: 'Mijlocas', nationality: 'România',
    birthDate: '2001-03-03', heightCm: 180, foot: 'Dreptul', joined: '2023', photo: '/img/players/vladut.jpg',
    stats: { appearances: 84, goals: 29, assists: 33 },
  },
   {
    id: 'p-10', name: 'Luca Cenan', number: 15, position: 'Mijlocas', nationality: 'România',
    birthDate: '2001-03-03', heightCm: 180, foot: 'Dreptul', joined: '2023', photo: '',
    stats: { appearances: 84, goals: 29, assists: 33 },
  },
   {
    id: 'p-11', name: 'Cristian Steopei', number: 7, position: 'Mijlocas', nationality: 'România',
    birthDate: '2001-03-03', heightCm: 180, foot: 'Dreptul', joined: '2023', photo: '',
    stats: { appearances: 84, goals: 29, assists: 33 },
  },
  // ---------- Atacanți ----------
  {
    id: 'p-12', name: 'Raul Hosu', number: 9, position: 'Atacant', nationality: 'România',
    birthDate: '1996-07-08', heightCm: 184, foot: 'Dreptul', joined: '2019', photo: '/img/players/hosu.jpg',
    stats: { appearances: 181, goals: 148, assists: 52 },
  },
  {
    id: 'p-13', name: 'Tony Tamas', number: 10, position: 'Atacant', nationality: 'România',
    birthDate: '2000-10-07', heightCm: 172, foot: 'Stângul', joined: '2022', photo: '/img/players/tony.jpg',
    stats: { appearances: 122, goals: 96, assists: 61 },
  },
  {
    id: 'p-14', name: 'Stefan Pop Coman', number: 7, position: 'Atacant', nationality: 'România',
    birthDate: '2002-12-19', heightCm: 177, foot: 'Stângul', joined: '2024', photo: '/img/players/stefan-pop-coman.webp',
    stats: { appearances: 63, goals: 38, assists: 24 },
  },
   {
    id: 'p-15', name: 'Raul Pop', number: 24, position: 'Atacant', nationality: 'România',
    birthDate: '2002-12-19', heightCm: 177, foot: 'Stângul', joined: '2024', photo: '',
    stats: { appearances: 63, goals: 38, assists: 24 },
  },
    {
    id: 'p-16', name: 'Norbert Birtalan', number: 27, position: 'Atacant', nationality: 'România',
    birthDate: '2002-12-19', heightCm: 177, foot: 'Stângul', joined: '2024', photo: '',
    stats: { appearances: 63, goals: 38, assists: 24 },
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
