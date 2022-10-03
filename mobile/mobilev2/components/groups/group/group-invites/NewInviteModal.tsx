import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import ToggleButton from '../../../buttons/ToggleButton';
import ContactsList from '../../../contacts/ContactsList';
import ModalContainer from '../../../modals/ModalContainer';
import ModalHeader from '../../../modals/ModalHeader';

type Props = {
  isModalVisible: boolean;
  handleResetOnClose: () => void;
  groupId: string;
};

//TODO need to finish this.
//TODO add close button for list
//TODO add create invites based on selected contacts/members
const NewInviteModal = ({
  isModalVisible,
  handleResetOnClose,
  groupId,
}: Props) => {
  const color = useColorScheme();

  const [toggleContactList, setToggleContactList] = useState<boolean>(false);

  const [selectedContacts, setSelectedContacts] = useState<Array<any>>([]);

  const handleSelectContact = (data: any) =>
    setSelectedContacts((prevState) => [...prevState, data]);

  console.log('selectedContacts', selectedContacts);

  return (
    <ModalContainer
      handleResetOnClose={handleResetOnClose}
      isModalVisible={isModalVisible}
    >
      <ModalHeader
        modalTitle="Create New Invites"
        handleResetOnClose={handleResetOnClose}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '90%',
        }}
      >
        <ToggleButton
          buttonColor={Colors[color].tint}
          text={'Invite friends from contact list'}
          textColor={Colors[color].background}
          onPress={() => setToggleContactList((prevState) => !prevState)}
        />

        {toggleContactList ? (
          <ContactsList
            selectFunction={handleSelectContact}
            selectedContacts={selectedContacts}
          />
        ) : null}
      </View>
    </ModalContainer>
  );
};

export default NewInviteModal;
