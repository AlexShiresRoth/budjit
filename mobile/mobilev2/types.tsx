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

export type GroupStackParamList = {
  GroupScreenNavigator:
    | undefined
    | ({ screen: any } & { params: { groupId: string } });
  GroupScreen: undefined | { groupId: string };
  GroupMembersScreen: undefined | { groupId: string };
  GroupSettingsScreen: undefined | { groupId: string };
  GroupInvitesScreen: undefined | { groupId: string };
  GroupOccasionsScreen: undefined | { groupId: string };
  GroupTransactionsScreen: undefined | { groupId: string };
  GroupsScreen: undefined;
};

export type OccasionStackParamList = {
  OccasionScreenNavigator: undefined | { params: { occasionId: string } };
  OccasionScreen: undefined | { occasionId: string };
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
  GroupsScreen: undefined | { groupId: string };
  GroupScreen: undefined | { groupId: string };
  GroupScreenNavigator: undefined | { groupId: string };
  OccasionScreenNavigator: undefined | { occasionId: string };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
