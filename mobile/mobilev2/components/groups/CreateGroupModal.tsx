import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import * as SMS from 'expo-sms';
import InputList, { ItemParam } from '../inputs/InputList';
import ModalContainer from '../modals/ModalContainer';
import ModalHeader from '../modals/ModalHeader';
import Input from '../inputs/Input';
import PrimaryButton from '../buttons/PrimaryButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import AddContacts from './AddContacts';

type Props = {
  isModalVisible: boolean;
  toggleModal: (isModalVisible: boolean) => void;
};

//TODO create group on sms send
const CreateGroupModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();

  const handleResetOnClose = () => toggleModal(!isModalVisible);

  const dispatch = useAppDispatch();
  //name of group
  const [groupName, setGroupName] = useState<string>('');
  //this is the list of contacts from user's phone
  const [contactList, setContactList] = useState<Array<any>>([]);
  //This will be a list of who is sent in the sms
  const [selectedContacts, selectContact] = useState<Array<any>>([]);

  const handleTextChange = (text: string) => setGroupName(text);

  const handleGroupCreation = async () => { 
    
  }

  const handleSendSMS = async (): Promise<{
    message: string | unknown;
    success: boolean;
  }> => {
    try {
      const isAvailable = await SMS.isAvailableAsync();

      if (!isAvailable) throw new Error('SMS is not available');

      if (selectedContacts.length === 0)
        throw new Error('No contacts selected');

      console.log('selectedContacts', selectedContacts);

      await SMS.sendSMSAsync(
        selectedContacts.map(
          (member) =>
            member?.phoneNumbers?.filter(
              (phone: { label: string; number: string }) =>
                phone.label === 'mobile',
            )[0]?.number,
        ),
        'This is a test message from ' +
          groupName +
          'Download BUDJIT APP on the Apple Store or Google Play Store to join the group.',
      );

      return {
        message: 'SMS sent successfully',
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error ?? 'Something went wrong',
        success: false,
      };
    }
  };

  const DATA: Array<ItemParam> = [
    {
      title: 'Group Name',
      component: (
        <Input
          value={groupName}
          callback={(e: string) => handleTextChange(e)}
          style={{ color: Colors[colorScheme].text }}
          labelStyle={{ color: Colors[colorScheme].text }}
          label={'Give the group a name'}
          isSecure={false}
          descriptor="Group Name"
          icon={
            <MaterialCommunityIcons
              name="account-group-outline"
              color={Colors[colorScheme].tint}
              size={20}
            />
          }
          color={Colors[colorScheme].tint}
        />
      ),
    },
    {
      title: 'Invite Contacts',
      component: (
        <AddContacts
          contactList={contactList}
          setContactList={setContactList}
          selectContact={selectContact}
          selectedContacts={selectedContacts}
        />
      ),
    },
  ];

  console.log('selectedContacts', selectedContacts);

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      handleResetOnClose={handleResetOnClose}
    >
      <ModalHeader
        modalTitle="Create A New Group"
        handleResetOnClose={handleResetOnClose}
      />
      <InputList isEditMode={false} inputList={DATA} />

      <PrimaryButton
        buttonText="Create"
        colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        callBack={handleSendSMS}
        callBackArgs={false}
        buttonTextColor={Colors[colorScheme].background}
        disabled={selectedContacts.length > 0 && groupName ? false : true}
      />
    </ModalContainer>
  );
};

export default CreateGroupModal;
