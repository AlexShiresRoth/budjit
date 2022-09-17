import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, View } from 'react-native';
import { RootStackParamList } from '../../types';
import { GroupType } from '../../types/Groups.types';
import FloatingButton from '../buttons/FloatingButton';
import EmptyState from '../reusable/EmptyState';
import CreateGroupModal from './CreateGroupModal';
import GroupItem from './GroupItem';

type GroupListProps = {
  groups: Array<GroupType>;
  isModalVisible: boolean;
  toggleModal: (isModalVisible: boolean) => void;
  setGroupCreated: (groupCreated: boolean) => void;
};

type Navigation = NativeStackScreenProps<RootStackParamList, 'GroupsScreen'>;

const GroupList = ({
  groups,
  isModalVisible,
  toggleModal,
  setGroupCreated,
  navigation,
  route,
}: GroupListProps & Navigation) => {
  const renderItem = ({ item }: { item: GroupType }) => {
    return <GroupItem item={item} navigation={navigation} route={route} />;
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
            setGroupCreated={setGroupCreated}
          />
        }
        buttonText="New Group"
      />
    </View>
  );
};

export default GroupList;
