import React, { useEffect, useState } from 'react';
import * as contacts from 'expo-contacts';

const useFetchContacts = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const [contactList, setContactList] = useState<any[]>([]);

  const handleContacts = async () => {
    try {
      const isAvailable = await contacts.isAvailableAsync();

      if (!isAvailable) return;

      const request = await contacts.requestPermissionsAsync();

      if (!request?.granted) return;

      const { data } = await contacts.getContactsAsync();

      //filter out contacts that do not have mobile numbers
      const filteredContacts = data.filter((contact: contacts.Contact) =>
        contact?.phoneNumbers && contact.phoneNumbers.length > 0
          ? contact.phoneNumbers?.filter((phone) => phone.label === 'mobile')
              .length > 0
          : false,
      );

      //sort alphabetically
      const sortedContacts = filteredContacts.sort((a, b) =>
        a.name > b.name ? 1 : -1,
      );

      setContactList(sortedContacts);
    } catch (error) {
      console.log('error', error);
      setErrors([
        typeof error === 'string'
          ? error
          : 'Cannot retrieve contacts at this time',
      ]);
    }
  };

  useEffect(() => {
    handleContacts();
  }, []);

  return { contactList, errors };
};

export default useFetchContacts;
