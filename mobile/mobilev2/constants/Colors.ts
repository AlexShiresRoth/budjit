const tintColorLight = '#6BAB90';
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
  };
}

export default {
  light: {
    text: '#2E4052',
    background: '#FFFDFD',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    secondary: tintColorLight + '60',
    danger: '#BD1E1E',
    success: '#5299D3',
    accountBg: '#ddd',
    cardBg: '#FC814A',
    alertBackground: '#eeeeee',
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
  },
};
