import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import Profile from '../../../components/authed/account/profile/Profile';
import { RootStackParamList } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}>
      <Profile route={route} navigation={navigation} />
    </View>
  );
};

ProfileScreen.propTypes = {};

export default ProfileScreen;
