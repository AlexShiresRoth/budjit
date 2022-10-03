import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as contacts from 'expo-contacts';
import useColorScheme from '../../hooks/useColorScheme';
import AddButton from '../buttons/AddButton';
import useFetchContacts from '../../hooks/useFetchContacts';
import ContactItem from '../groups/ContactItem';

type Props = {
  selectedContacts: any[];
  selectFunction: (data: any) => void;
};

const ContactsList = ({ selectFunction, selectedContacts }: Props) => {
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();

  const { contactList, errors } = useFetchContacts();

  const renderItem = ({ item }: any) => {
    return (
      <ContactItem
        item={item}
        selectedContacts={selectedContacts}
        selectFunction={selectFunction}
        key={item._id}
      />
    );
  };

  return (
    <FlatList
      data={contactList}
      renderItem={renderItem}
      style={{ width: '100%' }}
    />
  );
};

export default ContactsList;
