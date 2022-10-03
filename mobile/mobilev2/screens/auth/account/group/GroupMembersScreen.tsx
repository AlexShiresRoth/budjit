import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { changeCurrentRoute } from '../../../../redux/reducers/navigation.reducers';
import { GroupStackParamList } from '../../../../types';

type Navigation = NativeStackScreenProps<
  GroupStackParamList,
  'GroupMembersScreen'
>;

const GroupMembersScreen = ({ route, navigation }: Navigation) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeCurrentRoute({ route: route.name }));
  }, []);
  return (
    <SafeAreaView>
      <Text>Group Members</Text>
    </SafeAreaView>
  );
};

export default GroupMembersScreen;
