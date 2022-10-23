import React from 'react';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import Occasions from '../../../components/occasions/Occasions';
import { View } from 'react-native';

const OccasionsScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}>
      <Occasions />
    </View>
  );
};

export default OccasionsScreen;
