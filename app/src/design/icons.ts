/**
 * Tier 0: icons as data. Each is a set of SVG path strings on a 24 × 24 grid, drawn by the Icon
 * fundamental with a stroke. Drawn for this project; no icon font, CDN or emoji.
 */
export const ICONS = {
  home: ['M4 11 12 4l8 7', 'M6 10v10h12V10', 'M10 20v-6h4v6'],
  codex: ['M4 5h7v14H4z', 'M13 5h7v14h-7z', 'M6.5 9h2', 'M15.5 9h2'],
  unlocks: ['M7 11V8a5 5 0 0 1 9.6-2', 'M5 11h14v9H5z', 'M12 14.5v2.5'],
  builds: ['M5 5h6v6H5z', 'M13 5h6v6h-6z', 'M5 13h6v6H5z', 'M13 13h6v6h-6z'],
  progress: ['M4 12.5 9 17.5 20 6.5'],
  settings: ['M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z', 'M12 2.5v3', 'M12 18.5v3', 'M2.5 12h3', 'M18.5 12h3', 'M5.3 5.3l2.1 2.1', 'M16.6 16.6l2.1 2.1', 'M5.3 18.7l2.1-2.1', 'M16.6 7.4l2.1-2.1'],
  grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
  list: ['M4 6h2', 'M9 6h11', 'M4 12h2', 'M9 12h11', 'M4 18h2', 'M9 18h11'],
  table: ['M4 5h16v14H4z', 'M4 10h16', 'M4 15h16', 'M10 5v14'],
  details: ['M4 4h16v6H4z', 'M4 13h16', 'M4 17h10'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  back: ['M15 5l-7 7 7 7'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  skip: ['M5.5 6.5 13 12l-7.5 5.5z', 'M17.5 6.5v11'],
  search: ['M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z', 'M15.5 15.5 20 20'],
  plus: ['M12 5v14', 'M5 12h14'],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  external: ['M14 4h6v6', 'M20 4l-9 9', 'M18 14v6H4V6h6'],
  pairings: ['M8.5 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z', 'M15.5 11a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z'],
  eye: ['M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z', 'M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'],
  moon: ['M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z'],
  sort: ['M8 4v16', 'M4.5 7.5 8 4l3.5 3.5', 'M16 20V4', 'M12.5 16.5 16 20l3.5-3.5'],
  group: ['M4 5h16', 'M7 9h13', 'M7 12h13', 'M4 16h16', 'M7 20h13'],
  chevron: ['M7 10l5 5 5-5'],
  'chevron-end': ['M10 7l5 5-5 5'],
  up: ['M12 19V5', 'M6.5 10.5 12 5l5.5 5.5'],
  down: ['M12 5v14', 'M6.5 13.5 12 19l5.5-5.5'],
  crowd: ['M9 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 'M3.5 20a5.5 5.5 0 0 1 11 0', 'M15.5 6.2a3 3 0 0 1 0 5.6', 'M17.5 14.6A5.5 5.5 0 0 1 20.5 20'],
  'crowd-max': ['M4 3h16', 'M9 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z', 'M4 20.5a5 5 0 0 1 10 0', 'M15.5 8.2a2.5 2.5 0 0 1 0 4.6', 'M17.5 15.6A5 5 0 0 1 20 20.5'],
  timer: ['M12 6.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M12 13.5V10', 'M9.5 3h5', 'M12 3v3.5'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;

/** Kind shapes: the non-colour twin of each kind colour (design system "Game-domain roles"). */
export const SHAPES = {
  weapon: 'M12 2.5 21.5 12 12 21.5 2.5 12z',
  evolution: 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z',
  passive: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  character: 'M12 2.5 20 5.5v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z',
  stage: 'M4 4h16v16H4z',
  arcana: 'M7 2.5h10a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V4A1.5 1.5 0 0 1 7 2.5z',
  relic: 'M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z',
  powerup: 'M12 3 21.5 20h-19z',
  secret: 'M12 3a4.5 4.5 0 0 0-2 8.5L8.5 21h7L14 11.5A4.5 4.5 0 0 0 12 3z',
} as const;

export type Kind = keyof typeof SHAPES;
