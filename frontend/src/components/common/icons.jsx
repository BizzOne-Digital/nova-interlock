const base = {
  fill: 'none',
  stroke: '#CBA56A',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const ShieldIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const BrickIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="3" y="7" width="7" height="4" />
    <rect x="14" y="7" width="7" height="4" />
    <rect x="7" y="13" width="7" height="4" />
  </svg>
);

export const MedalIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="12" cy="9" r="5" />
    <path d="M9 13l-2 8 5-3 5 3-2-8" />
  </svg>
);

export const UserCheckIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="10" cy="8" r="4" />
    <path d="M2 20c0-3.3 3.6-5 8-5s8 1.7 8 5" />
    <path d="M17 9l2 2 3-3" />
  </svg>
);

export const PeopleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="8" r="3" />
    <path d="M2 20c0-3 2.7-4.5 6-4.5s6 1.5 6 4.5" />
    <path d="M14 15.5c3.3 0 6 1.5 6 4.5" />
  </svg>
);

export const DrivewayIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M4 20l4-16h8l4 16" />
    <path d="M8 20l1-8h6l1 8" />
  </svg>
);

export const PatioIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="3" y="10" width="18" height="10" />
    <path d="M3 10l9-6 9 6" />
  </svg>
);

export const PathwayIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M6 21c2-6 2-12 0-18" />
    <path d="M18 21c-2-6-2-12 0-18" />
    <path d="M9 12h6" />
  </svg>
);

export const StepsIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M3 21v-4h4v-4h4v-4h4v-4h6" />
  </svg>
);

export const WallIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <rect x="2" y="14" width="6" height="6" />
    <rect x="9" y="14" width="6" height="6" />
    <rect x="16" y="14" width="6" height="6" />
    <rect x="5.5" y="8" width="6" height="6" />
    <rect x="12.5" y="8" width="6" height="6" />
  </svg>
);

export const ExcavationIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M3 21h18" />
    <path d="M5 21l3-9 4 2 4-8 5 15" />
  </svg>
);

export const StoneIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <ellipse cx="8" cy="16" rx="4" ry="2.5" />
    <ellipse cx="15" cy="18" rx="3" ry="2" />
    <ellipse cx="12" cy="12" rx="3.5" ry="2.3" />
  </svg>
);

export const DesignIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <path d="M4 20L16 8l3 3L7 23z" />
    <path d="M13 5l3-3 3 3-3 3z" />
  </svg>
);

export const iconMap = {
  driveway: DrivewayIcon,
  patio: PatioIcon,
  pathway: PathwayIcon,
  steps: StepsIcon,
  wall: WallIcon,
  excavation: ExcavationIcon,
  stone: StoneIcon,
  design: DesignIcon,
};
