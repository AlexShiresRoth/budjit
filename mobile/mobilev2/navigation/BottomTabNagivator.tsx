import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SigninScreen from '../screens/auth/SigninScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import LandingScreen from '../screens/LandingScreen';
import { RootTabParamList } from '../types';
import { ADTabBarIcon, FTabBarIcon } from './TabIcons';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNagivator = () => {
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
};

export default BottomTabNagivator;
