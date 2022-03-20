const tintColorLight = '#2f95dc';
const tintColorDark = '#09BC8A';

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
    text: '#F3EFE0',
    background: '#000011',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    secondary: tintColorDark + '55',
    danger: '#E3170A',
    success: '#035E7B',
    accountBg: '#011936',
    cardBg: '#053225',
  },
};
