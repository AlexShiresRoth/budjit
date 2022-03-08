import React from 'react';
import AccountSpace from '../../../components/authed/account/AccountSpace';
import styled from 'styled-components/native';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import AuthRoute from '../../../navigation/authed/AuthRoute';
import { RootStackParamList, RootStackScreenProps } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';

const Container = styled.View`
  width: 100%;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <AuthRoute>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme].background,
          padding: 0,
        }}
      >
        <AccountSpace route={route} navigation={navigation} />
      </ScrollView>
    </AuthRoute>
  );
};

export default AccountScreen;
