import { SafeAreaView, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Group } from '../../../../components/groups/group/Group';
import { RootStackParamList, RootTabParamList } from '../../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import {
  changeCurrentRoute,
  showBackButton,
} from '../../../../redux/reducers/navigation.reducers';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Navigation = BottomTabScreenProps<RootTabParamList, 'GroupScreen'>;
const GroupScreen = ({ navigation, route }: Navigation) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // set route to show back button on this screen because header overlap
    dispatch(changeCurrentRoute({ route: route.name }));
    dispatch(showBackButton({ show: true }));
  }, [route]);
  return (
    <SafeAreaView>
      <Group navigation={navigation} route={route} />
    </SafeAreaView>
  );
};

export default GroupScreen;
