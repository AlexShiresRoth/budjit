import React, { useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../../../../graphql/mutations/profiles.mutations';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { selectAccount } from '../../../../redux/reducers/accounts.reducers';
import { Cloudinary } from '@cloudinary/url-gen';
import {
  selectProfile,
  updateAvatar,
} from '../../../../redux/reducers/profiles.reducers';
import LoadingSpinner from '../../../reusable/LoadingSpinner';

const Container = styled.View``;
const AvatarContainer = styled.View`
  height: 160px;
  width: 160px;
  margin-top: 5%;
  border-width: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: relative;
`;
const Avatar = styled.Image`
  height: 140px;
  width: 140px;
  border-radius: 4px;
`;

const Edit = styled.TouchableOpacity`
  elevation: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;
const Text = styled.Text``;

const AvatarEdit = () => {
  //color theme storage
  const colorScheme = useColorScheme();

  //redux store
  const accountState = useAppSelector(selectAccount);
  const profileState = useAppSelector(selectProfile);
  //action dispatcher
  const dispatch = useAppDispatch();

  //new avataer image state
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'snackmanproductions',
    },
  });

  //graphql
  const [updateProfile, { error, loading, data }] = useMutation(UPDATE_PROFILE);

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
        //update redux store
        dispatch(
          updateAvatar({
            avatar: imgUrl.secure_url,
          }),
        );
        //handle avatar upload to db
        await updateProfile({
          variables: {
            updateProfileInput: {
              avatar: imgUrl.secure_url,
              profileId: accountState.myAccount.profile,
            },
          },
        });

        setLoadingState(false);
      }
    }
  };

  if (error) {
    <Container>
      <AvatarContainer>
        <Text style={{ color: Colors[colorScheme].text }}>{error.message}</Text>
      </AvatarContainer>
    </Container>;
  }

  return profileState.myProfile.avatar ? (
    <Container>
      <AvatarContainer
        style={{
          elevation: 1,
          borderColor: Colors[colorScheme].tint,
          backgroundColor: Colors[colorScheme].tint,
          shadowColor: '#222',
          shadowOffset: {
            width: 20,
            height: 10,
          },
          shadowOpacity: 1,
        }}
      >
        {!loadingState ? (
          <Avatar source={{ uri: profileState.myProfile.avatar }} />
        ) : (
          <Container>
            <Text style={{ color: Colors[colorScheme].text }}>
              Uploading...
            </Text>
            <LoadingSpinner />
          </Container>
        )}
        <Edit
          style={{ backgroundColor: Colors[colorScheme].tint + '80' }}
          onPress={() => pickImage()}
        >
          <Text style={{ color: Colors[colorScheme].text }}>Change Avatar</Text>
          <FontAwesome5
            color={Colors[colorScheme].text}
            name="edit"
            size={16}
          />
        </Edit>
      </AvatarContainer>
    </Container>
  ) : null;
};

export default AvatarEdit;
