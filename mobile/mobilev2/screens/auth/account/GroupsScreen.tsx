import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Alert from '../../../components/alerts/Alert';
import GroupList from '../../../components/groups/GroupList';
import Skeleton from '../../../components/reusable/Skeleton';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import useFetchGroups from '../../../hooks/useFetchGroups';
import { selectAlert, setAlert } from '../../../redux/reducers/alerts.reducers';
import { RootStackParamList } from '../../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupsScreen'>;

const GroupsScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();

  const [isModalVisible, setModalVisible] = useState(false);

  const [groupCreated, setGroupCreated] = useState(false);

  const { groups, loading, error } = useFetchGroups();

  const { alert } = useAppSelector(selectAlert);

  useEffect(() => {
    if (groupCreated) {
      //close modal on creation
      console.log('group created');
      setModalVisible(false);
      //set an alert that it was created
      dispatch(setAlert({ message: 'Group Created', type: 'success' }));
    }
  }, [groupCreated]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginTop: 2, marginBottom: 2 }}>
          <Skeleton verticalBars={3} />
        </View>
        <View style={{ marginTop: 2, marginBottom: 2 }}>
          <Skeleton verticalBars={3} />
        </View>
        <View style={{ marginTop: 2, marginBottom: 2 }}>
          <Skeleton verticalBars={2} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>{error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 5, paddingBottom: 10 }}>
      {alert.type ? <Alert /> : null}
      <GroupList
        groups={groups}
        isModalVisible={isModalVisible}
        toggleModal={setModalVisible}
        setGroupCreated={setGroupCreated}
        navigation={navigation}
        route={route}
      />
    </View>
  );
};

export default GroupsScreen;
