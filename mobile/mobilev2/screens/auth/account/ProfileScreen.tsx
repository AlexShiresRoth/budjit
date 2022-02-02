import React from 'react';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import Profile from '../../../components/authed/account/profile/Profile';
import { RootStackParamList } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Alert from '../../../components/alerts/Alert';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}>
      <Profile />
    </View>
  );
};

ProfileScreen.propTypes = {};

export default ProfileScreen;
