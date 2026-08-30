import type { Player, Position } from './types';

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
    id: 'p-3', name: 'Ionuț Preda', number: 4, position: 'Fundaș', nationality: 'România',
    birthDate: '1990-05-22', heightCm: 186, foot: 'Dreptul', joined: '2016', photo: photo(2),
    stats: { appearances: 268, goals: 24, assists: 31 }, captain: true,
  },
  {
    id: 'p-4', name: 'Alexandru Rusu', number: 2, position: 'Fundaș', nationality: 'România',
    birthDate: '1994-11-04', heightCm: 179, foot: 'Dreptul', joined: '2019', photo: photo(3),
    stats: { appearances: 172, goals: 18, assists: 44 },
  },
  {
    id: 'p-5', name: 'Ștefan Coman', number: 3, position: 'Fundaș', nationality: 'România',
    birthDate: '1998-09-15', heightCm: 177, foot: 'Stângul', joined: '2021', photo: photo(4),
    stats: { appearances: 118, goals: 12, assists: 27 },
  },
  {
    id: 'p-6', name: 'Cosmin Barbu', number: 5, position: 'Fundaș', nationality: 'România',
    birthDate: '1996-12-02', heightCm: 183, foot: 'Dreptul', joined: '2025', photo: photo(5),
    stats: { appearances: 41, goals: 3, assists: 9 },
  },

  // ---------- Mijlocași ----------
  {
    id: 'p-7', name: 'Gabriel Enache', number: 6, position: 'Mijlocas', nationality: 'România',
    birthDate: '1995-08-19', heightCm: 178, foot: 'Dreptul', joined: '2018', photo: photo(6),
    stats: { appearances: 198, goals: 61, assists: 78 },
  },
  {
    id: 'p-8', name: 'Tudor Mihalache', number: 8, position: 'Mijlocas', nationality: 'România',
    birthDate: '1997-01-25', heightCm: 174, foot: 'Stângul', joined: '2020', photo: photo(7),
    stats: { appearances: 156, goals: 74, assists: 92 },
  },
  {
    id: 'p-9', name: 'Denis Călin', number: 14, position: 'Mijlocas', nationality: 'România',
    birthDate: '2001-03-03', heightCm: 180, foot: 'Dreptul', joined: '2023', photo: photo(8),
    stats: { appearances: 84, goals: 29, assists: 33 },
  },
  {
    id: 'p-10', name: 'Matei Dinu', number: 20, position: 'Mijlocas', nationality: 'România',
    birthDate: '2003-11-21', heightCm: 176, foot: 'Dreptul', joined: '2026', photo: photo(9),
    stats: { appearances: 9, goals: 4, assists: 5 },
  },
  {
    id: 'p-11', name: 'Amadou Diallo', number: 18, position: 'Mijlocas', nationality: 'Senegal',
    birthDate: '1999-05-30', heightCm: 182, foot: 'Dreptul', joined: '2026', photo: photo(10),
    stats: { appearances: 11, goals: 7, assists: 6 },
  },

  // ---------- Atacanți ----------
  {
    id: 'p-12', name: 'Sergiu Moldovan', number: 9, position: 'Atacant', nationality: 'România',
    birthDate: '1996-07-08', heightCm: 184, foot: 'Dreptul', joined: '2019', photo: photo(11),
    stats: { appearances: 181, goals: 148, assists: 52 },
  },
  {
    id: 'p-13', name: 'Nicolae Sava', number: 10, position: 'Atacant', nationality: 'România',
    birthDate: '2000-10-07', heightCm: 172, foot: 'Stângul', joined: '2022', photo: photo(12),
    stats: { appearances: 122, goals: 96, assists: 61 },
  },
  {
    id: 'p-14', name: 'David Crăciun', number: 7, position: 'Atacant', nationality: 'România',
    birthDate: '2002-12-19', heightCm: 177, foot: 'Stângul', joined: '2024', photo: photo(13),
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
