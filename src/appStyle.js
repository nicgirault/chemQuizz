import { Platform } from 'react-native';

const navbarOffset = Platform.OS === 'ios' ? 20 : 0;
const navbarBaseHeight = Platform.OS === 'ios' ? 44 : 54;

export const appStyle = {
  navbar: {
    offset: navbarOffset,
    baseHeight: navbarBaseHeight,
    height: navbarBaseHeight + navbarOffset,
  },
  font: {
    fontSize: {
      small: 11,
      default: 13,
      big: 15,
      large: 16,
      huge: 20,
    },
  },
  colors: {
    primary: '#00CE89',
    primaryArray: [223, 66, 37, 1],
    lightText: '#666666',
    textExtraLight: '#E5E5E5',
    background: '#FFFFFF',
    lightBackground: '#F5F5F5',
    buttonText: '#FFFFFF',
    defaultText: '#666666',
    errorMessage: '#FFA500',
    secondary: '#2565df',
    confirmationMessage: '#5cb85c',
  },
  margins: {
    inner: 10,
    outer: 16,
    innerButton: 16,
  },
  dimensions: {
    touchableHeight: 48,
    visibleButtonHeight: 48,
    visibleInputHeight: 38,
    borderRadius: 5,
  },
};

export default appStyle;
