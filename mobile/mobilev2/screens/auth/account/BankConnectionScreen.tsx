import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BankingConnects from '../../../components/authed/account/BankingConnects';
import AuthRoute from '../../../navigation/authed/AuthRoute';

const BankConnectionScreen = () => {
  return (
    <AuthRoute>
      <SafeAreaView style={{ flex: 1 }}>
        <BankingConnects />
      </SafeAreaView>
    </AuthRoute>
  );
};

export default BankConnectionScreen;
