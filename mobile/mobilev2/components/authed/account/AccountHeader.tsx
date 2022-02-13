import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_MY_PROFILE } from '../../../graphql/queries/profiles.query';
import Colors, { ColorScheme } from '../../../constants/Colors';
import styled from 'styled-components/native';
import { AccountTypes } from '../../../types/RootState.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { Feather } from '@expo/vector-icons';

const Content = styled.View`
  width: 90%;
`;
const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const HeaderRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const HeaderColumn = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UserName = styled.Text`
  color: #fefefe;
  font-size: 20px;
  font-weight: 100;
  margin-left: 10px;
`;

const AvatarContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 900px;
  margin: 0;
`;
const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 900px;
`;

const Button = styled.TouchableOpacity``;

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountHeader = ({
  accounts,
  colorScheme,
  navigation,
  route,
}: AccountTypes & ColorScheme & Props) => {
  const { myAccount } = accounts;

  const { error, data, loading } = useQuery(LOAD_MY_PROFILE);

  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    if (data && !error) {
      setAvatar(data.loadMyProfile.avatar);
    }
  }, [data, error]);

  const handleNavToProfile = () => navigation.navigate('Profile');

  const handleNavToInvitations = () => navigation.navigate('InvitationsScreen');

  return (
    <Header
      style={{
        borderBottomWidth: 1.5,
        backgroundColor: Colors[colorScheme].tint,
      }}
    >
      <Content>
        <HeaderRow>
          <HeaderColumn>
            <AvatarContainer
              style={{
                borderWidth: 2,
                borderColor: Colors[colorScheme].danger,
              }}
              onPress={handleNavToProfile}
            >
              {avatar ? <Avatar source={{ uri: avatar }} /> : null}
            </AvatarContainer>
            <UserName>Hello, {myAccount?.name || 'Unknown'}</UserName>
          </HeaderColumn>
          <HeaderColumn>
            <Button onPress={handleNavToInvitations}>
              <Feather
                name="mail"
                size={20}
                style={{ color: Colors[colorScheme].text }}
              />
            </Button>
          </HeaderColumn>
        </HeaderRow>
      </Content>
    </Header>
  );
};

export default AccountHeader;
