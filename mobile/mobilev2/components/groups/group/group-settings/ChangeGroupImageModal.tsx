import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
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
};

const ChangeGroupImageModal = ({
  isModalVisible,
  toggleModal,
  currentImage,
}: Props) => {
  const colorScheme = useColorScheme();

  const [showImagePicker, setShowImagePicker] = useState(false);

  const [imageString, setImageString] = useState<string>(currentImage);

  const [isImageLoading, setIsImageLoading] = useState(false);

  const resetOnClose = () => {
    setImageString('');
    toggleModal();
    setIsImageLoading(false);
  };

  console.log('currentImage', showImagePicker);

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

      <PrimaryButton
        buttonText="Save"
        colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        callBack={() => {}}
        callBackArgs={null}
        buttonTextColor={Colors[colorScheme].background}
        disabled={imageString ? false : true}
      />
    </ModalContainer>
  );
};

export default ChangeGroupImageModal;
