import { FontAwesome } from '@expo/vector-icons';
import {
  BottomTabBarProps,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AccountScreen from '../screens/auth/account/AccountScreen';
import InvitationsScreen from '../screens/auth/account/InvitationsScreen';
import OccasionInvitationsScreen from '../screens/auth/account/OccasionInvitationsScreen';
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
        name="Account"
        component={AccountScreen}
        options={({ navigation }: RootStackScreenProps<'Account'>) => ({
          headerLeft: () => null,
          gestureEnabled: false,
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <TabBarIcon name="cog" color="#333" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen component={SettingsScreen} name="Settings" />
      <Stack.Screen
        component={InviteTabNavigator}
        name="InvitationsScreen"
        options={({
          navigation,
        }: RootStackScreenProps<'InvitationsScreen'>) => ({
          title: 'Group Invites',
          headerShown: false,
        })}
      />
      <Stack.Screen
        component={OccasionInviteTabNavigator}
        name="OccasionInvitationsScreen"
        options={({
          navigation,
        }: RootStackScreenProps<'OccasionInvitationsScreen'>) => ({
          title: 'Occasion Invites',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen component={ProfileScreen} name="Profile" />
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

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Landing"
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
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-plus" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
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
          tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
        }}
      />
      <InviteBottomTab.Screen
        component={InvitationsScreen}
        name="ReceivedGroupInvites"
        options={{
          headerShown: false,
          tabBarLabel: 'Received',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="mail-reply" color={color} />
          ),
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
          tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
          title: 'OccasionInvites',
        }}
      />
      <OccasionNavigator.Screen
        component={OccasionInvitationsScreen}
        name="ReceivedOccasionInvites"
        options={{
          headerShown: false,
          tabBarLabel: 'Received',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="mail-reply" color={color} />
          ),
          title: 'OccasionInvites',
        }}
      />
    </OccasionNavigator.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}
