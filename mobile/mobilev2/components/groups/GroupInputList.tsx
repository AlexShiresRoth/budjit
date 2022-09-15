import { Text, View } from 'react-native';
import React from 'react';
import InputList, { ItemParam } from '../inputs/InputList';
import AddContacts from './AddContacts';
import Colors from '../../constants/Colors';
import Input from '../inputs/Input';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  contactList: Array<any>;
  setContactList: (contactList: Array<any>) => void;
  selectedContacts: Array<any>;
  selectContact: (selectedContacts: Array<any>) => void;
  groupName: string;
  handleTextChange: (text: string) => void;
  colorScheme: 'light' | 'dark';
};

const GroupInputList = ({
  groupName,
  handleTextChange,
  colorScheme,
  contactList,
  setContactList,
  selectContact,
  selectedContacts,
}: Props) => {
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
  return <InputList isEditMode={false} inputList={DATA} />;
};

export default GroupInputList;
