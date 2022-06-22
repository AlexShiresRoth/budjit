import { format } from 'date-fns';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { GroupType } from '../../types/Groups.types';

const GroupItem = ({ item }: { item: GroupType }) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={{ marginVertical: 5, width: '100%', alignItems: 'center' }}
    >
      <View
        style={{
          width: '95%',
          padding: 10,
          backgroundColor: Colors[colorScheme].tint + '60',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 20,
              color: Colors[colorScheme].background,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{ fontSize: 12, color: Colors[colorScheme].text + '80' }}
          >
            Creation Date,
          </Text>
          <Text
            style={{ fontSize: 12, color: Colors[colorScheme].text + '80' }}
          >
            {format(new Date(item.creationDate), 'MMM dd, yyyy')}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              color: Colors[colorScheme].text + '80',
              fontWeight: '700',
              marginRight: 10,
            }}
          >
            {item.members.length}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupItem;
