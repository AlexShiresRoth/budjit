import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Router } from 'express';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { changeCurrentRoute } from '../../../../redux/reducers/navigation.reducers';
import { GroupStackParamList } from '../../../../types';

type Navigation = NativeStackScreenProps<
  GroupStackParamList,
  'GroupInvitesScreen'
>;

const GroupInvitesScreen = ({ route }: Navigation) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeCurrentRoute({ route: route.name }));
  }, []);

  return (
    <View>
      <Text>Group invites screen</Text>
    </View>
  );
};

export default GroupInvitesScreen;
