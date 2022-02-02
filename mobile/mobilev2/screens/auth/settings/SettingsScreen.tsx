import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../../../components/authed/account/settings/Settings';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import AuthRoute from '../../../navigation/authed/AuthRoute';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <AuthRoute>
      <View
        style={{
          backgroundColor: Colors[colorScheme].background,
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Settings route={route} navigation={navigation} />
      </View>
    </AuthRoute>
  );
};

export default SettingsScreen;
