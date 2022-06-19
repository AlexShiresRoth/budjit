import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_MY_PROFILE } from '../../../graphql/queries/profiles.query';
import Colors, { ColorScheme } from '../../../constants/Colors';
import styled from 'styled-components/native';
import { AccountTypes } from '../../../types/RootState.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Content = styled.View`
  width: 90%;
`;
const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
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

const Button = styled.TouchableOpacity`
  padding: 5px 8px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountHeader = ({
  accounts,
  colorScheme,
  navigation,
}: AccountTypes & ColorScheme & Props) => {
  const { myAccount } = accounts;

  const { error, data, refetch } = useQuery(LOAD_MY_PROFILE);

  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    if (data && !error) {
      setAvatar(data.loadMyProfile.avatar);
    }
  }, [data, error]);

  const handleNavToProfile = () => navigation.navigate('Profile');

  const handleNavToInvitations = () => navigation.navigate('InvitationsScreen');

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Header>
      <LinearGradient
        colors={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        style={{
          width: '100%',
          padding: 10,
          display: 'flex',
          alignItems: 'center',
        }}
        start={{ x: 0.5, y: 0 }}
      >
        <Content>
          <HeaderRow>
            <HeaderColumn>
              <AvatarContainer
                style={{
                  borderWidth: 2,
                  borderColor: Colors[colorScheme].text + '50',
                }}
                onPress={handleNavToProfile}
              >
                {avatar ? <Avatar source={{ uri: avatar }} /> : null}
              </AvatarContainer>
              <UserName>Hello, {myAccount?.name || 'Unknown'}</UserName>
            </HeaderColumn>
            <HeaderColumn>
              <Button
                onPress={handleNavToInvitations}
                style={{
                  backgroundColor: Colors[colorScheme].background + '20',
                  borderRadius: 5,
                }}
              >
                <Feather
                  name="mail"
                  size={20}
                  style={{ color: Colors[colorScheme].text }}
                />
              </Button>
            </HeaderColumn>
          </HeaderRow>
        </Content>
      </LinearGradient>
    </Header>
  );
};

export default AccountHeader;
