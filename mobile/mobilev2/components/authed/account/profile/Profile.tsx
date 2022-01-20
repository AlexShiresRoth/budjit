import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types';
import { useQuery } from '@apollo/client';
import { LOAD_MY_PROFILE } from '../../../../graphql/queries/profiles.query';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
const ErrorMessage = styled.Text`
  color: #fff;
`;
const BackgroundTop = styled.View`
  height: 90px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const AvatarContainer = styled.View`
  height: 160px;
  width: 160px;
  border-radius: 900px;
  margin-top: 20px;
  border-width: 10px;
  align-items: center;
  justify-content: center;
`;
const Avatar = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 900px;
`;

const ProfileName = styled.Text`
  color: #fff;
  font-weight: 700;
  margin-top: 30px;
  font-size: 20px;
`;

const Text = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 20px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();
  const { data, loading, error } = useQuery(LOAD_MY_PROFILE);

  const [profileData, setProfileData] = useState({
    avatar: '',
    name: '',
  });

  const { name, avatar } = profileData;

  useEffect(() => {
    if (data && !error) {
      setProfileData({
        avatar: data.loadMyProfile.avatar,
        name: data.loadMyProfile.name,
      });
    }
  }, [error, data]);

  console.log('data?', data, loading, error?.message, profileData);
  if (error) {
    return (
      <Container>
        <ErrorMessage>{error.message}</ErrorMessage>
      </Container>
    );
  }
  if (loading) {
    return (
      <Container>
        <Text>Loading Profile...</Text>
      </Container>
    );
  }
  return (
    <Container>
      <BackgroundTop
        style={{
          backgroundColor: Colors[colorScheme].tint,
        }}
      />
      <BackgroundTop
        style={{
          backgroundColor: Colors[colorScheme].tint + '66',
          height: 110,
        }}
      />
      {avatar ? (
        <AvatarContainer
          style={{
            elevation: 1,
            borderColor: Colors[colorScheme].tint,
            backgroundColor: Colors[colorScheme].tint,
            borderWidth: 20,
            shadowColor: '#222',
            shadowOffset: {
              width: 20,
              height: 10,
            },
            shadowOpacity: 1,
          }}
        >
          <Avatar source={{ uri: avatar }} />
        </AvatarContainer>
      ) : null}
      <ProfileName>{name && name}</ProfileName>
    </Container>
  );
};

export default Profile;
