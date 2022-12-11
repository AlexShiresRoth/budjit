import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HeaderBackButton from '../components/buttons/HeaderBackButton';
import Colors from '../constants/Colors';
import { useAppSelector } from '../hooks/reduxHooks';
import useColorScheme from '../hooks/useColorScheme';
import { selectNavState } from '../redux/reducers/navigation.reducers';
import AccountScreen from '../screens/auth/account/AccountScreen';
import GroupsScreen from '../screens/auth/account/GroupsScreen';
import OccasionsScreen from '../screens/auth/account/occasions/OccasionsScreen';
import SettingsScreen from '../screens/auth/settings/SettingsScreen';
import { RootStackScreenProps, RootTabParamList } from '../types';
import GroupStackNavigator from './GroupStackNavigator';
import InviteTabNavigator from './InviteTabNavigator';
import { OccasionStackNavigator } from './OccasionStackNavigator';
import OccasionTabNavigator from './OccasionTabNavigator';
import { ADTabBarIcon, ITabBarIcon } from './TabIcons';

//Main navigator for authenticated user
export const AccountTabs = createBottomTabNavigator<RootTabParamList>();

const AccountTabNavigator = () => {
  const colorScheme = useColorScheme();

  const { showBackButton, currentRoute } = useAppSelector(selectNavState);

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
          tabBarIcon: ({ color }) => (
            <ITabBarIcon name="home-outline" color={color} />
          ),
        })}
      />
      {/* <AccountTabs.Screen
        component={InviteTabNavigator}
        name="InvitationsScreen"
        options={({
          navigation,
        }: RootStackScreenProps<'InvitationsScreen'>) => ({
          title: 'Invites',
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
          tabBarIcon: ({ color }) => <ADTabBarIcon name="mail" color={color} />,
        })}
      /> */}
      <AccountTabs.Screen
        name="GroupsScreen"
        component={GroupsScreen}
        options={() => ({
          title: 'Groups',
          tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
          tabBarIcon: ({ color }) => (
            <ITabBarIcon name="people-outline" color={color} />
          ),
        })}
      />

      <AccountTabs.Screen
        name="GroupScreenNavigator"
        component={GroupStackNavigator}
        options={({ navigation }) => ({
          title: 'Group',
          headerShown: false,
          tabBarItemStyle: { display: 'none' },
          headerRight: () => {
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
          tabBarIcon: ({ color }) => (
            <ADTabBarIcon name="calendar" color={color} />
          ),
        })}
      />

      <AccountTabs.Screen
        component={OccasionStackNavigator}
        name="OccasionScreenNavigator"
        options={({ navigation }) => ({
          title: 'Occasion',
          headerShown: false,
          tabBarItemStyle: { display: 'none' },
          headerRight: () => {
            return showBackButton ? (
              <HeaderBackButton
                navFunction={() =>
                  navigation.getParent().navigate('OccasionsScreen')
                }
              />
            ) : null;
          },
        })}
      ></AccountTabs.Screen>

      <AccountTabs.Screen
        component={OccasionTabNavigator}
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
          tabBarIcon: ({ color }) => (
            <ITabBarIcon name="settings-outline" color={color} />
          ),
        }}
      />
    </AccountTabs.Navigator>
  );
};

export default AccountTabNavigator;
