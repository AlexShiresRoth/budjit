import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupList from '../../../components/groups/GroupList';
import Skeleton from '../../../components/reusable/Skeleton';
import useFetchGroups from '../../../hooks/useFetchGroups';

const GroupsScreen = () => {
  const { groups, loading, error } = useFetchGroups();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Skeleton verticalBars={4} />
        <Skeleton verticalBars={3} />
        <Skeleton verticalBars={2} />
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
      <GroupList groups={groups} />
    </SafeAreaView>
  );
};

export default GroupsScreen;
