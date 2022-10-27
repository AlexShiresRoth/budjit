import React from 'react';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import Occasions from '../../../../components/occasions/Occasions';
import { View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../../../types';

type Props = BottomTabScreenProps<RootTabParamList, 'Occasions'>;

const OccasionsScreen = ({ navigation, route }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <View style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}>
      <Occasions navigation={navigation} route={route} />
    </View>
  );
};

export default OccasionsScreen;
