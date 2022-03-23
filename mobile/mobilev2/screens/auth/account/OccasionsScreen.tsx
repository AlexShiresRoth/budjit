import React from 'react';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import Occasions from '../../../components/authed/account/occasions/Occasions';
import { SafeAreaView } from 'react-native-safe-area-context';

const OccasionsScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}
    >
      <Occasions />
    </SafeAreaView>
  );
};

export default OccasionsScreen;
