import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GroupType } from '../../types/Groups.types';
import FloatingButton from '../buttons/FloatingButton';
import EmptyState from '../reusable/EmptyState';
import CreateGroupModal from './CreateGroupModal';
import GroupItem from './GroupItem';

type GroupListProps = {
  groups: Array<GroupType>;
  isModalVisible: boolean;
  toggleModal: (isModalVisible: boolean) => void;
};

const GroupList = ({ groups, isModalVisible, toggleModal }: GroupListProps) => {
  const renderItem = ({ item }: { item: GroupType }) => {
    return <GroupItem item={item} />;
  };

  return (
    <View style={{ flex: 1 }}>
      {groups.length > 0 ? (
        <FlatList
          data={groups}
          keyExtractor={(group) => group._id}
          renderItem={renderItem}
        />
      ) : (
        <EmptyState title="No Groups Yet" />
      )}
      <FloatingButton
        modalToggle={toggleModal}
        modalVisible={isModalVisible}
        modalComponent={
          <CreateGroupModal
            toggleModal={toggleModal}
            isModalVisible={isModalVisible}
          />
        }
        buttonText="New Group"
      />
    </View>
  );
};

export default GroupList;
