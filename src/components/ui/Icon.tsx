import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
});

export const ArrowRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronLeft = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const ChevronUp = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export const Calendar = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

export const Clock = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Pin = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Ticket = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z" />
    <path d="M14 6v12" strokeDasharray="2 3" />
  </svg>
);

export const Trophy = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
    <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3M9 20h6M12 14v6" />
  </svg>
);

export const Ball = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m12 7.5 3.4 2.5-1.3 4h-4.2l-1.3-4Z" />
    <path d="M12 3v4.5M20.4 9.6 15.4 10M18 19l-3.9-5M6 19l3.9-5M3.6 9.6l5 .4" />
  </svg>
);

export const Users = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3.2 3.2 0 0 1 0 6M17.5 20a5.5 5.5 0 0 0-2-4.2" />
  </svg>
);

export const Mail = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Phone = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 3h3l1.6 4-2 1.4a12 12 0 0 0 5 5L15 11.4 19 13v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </svg>
);

export const Sun = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={2}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={2}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
);

export const Check = ({ size = 16, ...p }: IconProps) => (
  <svg {...base(size)} {...p} strokeWidth={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);
