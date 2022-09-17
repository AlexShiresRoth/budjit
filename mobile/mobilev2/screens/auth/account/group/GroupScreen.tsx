import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import { Group } from '../../../../components/groups/group/Group';
import { RootStackParamList } from '../../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Navigation = NativeStackScreenProps<RootStackParamList, 'GroupScreen'>;
const GroupScreen = ({ navigation, route }: Navigation) => {
  return (
    <SafeAreaView>
      <Group navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default GroupScreen;
