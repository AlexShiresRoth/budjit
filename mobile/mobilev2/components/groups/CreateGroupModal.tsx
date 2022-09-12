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
import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from '../../graphql/mutations/groups.mutations';
import { PromiseReturnType } from '../../types/Promises.types';

type Props = {
  isModalVisible: boolean;
  toggleModal: (isModalVisible: boolean) => void;
};

const CreateGroupModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();
  //creating the group via graphql to server and db
  const [createGroupMutation, { error, loading, data }] =
    useMutation(CREATE_GROUP);

  const handleResetOnClose = () => toggleModal(!isModalVisible);
  //redux dispatch method
  const dispatch = useAppDispatch();
  //name of group
  const [groupName, setGroupName] = useState<string>('');
  //this is the list of contacts from user's phone
  const [contactList, setContactList] = useState<Array<any>>([]);
  //This will be a list of who is to be sent to via sms
  const [selectedContacts, selectContact] = useState<Array<any>>([]);
  //TODO add a way to search for existing members user is associated with
  const [selectedMembers, selectMembers] = useState<Array<any>>([]);
  //handling groupname change essentially
  const handleTextChange = (text: string) => setGroupName(text);

  //need to only retrieve phone number and contact name
  const parseContacts = (contacts: Array<any> = []) =>
    contacts.map((contact: any) => {
      const validMobilePhone = contact.phoneNumbers.find(
        (phone: any) => phone.label === 'mobile',
      );

      return {
        name: contact.name ?? 'No Name',
        phone: validMobilePhone?.number ?? 'No Phone Number',
      };
    });

  const handleGroupCreationMutation = async (
    groupName: string,
    contacts: Array<{ name: string; phone: string }> = [],
    members: Array<{ _id: string }> = [],
  ): Promise<PromiseReturnType> => {
    try {
      const mutationRequest = await createGroupMutation({
        variables: { input: { groupName, contacts, members } },
      });

      const { data, errors } = mutationRequest;

      if (errors) {
        errors.map((error: any) => {
          throw new Error(error.message);
        });
      }

      return {
        message: 'Group created successfully',
        success: true,
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error ?? 'Something went wrong',
        success: false,
        data: null,
      };
    }
  };

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

  //group creation works for right now
  //TODO handle closing modal on success and displaying new group!
  //main function for creating the group
  const handleGroupCreation = async (
    contacts: any[],
  ): Promise<PromiseReturnType> => {
    try {
      if (!groupName) throw new Error('Group name is required');

      //contact list returns too much data, we only need name and phone number
      const contactArrFormattedForMutation =
        contacts.length > 0 ? parseContacts(contacts) : [];

      //will need a function to handle members

      const { message, success, data } = await handleGroupCreationMutation(
        groupName,
        contactArrFormattedForMutation,
        selectedMembers,
      );

      //TODO fix this
      if (!success) throw new Error(message ?? "Couldn't create group");

      console.log('data', data);

      const sendSMS = await handleSendSMS();

      return {
        message: 'Group created successfully',
        success: true,
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error ?? 'Something went wrong',
        success: false,
        data: null,
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
        callBack={handleGroupCreation}
        callBackArgs={selectedContacts}
        buttonTextColor={Colors[colorScheme].background}
        disabled={selectedContacts.length > 0 && groupName ? false : true}
      />
    </ModalContainer>
  );
};

export default CreateGroupModal;
