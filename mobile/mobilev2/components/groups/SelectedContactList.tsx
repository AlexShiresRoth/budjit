import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import RemovableUserItem from '../list-items/RemovableUserItem';

type Props = {
  colorScheme: 'light' | 'dark';
  selectedContacts: any[];
  selectContact: (contact: any) => void;
};

const ContactList = ({
  colorScheme,
  selectedContacts,
  selectContact,
}: Props) => {
  //Remove a user from the list of selected contacts
  const removeFromList = (contact: { id: string; name: string }): void => {
    const newList = selectedContacts.filter((c) => c.id !== contact.id);
    selectContact(newList);
  };

  const renderItem = ({ item }: any) => (
    <RemovableUserItem user={item} removeFunc={removeFromList} />
  );

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
        keyExtractor={(item) => item.lookupKey}
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
