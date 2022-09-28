import { useMutation } from '@apollo/client';
import { FontAwesome } from '@expo/vector-icons';
import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import { UPDATE_GROUP } from '../../../../graphql/mutations/groups.mutations';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import useColorScheme from '../../../../hooks/useColorScheme';
import { setAlert } from '../../../../redux/reducers/alerts.reducers';
import { setShouldRefreshGroup } from '../../../../redux/reducers/updates.reducers';
import PrimaryButton from '../../../buttons/PrimaryButton';
import Input from '../../../inputs/Input';
import ModalContainer from '../../../modals/ModalContainer';
import ModalHeader from '../../../modals/ModalHeader';
import ImagePickerComp from '../../../reusable/ImagePicker';
import LoadingSpinner from '../../../reusable/LoadingSpinner';
import Skeleton from '../../../reusable/Skeleton';

type Props = {
  isModalVisible: boolean;
  toggleModal: () => void;
  currentName: string;
  groupID: string;
};

const ChangeGroupNameModal = ({
  isModalVisible,
  toggleModal,
  currentName,
  groupID,
}: Props) => {
  const dispatch = useAppDispatch();

  const colorScheme = useColorScheme();

  const [updateGroupName, { error, data, loading }] = useMutation(UPDATE_GROUP);

  const [groupName, setGroupName] = useState<string>(currentName);

  const handleTextChange = (text: string) => setGroupName(text);

  const resetOnClose = () => {
    toggleModal();
    setGroupName('');
  };

  const handleUpdateGroupName = async (
    name: string,
  ): Promise<{ message: string; success: boolean }> => {
    try {
      const { errors } = await updateGroupName({
        variables: {
          input: {
            groupID,
            groupName: name,
          },
        },
      });
      if (errors) {
        console.log('errors', errors);
        return {
          message: errors[0].message,
          success: false,
        };
      }

      //reset everything on success
      resetOnClose();

      //notify parent component that image has been updated
      dispatch(setAlert({ message: 'Group name updated', type: 'success' }));

      //notify recent activity that image has been updated and refetch the group
      dispatch(setShouldRefreshGroup(true));

      return {
        message: 'Group image updated',
        success: true,
      };
    } catch (error) {
      console.log('error', error);
      return {
        message: typeof error === 'string' ? error : 'Something went wrong',
        success: false,
      };
    }
  };

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      handleResetOnClose={resetOnClose}
    >
      <ModalHeader
        modalTitle={`Change Group Name`}
        handleResetOnClose={resetOnClose}
      />

      <View style={{ marginTop: 40 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 30, fontWeight: '700' }}>
            Current Group Name
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              color: Colors[colorScheme].text + '80',
            }}
          >
            {currentName}
          </Text>
        </View>
        <Input
          descriptor="Edit Group Name"
          label={'Edit Group Name'}
          style={null}
          labelStyle={{ color: Colors[colorScheme].text }}
          isSecure={false}
          value={groupName}
          callback={handleTextChange}
          color={Colors[colorScheme].tint}
          icon={<FontAwesome name="pencil" color={Colors[colorScheme].tint} />}
        />
      </View>

      {loading ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <LoadingSpinner />
          <Text style={{ marginLeft: 10 }}>Updating group name...</Text>
        </View>
      ) : (
        <PrimaryButton
          buttonText="Save"
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          callBack={handleUpdateGroupName}
          callBackArgs={groupName}
          buttonTextColor={Colors[colorScheme].background}
          disabled={groupName !== currentName ? false : true}
        />
      )}
    </ModalContainer>
  );
};

export default ChangeGroupNameModal;
