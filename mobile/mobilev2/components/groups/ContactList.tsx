import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import RemovableUserItem from '../list-items/RemovableUserItem';

type Props = {
  colorScheme: 'light' | 'dark';
  selectedContacts: any[];
};

const ContactList = ({ colorScheme, selectedContacts }: Props) => {
  const renderItem = ({ item }: any) => {
    return <RemovableUserItem user={item} removeFunc={() => {}} />;
  };
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors[colorScheme].secondary,
        padding: 10,
        flex: 1,
      }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={selectedContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: Colors[colorScheme].secondary,
            }}
          />
        )}
      />
    </View>
  );
};

export default ContactList;
