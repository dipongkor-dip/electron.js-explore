export type ThemeColors = {
  background: string;
  text: string;
  heading: string;
  surface: string;
  sidebar: string;
  accent: string;
};

export type ThemeColorKey = 'background' | 'text' | 'heading' | 'sidebar';
export type ThemePresetMode = 'light' | 'dark';

type ThemePreset = {
  name: string;
  mode: ThemePresetMode;
  colors: ThemeColors;
};

export const defaultTheme: ThemeColors = {
  background: '#f4f6f3',
  text: '#59645c',
  heading: '#243129',
  surface: '#ffffff',
  sidebar: '#172522',
  accent: '#4c9a72',
};

export const themePresets: ThemePreset[] = [
  { name: 'Fern', mode: 'light', colors: defaultTheme },
  {
    name: 'Cobalt',
    mode: 'light',
    colors: {
      background: '#edf3f8',
      text: '#465668',
      heading: '#1e3449',
      surface: '#ffffff',
      sidebar: '#1d2c3a',
      accent: '#397da6',
    },
  },
  {
    name: 'Ember',
    mode: 'light',
    colors: {
      background: '#f7f0e9',
      text: '#68584d',
      heading: '#3c2d25',
      surface: '#fffdfb',
      sidebar: '#30231e',
      accent: '#bd704b',
    },
  },
  {
    name: 'Night',
    mode: 'dark',
    colors: {
      background: '#19231f',
      text: '#c0cdc5',
      heading: '#edf5ef',
      surface: '#222e28',
      sidebar: '#111a16',
      accent: '#83c89a',
    },
  },
  {
    name: 'Obsidian',
    mode: 'dark',
    colors: {
      background: '#171b24',
      text: '#b9c3d4',
      heading: '#f1f4fb',
      surface: '#222936',
      sidebar: '#10141c',
      accent: '#8fb6ff',
    },
  },
  {
    name: 'Graphite',
    mode: 'dark',
    colors: {
      background: '#1d2022',
      text: '#c6cccc',
      heading: '#f0f3f2',
      surface: '#292e30',
      sidebar: '#15191a',
      accent: '#70d2bf',
    },
  },
  {
    name: 'Deep Ocean',
    mode: 'dark',
    colors: {
      background: '#102229',
      text: '#b9d0d2',
      heading: '#e9f7f6',
      surface: '#193239',
      sidebar: '#0a181d',
      accent: '#43b7ad',
    },
  },
  {
    name: 'Plum',
    mode: 'dark',
    colors: {
      background: '#241a28',
      text: '#d7c7dc',
      heading: '#f5ebf8',
      surface: '#302335',
      sidebar: '#19121c',
      accent: '#ce91cf',
    },
  },
  {
    name: 'Copper',
    mode: 'dark',
    colors: {
      background: '#28201b',
      text: '#d9cbc0',
      heading: '#fff0e4',
      surface: '#352a23',
      sidebar: '#1d1713',
      accent: '#e59a64',
    },
  },
  {
    name: 'Blackout',
    mode: 'dark',
    colors: {
      background: '#08090a',
      text: '#c5c9cc',
      heading: '#f5f7f8',
      surface: '#111315',
      sidebar: '#030405',
      accent: '#a2d7b2',
    },
  },
  {
    name: 'Glacier',
    mode: 'light',
    colors: {
      background: '#eef5f5',
      text: '#4f6264',
      heading: '#233d40',
      surface: '#fbffff',
      sidebar: '#243b3d',
      accent: '#388f8b',
    },
  },
  {
    name: 'Coral',
    mode: 'light',
    colors: {
      background: '#fcf0ec',
      text: '#67504c',
      heading: '#472c29',
      surface: '#fffaf8',
      sidebar: '#34211f',
      accent: '#cb725e',
    },
  },
];

const isHexColor = (value: unknown): value is string =>
  typeof value === 'string' && /^#[\da-f]{6}$/i.test(value);

export const loadTheme = (): ThemeColors => {
  try {
    const stored = JSON.parse(
      localStorage.getItem('system-monitor-theme') ?? 'null',
    );
    if (stored && typeof stored === 'object') {
      return Object.fromEntries(
        Object.entries(defaultTheme).map(([key, fallback]) => [
          key,
          isHexColor(stored[key]) ? stored[key] : fallback,
        ]),
      ) as ThemeColors;
    }
  } catch {
    return defaultTheme;
  }
  return defaultTheme;
};
