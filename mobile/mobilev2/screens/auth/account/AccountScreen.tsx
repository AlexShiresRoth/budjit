import React from 'react';
import AccountSpace from '../../../components/authed/account/AccountSpace';
import AuthRoute from '../../../navigation/authed/AuthRoute';
import { RootStackParamList, RootStackScreenProps } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountScreen = ({ route, navigation }: Props) => {
  return (
    <AuthRoute>
      <AccountSpace route={route} navigation={navigation} />
    </AuthRoute>
  );
};

export default AccountScreen;
