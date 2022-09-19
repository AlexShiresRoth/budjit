import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import BankConnectionScreen from '../screens/auth/account/BankConnectionScreen';
import ProfileScreen from '../screens/auth/account/ProfileScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootStackScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { AccountTabs } from './AccountTabNavigator';
import AccountTabNavigator from './AccountTabNavigator';
import BottomTabNagivator from './BottomTabNagivator';

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
        component={BottomTabNagivator}
        options={({ navigation }: RootStackScreenProps<'Root'>) => ({
          title: 'Landing',
          headerShown: false,
        })}
      />
      <Stack.Screen
        component={AccountTabNavigator}
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
