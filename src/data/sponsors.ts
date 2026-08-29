import type { Sponsor } from './types';

export const sponsors: Sponsor[] = [
  { name: 'Base Camp Outdoor', tier: 'Principal', url: 'https://example.com/', logo: '/img/sponsor-1.svg' },
  { name: 'Kron Logistic', tier: 'Oficial', url: 'https://example.com/', logo: '/img/sponsor-2.svg' },
  { name: 'Alpin Software', tier: 'Oficial', url: 'https://example.com/', logo: '/img/sponsor-3.svg' },
  { name: 'Nordis Sport', tier: 'Oficial', url: 'https://example.com/', logo: '/img/sponsor-4.svg' },
  { name: 'Poiana Mineral', tier: 'Partener', url: 'https://example.com/', logo: '/img/sponsor-5.svg' },
  { name: 'Kronstadt Media', tier: 'Partener', url: 'https://example.com/', logo: '/img/sponsor-6.svg' },
  { name: 'Delta Systems', tier: 'Partener', url: 'https://example.com/', logo: '/img/sponsor-7.svg' },
  { name: 'Carpat Media', tier: 'Partener', url: 'https://example.com/', logo: '/img/sponsor-8.svg' },
];

export const mainSponsor = sponsors.find((s) => s.tier === 'Principal');
