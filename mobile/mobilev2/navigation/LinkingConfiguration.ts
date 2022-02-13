/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Landing: {
            screens: {
              LandingScreen: 'Landing',
            },
          },
          Signin: {
            screens: {
              SigninScreen: 'Sign In',
            },
          },
          Signup: {
            screens: {
              SignupScreen: 'Sign Up',
            },
          },
        },
      },
      Account: {
        screens: {
          AccountScreen: 'Account',
        },
      },
      Settings: {
        screens: {
          SettingsScreen: 'Settings',
        },
      },
      Profile: {
        screens: {
          ProfileScreen: 'Profile',
        },
      },
      InvitationsScreen: {
        screens: {
          Invitations: 'Invitations',
        },
      },

      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
