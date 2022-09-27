import { useMutation } from '@apollo/client';
import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import { UPDATE_GROUP } from '../../../../graphql/mutations/groups.mutations';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import useColorScheme from '../../../../hooks/useColorScheme';
import { setAlert } from '../../../../redux/reducers/alerts.reducers';
import PrimaryButton from '../../../buttons/PrimaryButton';
import ModalContainer from '../../../modals/ModalContainer';
import ModalHeader from '../../../modals/ModalHeader';
import ImagePickerComp from '../../../reusable/ImagePicker';
import LoadingSpinner from '../../../reusable/LoadingSpinner';
import Skeleton from '../../../reusable/Skeleton';

type Props = {
  isModalVisible: boolean;
  toggleModal: () => void;
  currentImage: string;
  groupID: string;
};

const ChangeGroupImageModal = ({
  isModalVisible,
  toggleModal,
  currentImage,
  groupID,
}: Props) => {
  const dispatch = useAppDispatch();

  const colorScheme = useColorScheme();

  const [imageString, setImageString] = useState<string>(currentImage);

  const [newImageSelected, setNewImageSelected] = useState<boolean>(false);

  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const [updateGroupImage, { error, data, loading }] =
    useMutation(UPDATE_GROUP);

  const resetOnClose = () => {
    //default to
    setImageString('');
    toggleModal();
    setIsImageLoading(false);
    setNewImageSelected(false);
  };

  const handleUpdateGroupImage = async (
    image: string,
  ): Promise<{ message: string; success: boolean }> => {
    try {
      const { errors } = await updateGroupImage({
        variables: {
          input: {
            groupID,
            image,
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
      dispatch(setAlert({ message: 'Group image updated', type: 'success' }));

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

  useEffect(() => {
    //only want to update if a new image is selected
    if (currentImage === imageString || imageString === '') {
      setNewImageSelected(false);
    }
    //Will only set save button as not disabled if a new image is selected
    if (currentImage !== imageString && imageString !== '') {
      setNewImageSelected(true);
    }
  }, [currentImage, imageString]);

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      handleResetOnClose={resetOnClose}
    >
      <ModalHeader
        modalTitle={`Change Group Image`}
        handleResetOnClose={resetOnClose}
      />
      <View style={{ marginTop: 20 }}>
        <Text>Current Image:</Text>
        {!currentImage ? (
          <Text>Could Not Load Image</Text>
        ) : !isImageLoading ? (
          <Image
            source={{ uri: imageString ? imageString : currentImage }}
            style={{ width: '100%', height: 150, borderRadius: 10 }}
          />
        ) : (
          <View>
            <Text>Processing Image</Text>
            <Skeleton verticalBars={1} />
          </View>
        )}
      </View>

      {!isImageLoading ? (
        <ImagePickerComp
          setImageString={setImageString}
          getImageLoadingState={setIsImageLoading}
        />
      ) : null}

      {loading ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadingSpinner />
          <Text style={{ marginLeft: 10 }}>Updating Image...</Text>
        </View>
      ) : (
        <PrimaryButton
          buttonText="Save"
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          callBack={handleUpdateGroupImage}
          callBackArgs={imageString}
          buttonTextColor={Colors[colorScheme].background}
          disabled={newImageSelected ? false : true}
        />
      )}
    </ModalContainer>
  );
};

export default ChangeGroupImageModal;
