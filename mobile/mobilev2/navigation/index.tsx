import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AccountScreen from '../screens/auth/account/AccountScreen';
import BankConnectionScreen from '../screens/auth/account/BankConnectionScreen';
import InvitationsScreen from '../screens/auth/account/InvitationsScreen';
import OccasionInvitationsScreen from '../screens/auth/account/OccasionInvitationsScreen';
import OccasionsScreen from '../screens/auth/account/OccasionsScreen';
import ProfileScreen from '../screens/auth/account/ProfileScreen';
import SettingsScreen from '../screens/auth/settings/SettingsScreen';
import SigninScreen from '../screens/auth/SigninScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import LandingScreen from '../screens/LandingScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import GroupsScreen from '../screens/auth/account/GroupsScreen';
import GroupScreen from '../screens/auth/account/group/GroupScreen';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectNavState } from '../redux/reducers/navigation.reducers';
import HeaderBackButton from '../components/buttons/HeaderBackButton';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={({ navigation }: RootStackScreenProps<'Root'>) => ({
          title: 'Landing',
          headerShown: false,
        })}
      />
      <Stack.Screen
        component={BottomTabAccountNavigator}
        name="AccountSpace"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />

      <Stack.Screen component={ProfileScreen} name="Profile" />
      {/* located in settings screen */}
      <AccountTabs.Screen
        name="BankConnections"
        component={BankConnectionScreen}
      />
      {/* What modal is this? */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

//Landing screen navigator
//Switches to other tab nav on sign in or up
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
      }}
    >
      <BottomTab.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false, tabBarItemStyle: { display: 'none' } }}
      />
      <BottomTab.Screen
        name="Signin"
        component={SigninScreen}
        options={{
          title: 'Sign In',
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
          tabBarIcon: ({ color }) => (
            <ADTabBarIcon name="login" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FTabBarIcon name="user-plus" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

//Main navigator for authenticated user
const AccountTabs = createBottomTabNavigator<RootTabParamList>();

function BottomTabAccountNavigator() {
  const colorScheme = useColorScheme();

  const { showBackButton } = useAppSelector(selectNavState);

  return (
    <AccountTabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <AccountTabs.Screen
        name="Account"
        component={AccountScreen}
        options={({ navigation }: RootStackScreenProps<'Account'>) => ({
          headerLeft: () => null,
          gestureEnabled: false,
          headerBackVisible: false,
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        })}
      />
      <AccountTabs.Screen
        component={InviteTabNavigator}
        name="InvitationsScreen"
        options={({
          navigation,
        }: RootStackScreenProps<'InvitationsScreen'>) => ({
          title: 'Invites',
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        })}
      />
      <AccountTabs.Screen
        name="GroupsScreen"
        component={GroupsScreen}
        options={() => ({
          title: 'Groups',
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        })}
      />

      <AccountTabs.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={({ navigation }) => ({
          title: 'Group',
          tabBarItemStyle: { display: 'none' },
          headerRight: () => {
            console.log('navigation: ', navigation);
            return showBackButton ? (
              <HeaderBackButton
                navFunction={() =>
                  navigation.getParent().navigate('GroupsScreen')
                }
              />
            ) : null;
          },
        })}
      />
      <AccountTabs.Screen
        component={OccasionsScreen}
        name="Occasions"
        options={() => ({
          title: 'Occasions',
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        })}
      />

      <AccountTabs.Screen
        component={OccasionInviteTabNavigator}
        name="OccasionInvitationsScreen"
        options={({
          navigation,
        }: RootStackScreenProps<'OccasionInvitationsScreen'>) => ({
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
          tabBarShowLabel: false,
          tabBarItemStyle: { display: 'none' },
        })}
      />

      <AccountTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        }}
      />
    </AccountTabs.Navigator>
  );
}

const InviteBottomTab = createBottomTabNavigator<RootTabParamList>();

function InviteTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <InviteBottomTab.Navigator
      initialRouteName="GroupInvites"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: Colors[colorScheme].text,
        tabBarInactiveTintColor: Colors[colorScheme].background + '77',
      }}
    >
      <InviteBottomTab.Screen
        component={InvitationsScreen}
        name="SentGroupInvites"
        options={{
          headerShown: false,
          tabBarLabel: 'Sent',
        }}
      />
      <InviteBottomTab.Screen
        component={InvitationsScreen}
        name="ReceivedGroupInvites"
        options={{
          headerShown: false,
          tabBarLabel: 'Received',
        }}
      />
    </InviteBottomTab.Navigator>
  );
}

const OccasionNavigator = createBottomTabNavigator<RootTabParamList>();

function OccasionInviteTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <OccasionNavigator.Navigator
      initialRouteName="OccasionInvites"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].tint,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: Colors[colorScheme].text,
        tabBarInactiveTintColor: Colors[colorScheme].background + '77',
        headerShown: false,
      }}
      defaultScreenOptions={{ title: 'OccasionInvites' }}
    >
      <OccasionNavigator.Screen
        component={OccasionInvitationsScreen}
        name="SentOccasionInvites"
        options={{
          headerShown: false,
          tabBarLabel: 'Sent',
          title: 'OccasionInvites',
        }}
      />
      <OccasionNavigator.Screen
        component={OccasionInvitationsScreen}
        name="ReceivedOccasionInvites"
        options={{
          headerShown: false,
          tabBarLabel: 'Received',

          title: 'OccasionInvites',
        }}
      />
    </OccasionNavigator.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function FATabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

function ADTabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

function FTabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={24} style={{ marginBottom: -3 }} {...props} />;
}
