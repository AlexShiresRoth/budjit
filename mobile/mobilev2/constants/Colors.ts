const tintColorLight = '#2f95dc';
const tintColorDark = '#8980F5';

export interface ColorsInterface {
  light: {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    danger: string;
    success: string;
  };
  dark: {
    text: string;
    background: string;
    tint: string;
    tabIconDefault: string;
    tabIconSelected: string;
    danger: string;
    success: string;
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
  },
  dark: {
    text: '#fefefe',
    background: '#111122',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    secondary: tintColorDark + '55',
    danger: '#FF8484',
    success: '#4DCCBD',
  },
};
