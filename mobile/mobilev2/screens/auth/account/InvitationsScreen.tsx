import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import Invitations from '../../../components/authed/account/invitations/Invitations';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { RootStackParamList } from '../../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'InvitationsScreen'>;

const Main = styled.View`
  flex: 1;
`;

const InvitationsScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Main style={{ backgroundColor: Colors[colorScheme].background }}>
      <Invitations route={route} navigation={navigation} />
    </Main>
  );
};

export default InvitationsScreen;
