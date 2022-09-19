import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import OccasionInvitationsScreen from '../screens/auth/account/OccasionInvitationsScreen';
import { RootTabParamList } from '../types';

const OccasionNavigator = createBottomTabNavigator<RootTabParamList>();

const OccasionTabNavigator = () => {
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
};

export default OccasionTabNavigator;
