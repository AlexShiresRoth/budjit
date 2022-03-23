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
      Occasions: {
        screens: {
          OccasionsScreen: 'Occasions',
        },
      },
      Profile: {
        screens: {
          ProfileScreen: 'Profile',
        },
      },
      InvitationsScreen: 'InvitationsScreen',
      GroupInvites: 'GroupInvites',
      OccasionInvitationsScreen: 'OccasionInviationsScreen',
      OccasionInvites: 'OccasionInvites',
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
