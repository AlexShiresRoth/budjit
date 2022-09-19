import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import GroupSettings from '../../../../components/groups/group/group-settings/GroupSettings';
import { GroupStackParamList } from '../../../../types';

type NavType = NativeStackScreenProps<
  GroupStackParamList,
  'GroupSettingsScreen'
>;

const GroupSettingsScreen = ({ navigation, route }: NavType) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GroupSettings navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default GroupSettingsScreen;
