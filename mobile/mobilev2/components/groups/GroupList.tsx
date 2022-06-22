import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GroupType } from '../../types/Groups.types';
import FloatingButton from '../buttons/FloatingButton';
import GroupItem from './GroupItem';

type GroupListProps = {
  groups: Array<GroupType>;
};

//TODO create new group creation modal

const GroupList = ({ groups }: GroupListProps) => {
  const [modalVisible, toggleModal] = useState(false);
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
      <FloatingButton
        modalToggle={toggleModal}
        modalVisible={modalVisible}
        modalComponent={<Text>Hello</Text>}
        buttonText="New Group"
      />
    </View>
  );
};

export default GroupList;
