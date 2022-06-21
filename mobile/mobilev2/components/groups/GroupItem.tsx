import React from 'react';
import { Text, View } from 'react-native';
import { GroupType } from '../../types/Groups.types';

const GroupItem = ({ item }: { item: GroupType }) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default GroupItem;
