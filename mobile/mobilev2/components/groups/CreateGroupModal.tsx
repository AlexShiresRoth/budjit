import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import * as SMS from 'expo-sms';
import InputList, { ItemParam } from '../inputs/InputList';
import ModalContainer from '../modals/ModalContainer';
import ModalHeader from '../modals/ModalHeader';
import Input from '../reusable/Input';
import PrimaryButton from '../reusable/PrimaryButton';
import DynamicInputGroup from '../inputs/DynamicInputGroup';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setAlert } from '../../redux/reducers/alerts.reducers';

type Props = {
  isModalVisible: boolean;
  toggleModal: (isModalVisible: boolean) => void;
};

const CreateGroupModal = ({ isModalVisible, toggleModal }: Props) => {
  const colorScheme = useColorScheme();

  const handleResetOnClose = () => toggleModal(!isModalVisible);

  const dispatch = useAppDispatch();

  const [groupData, setData] = useState<{
    name: string;
    invites: Array<{ phone: string; name: string }>;
    existingProfileInvites: Array<{ _id: string }>;
  }>({
    name: '',
    invites: [],
    existingProfileInvites: [],
  });

  const { name, invites, existingProfileInvites } = groupData;

  const handleTextChange = (name: string, text: string) =>
    setData({ ...groupData, [name]: text });

  //TODO: add contacts package to handle adding from contact list
  //Should user be able to add from outside contacts?
  const handleAddToList = () => {
    // if (text === '') return;
    // if (data.includes(text)) {
    //   dispatch(
    //     setAlert({ type: 'danger', message: 'Item already exists' }),
    //   );
    //   return;
    // }
    // setData([...data, text]);
    // setText('');
  };

  const handleSendSMS = async () => {
    try {
      const isAvailable = await SMS.isAvailableAsync();

      if (!isAvailable) return;

      if (invites.length === 0) return;

      const { result } = await SMS.sendSMSAsync(
        [...invites.map((invite) => invite.phone)],
        'This is a test message from ' +
          name +
          'Download BUDJIT APP on the Apple Store or Google Play Store to join the group.',
      );

      console.log('text result', result);
    } catch (error) {
      console.error(error);
    }
  };

  const DATA: Array<ItemParam> = [
    {
      title: 'Group Name',
      component: (
        <Input
          value={name}
          callback={(e: string) => handleTextChange('name', e)}
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
    // {
    //   title: 'Invite Contacts',
    //   component: <DynamicInputGroup data={invites} setData={} inputLabel="Add a contact" inputName='Contact Info' />,
    // },
  ];

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
      {invites.length > 0 || existingProfileInvites.length > 0 ? (
        <PrimaryButton
          buttonText="Create"
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          callBack={handleSendSMS}
          callBackArgs={false}
          buttonTextColor={Colors[colorScheme].background}
        />
      ) : null}
    </ModalContainer>
  );
};

export default CreateGroupModal;
