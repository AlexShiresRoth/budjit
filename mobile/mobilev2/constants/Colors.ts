const tintColorLight = '#fb8c00';
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
    alertBackground: string;
    primaryButton: string;
    secondaryButton: string;
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
    alertBackground: string;
    primaryButton: string;
    secondaryButton: string;
  };
}

export default {
  light: {
    text: '#050517',
    background: '#FFFDFD',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    secondary: tintColorLight + '60',
    danger: '#BD1E1E',
    success: '#1B998B',
    accountBg: '#dddddd',
    cardBg: '#FC814A',
    alertBackground: '#eeeeee',
    primaryButton: '#1B998B',
    secondaryButton: '#032B43',
  },
  dark: {
    text: '#F3EFE0',
    background: '#000011',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    secondary: tintColorDark + '55',
    danger: '#A5402D',
    success: '#035E7B',
    accountBg: '#011936',
    cardBg: '#053225',
    alertBackground: '#333333',
    primaryButton: '#1B998B',
    secondaryButton: '#032B43',
  },
};
