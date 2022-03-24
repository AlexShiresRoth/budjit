import React from 'react';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import Occasions from '../../../components/authed/account/occasions/Occasions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';

const OccasionsScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <ScrollView
      style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}
    >
      <Occasions />
    </ScrollView>
  );
};

export default OccasionsScreen;
