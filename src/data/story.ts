/** Momentele din istoria clubului, parcurse la scroll. Text de completat cu clubul. */
export const story = [
  {
    year: '2017',
    kicker: 'Începutul',
    title: 'Un grup de oameni și un teren închiriat',
    body: 'FC Base Camp a pornit la Cluj-Napoca dintr-un grup care se strângea săptămânal. Fără sponsor și fără echipament comun, cu taxa de teren împărțită la câți veneau.',
    image: '/img/gallery-6.svg',
    stat: { value: '2017', label: 'anul înființării' },
  },
  {
    year: '2020',
    kicker: 'Structura',
    title: 'De la joacă la program săptămânal',
    body: 'Am trecut de la o întâlnire pe săptămână la patru zile de activitate: antrenamente, jocuri competitive și un calendar ținut de la un capăt la altul de coordonatorul echipei.',
    image: '/img/gallery-2.svg',
    stat: { value: '4', label: 'zile de activitate pe săptămână' },
  },
  {
    year: '2023',
    kicker: 'Competiția',
    title: 'AJM Cluj și Liga 1 All Time Sport',
    body: 'Ne-am înscris în Campionatul Județean de Minifotbal și în Liga 1 All Time Sport, două competiții oficiale în paralel, în fiecare sezon.',
    image: '/img/gallery-4.svg',
    stat: { value: '2', label: 'competiții oficiale locale' },
  },
  {
    year: '2026',
    kicker: 'Astăzi',
    title: 'Turnee naționale și un club cu buget public',
    body: 'Jucăm 4–5 turnee naționale majore pe an, sub egida Federației Române de Minifotbal, plus turnee de pregătire. Bugetul clubului este public, iar membrii contribuie lunar.',
    image: '/img/gallery-1.svg',
    stat: { value: '5', label: 'turnee naționale majore pe an' },
  },
] as const;
