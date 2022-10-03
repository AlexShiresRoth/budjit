import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import ModalContainer from '../modals/ModalContainer';
import ModalHeader from '../modals/ModalHeader';
import PrimaryButton from '../buttons/PrimaryButton';
import ContactItem from '../groups/ContactItem';
import useFetchContacts from '../../hooks/useFetchContacts';

type Props = {
  isModalVisible: boolean;
  toggleModal: (val: boolean) => void;
  selectFunction: (data: any) => void;
  handleRequestOnClose: () => void;
  selectedContacts: Array<any>;
};

const ContactsModal = ({
  isModalVisible,
  toggleModal,
  selectFunction,
  handleRequestOnClose,
  selectedContacts,
}: Props) => {
  const colorScheme = useColorScheme();

  const { contactList, errors } = useFetchContacts();

  const renderItem = ({ item }: { item: any }) => {
    return (
      <ContactItem
        item={item}
        selectFunction={selectFunction}
        selectedContacts={selectedContacts}
      />
    );
  };

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      handleResetOnClose={() => handleRequestOnClose()}
    >
      <ModalHeader
        modalTitle="Select Contacts"
        handleResetOnClose={() => handleRequestOnClose()}
      />
      <FlatList
        renderItem={renderItem}
        data={contactList}
        keyExtractor={(item) => item.lookupKey}
        style={{
          maxHeight:
            selectedContacts.length > 0
              ? Dimensions.get('window').height * 0.7
              : Dimensions.get('window').height * 1,
          backgroundColor: Colors[colorScheme].tint + '10',
          borderRadius: 5,
        }}
      />

      <PrimaryButton
        buttonText="Accept"
        colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        callBack={() => toggleModal(false)}
        callBackArgs={false}
        buttonTextColor={Colors[colorScheme].background}
        disabled={selectedContacts.length > 0 ? false : true}
      />
    </ModalContainer>
  );
};

export default ContactsModal;
