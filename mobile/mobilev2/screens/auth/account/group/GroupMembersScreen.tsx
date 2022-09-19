import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
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
    <View>
      <Text>Group Members</Text>
    </View>
  );
};

export default GroupMembersScreen;
