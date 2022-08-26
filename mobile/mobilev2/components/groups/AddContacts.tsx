import React, { useState } from 'react';
import * as contacts from 'expo-contacts';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/reducers/alerts.reducers';
import ContactsModal from './ContactsModal';
import AddButton from '../buttons/AddButton';
import useColorScheme from '../../hooks/useColorScheme';
import ContactList from './ContactList';

type Props = {
  contactList: any[];
  setContactList: (contactList: any[]) => void;
};

//TODO handle remove contact list
//TODO handle add existing member profile

const AddContacts = ({ contactList, setContactList }: Props) => {
  const colorScheme = useColorScheme();

  const [isModalVisible, toggleModal] = useState<boolean>(false);

  const [selectedContacts, selectContact] = useState<any[]>([]);

  const dispatch = useDispatch();

  const handleSelectContact = (contact: any) => {
    if (selectedContacts.find((c) => c.id === contact.id)) {
      console.log('contact already selected');

      selectContact(selectedContacts.filter((c) => c.id !== contact.id));

      return;
    }

    selectContact([...selectedContacts, contact]);
  };

  const handleRequestOnClose = () => {
    //reset and close modal
    selectContact([]);

    toggleModal(false);
  };

  const handleContacts = async () => {
    try {
      const isAvailable = await contacts.isAvailableAsync();

      if (!isAvailable) return;

      const request = await contacts.requestPermissionsAsync();

      if (!request?.granted) return;

      const { data } = await contacts.getContactsAsync();

      console.log('contacts', data);

      setContactList(data);

      toggleModal(true);
    } catch (error) {
      console.log('error', error);
      dispatch(
        setAlert({
          type: 'danger',
          message: 'Cannot retrieve contacts at this time',
        }),
      );
    }
  };

  return (
    <>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
        }}
      >
        <AddButton
          addFunction={handleContacts}
          buttonText={`Click to add contacts`}
          args={null}
        />
      </View>

      {contactList.length > 0 ? (
        <ContactList
          colorScheme={colorScheme}
          selectedContacts={selectedContacts}
        />
      ) : null}

      <ContactsModal
        data={contactList}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        selectFunction={handleSelectContact}
        handleRequestOnClose={handleRequestOnClose}
        selectedContacts={selectedContacts}
      />
    </>
  );
};

export default AddContacts;
