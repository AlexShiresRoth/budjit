import React from 'react';
import { FlatList, View } from 'react-native';
import { GroupType } from '../../types/Groups.types';
import GroupItem from './GroupItem';

type GroupListProps = {
  groups: Array<GroupType>;
};

const GroupList = ({ groups }: GroupListProps) => {
  const renderItem = ({ item }: { item: GroupType }) => {
    return <GroupItem item={item} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={groups}
        keyExtractor={(group) => group._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default GroupList;
