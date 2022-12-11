import React from 'react';
import { Text, View } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';

type Props = {
  occasion: OccasionType;
};

const OccasionBudget = ({ occasion }: Props) => {
  console.log('occasion', occasion);

  const colorScheme = useColorScheme();

  return (
    <View>
      <Text style={{ fontSize: 12, color: Colors[colorScheme].text + '60' }}>
        Occasion Budget
      </Text>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>
        ${occasion?.initialBudget}
      </Text>
    </View>
  );
};

export default OccasionBudget;
