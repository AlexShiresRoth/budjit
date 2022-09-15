/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Account: undefined;
  GroupsScreen: undefined;
  GroupScreen: { groupId: string };
  Landing: undefined;
  Signin: undefined;
  Signup: undefined;
  Profile: undefined;
  InvitationsScreen: undefined | { name: string };
  OccasionInvitationsScreen: undefined | { name: string };
  OccasionInvites: undefined;
  GroupInvites: undefined;
  AccountSpace: undefined;
  Settings: undefined;
  Occasions: undefined;
  BankConnections: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Landing: undefined;
  Signin: undefined;
  Signup: undefined;
  route: any | undefined;
  navigation: any | undefined;
  Profile: undefined;
  Account: undefined;
  AccountSpace: undefined;
  InvitationsScreen: undefined | { name: string };
  OccasionInvitationsScreen: undefined | { name: string };
  SentOccasionInvites: undefined | { name: string };
  OccasionInvites: undefined | { name: string };
  ReceivedOccasionInvites: undefined | { name: string };
  SentGroupInvites: undefined | { name: string };
  ReceivedGroupInvites: undefined | { name: string };
  GroupInvites: undefined | { name: string };
  Settings: undefined;
  Occasions: undefined;
  BankConnections: undefined;
  Groups: undefined;
  GroupScreen: undefined | { groupId: string };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
