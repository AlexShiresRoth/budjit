import { SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { Group } from '../../../../components/groups/group/Group';
import { GroupStackParamList, RootTabParamList } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  changeCurrentRoute,
  selectNavState,
  showBackButton,
  showHeader,
} from '../../../../redux/reducers/navigation.reducers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

//TODO: figure out how we can hide and show the header for parent and child routes considering that routes don't necessarily change
type Navigation = NativeStackScreenProps<GroupStackParamList, 'GroupScreen'>;
const GroupScreen = ({ navigation, route }: Navigation) => {
  const dispatch = useAppDispatch();

  const navState = useAppSelector(selectNavState);

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
