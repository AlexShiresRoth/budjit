import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import InvitationsScreen from '../screens/auth/account/InvitationsScreen';
import { RootTabParamList } from '../types';

const InviteBottomTab = createBottomTabNavigator<RootTabParamList>();

const InviteTabNavigator = () => {
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
};

export default InviteTabNavigator;
