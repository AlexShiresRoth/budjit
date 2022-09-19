import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HeaderBackButton from '../components/buttons/HeaderBackButton';
import { useAppSelector } from '../hooks/reduxHooks';
import useColorScheme from '../hooks/useColorScheme';
import { selectNavState } from '../redux/reducers/navigation.reducers';
import GroupInvitesScreen from '../screens/auth/account/group/GroupInvitesScreen';
import GroupMembersScreen from '../screens/auth/account/group/GroupMembersScreen';
import GroupOccasionsScreen from '../screens/auth/account/group/GroupOccasionsScreen';
import GroupScreen from '../screens/auth/account/group/GroupScreen';
import GroupSettingsScreen from '../screens/auth/account/group/GroupSettingsScreen';
import GroupTransactionsScreen from '../screens/auth/account/group/GroupTransactionsScreen';
import { GroupStackParamList } from '../types';

//Navigator for singlegroup screen
const GroupStack = createNativeStackNavigator<GroupStackParamList>();

const GroupStackNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={({ navigation }) => ({
          title: 'Group',
          headerShown: true,
          tabBarItemStyle: { display: 'none' },
          headerRight: () => {
            return (
              <HeaderBackButton
                navFunction={() =>
                  navigation.getParent().navigate('GroupsScreen')
                }
              />
            );
          },
        })}
      />
      <GroupStack.Screen
        name="GroupMembersScreen"
        component={GroupMembersScreen}
        options={({ navigation }) => ({
          title: 'Group Members',
        })}
      />
      <GroupStack.Screen
        name="GroupInvitesScreen"
        component={GroupInvitesScreen}
        options={({ navigation }) => ({
          title: 'Group Invites',
        })}
      />
      <GroupStack.Screen
        name="GroupSettingsScreen"
        component={GroupSettingsScreen}
        options={({ navigation }) => ({
          title: 'Group Settings',
        })}
      />
      <GroupStack.Screen
        name="GroupOccasionsScreen"
        component={GroupOccasionsScreen}
        options={({ navigation }) => ({
          title: 'Group Occasions',
        })}
      />
      <GroupStack.Screen
        name="GroupTransactionsScreen"
        component={GroupTransactionsScreen}
        options={({ navigation }) => ({
          title: 'Group Transactions',
        })}
      />
    </GroupStack.Navigator>
  );
};

export default GroupStackNavigator;
