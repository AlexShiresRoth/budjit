import React, { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import * as SMS from 'expo-sms';
import ModalContainer from '../modals/ModalContainer';
import ModalHeader from '../modals/ModalHeader';
import PrimaryButton from '../buttons/PrimaryButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from '../../graphql/mutations/groups.mutations';
import { PromiseReturnType } from '../../types/Promises.types';
import { addNewGroupToState } from '../../redux/reducers/groups.reducers';
import GroupInputList from './GroupInputList';

type Props = {
  isModalVisible: boolean;
  toggleModal: (isModalVisible: boolean) => void;
  setGroupCreated: (groupCreated: boolean) => void;
};

const CreateGroupModal = ({
  isModalVisible,
  toggleModal,
  setGroupCreated,
}: Props) => {
  const colorScheme = useColorScheme();
  //creating the group via graphql to server and db
  const [createGroupMutation] = useMutation(CREATE_GROUP);

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
      //attempt group creation
      const mutationRequest = await createGroupMutation({
        variables: { input: { groupName, contacts, members } },
      });

      const { data, errors } = mutationRequest;
      //short out of function if there are errors
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

  //send sms to external list of contacts
  const handleSendSMS = async (
    contacts: Array<{ name: string; phone: string }>,
  ): Promise<{
    message: string | unknown;
    success: boolean;
  }> => {
    try {
      const isAvailable = await SMS.isAvailableAsync();

      if (!isAvailable) throw new Error('SMS is not available');

      if (selectedContacts.length === 0)
        throw new Error('No contacts selected');

      await SMS.sendSMSAsync(
        contacts.map((contact) => contact.phone),
        'This is a test message from ' +
          groupName +
          ' Download BUDJIT APP on the Apple Store or Google Play Store to join the group.',
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

  //main function for creating the group
  const handleGroupCreation = async (
    contacts: any[],
  ): Promise<PromiseReturnType> => {
    try {
      if (!groupName) throw new Error('Group name is required');

      //contact list returns too much data, we only need name and phone number
      const contactArrFormattedForMutation =
        contacts.length > 0 ? parseContacts(contacts) : [];

      //TODO will need a function to handle members
      const { message, success, data } = await handleGroupCreationMutation(
        groupName,
        contactArrFormattedForMutation,
        selectedMembers,
      );

      if (!success)
        throw new Error(
          typeof message === 'string' ? message : "Couldn't create group",
        );

      //only send sms if there are contacts to send to
      if (contacts.length > 0) {
        //send out text messages to all contacts
        await handleSendSMS(contactArrFormattedForMutation);
      }

      //add new group to state via redux
      dispatch(addNewGroupToState(data?.createGroup?.Group));
      //notify parent component that group was created
      setGroupCreated(true);

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

  useEffect(() => {
    setGroupCreated(false);
  }, []);

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      handleResetOnClose={handleResetOnClose}
    >
      <ModalHeader
        modalTitle="Create A New Group"
        handleResetOnClose={handleResetOnClose}
      />
      <GroupInputList
        setContactList={setContactList}
        selectedContacts={selectedContacts}
        colorScheme={colorScheme}
        groupName={groupName}
        handleTextChange={handleTextChange}
        contactList={contactList}
        selectContact={selectContact}
      />
      <PrimaryButton
        buttonText="Create"
        colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        callBack={handleGroupCreation}
        callBackArgs={selectedContacts}
        buttonTextColor={Colors[colorScheme].background}
        disabled={groupName ? false : true}
      />
    </ModalContainer>
  );
};

export default CreateGroupModal;
