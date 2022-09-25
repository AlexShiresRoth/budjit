import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Cloudinary } from '@cloudinary/url-gen';
import PrimaryButton from '../buttons/PrimaryButton';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

type Props = {
  setImageString: (imageString: string) => void;
  getImageLoadingState: (val: boolean) => void;
};

const ImagePickerComp = ({ setImageString, getImageLoadingState }: Props) => {
  const colorScheme = useColorScheme();

  //new avatar image state
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'snackmanproductions',
    },
  });

  //handle the avatar update
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

    if (!result.cancelled) {
      //need to set loading for whole function
      setLoadingState(true);

      getImageLoadingState(true);

      const myImage = cld.image('budjit-app/');

      let base64Img = `data:image/jpg;base64,${result.base64}`;

      let data = {
        file: base64Img,
        upload_preset: 'budjit',
      };

      const uploadToCloud = await fetch(
        'https://api.cloudinary.com/v1_1/snackmanproductions/upload',
        {
          body: JSON.stringify(data),
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
        },
      );

      const imgUrl = await uploadToCloud.json();

      if (JSON.stringify(imgUrl.secure_url)) {
        //set the image state
        setImageString(imgUrl.secure_url);

        //set the loading state
        setLoadingState(false);

        getImageLoadingState(false);
      }
    }
  };

  return (
    <PrimaryButton
      buttonText="Choose image from camera roll"
      callBack={pickImage}
      callBackArgs={null}
      buttonTextColor={Colors[colorScheme].text}
      colorArr={['transparent', 'transparent']}
      disabled={false}
    />
  );
};

export default ImagePickerComp;
