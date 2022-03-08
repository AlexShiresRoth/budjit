const tintColorLight = '#2f95dc';
const tintColorDark = '#1B9AAA';

export type ColorScheme = { colorScheme: 'light' | 'dark' };

export interface ColorsInterface {
  light: {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    danger: string;
    success: string;
    cardBg: string;
    accountBg: string;
  };
  dark: {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    danger: string;
    success: string;
    cardBg: string;
    accountBg: string;
  };
}

export default {
  light: {
    text: '#fefefe',
    background: '#111122',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    secondary: tintColorDark + '55',
    danger: '#A30015',
    success: '#35FF69',
    accountBg: '#ddd',
    cardBg: '#fefefe',
  },
  dark: {
    text: '#fefefe',
    background: '#111122',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    secondary: tintColorDark + '55',
    danger: '#F0544F',
    success: '#1B9AAA',
    accountBg: '#0a363c90',
    cardBg: '#115e68',
  },
};
