import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Alert from '../../../components/alerts/Alert';
import GroupList from '../../../components/groups/GroupList';
import Skeleton from '../../../components/reusable/Skeleton';
import { useAppSelector } from '../../../hooks/reduxHooks';
import useFetchGroups from '../../../hooks/useFetchGroups';
import { selectAlert } from '../../../redux/reducers/alerts.reducers';

const GroupsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const { groups, loading, error } = useFetchGroups();

  const { alert } = useAppSelector(selectAlert);

  console.log('GroupsScreen', groups);

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
    <SafeAreaView style={{ flex: 1 }}>
      {alert.type ? <Alert /> : null}
      <GroupList
        groups={groups}
        isModalVisible={isModalVisible}
        toggleModal={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default GroupsScreen;
