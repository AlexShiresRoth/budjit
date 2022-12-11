import React from 'react';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';
import { Text, View } from '../../Themed';

type Props = {
  occasion: OccasionType;
  startDate: string;
};

const OccasionStartDate = ({ occasion, startDate }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <>
      {occasion?.occasionStartDate ? (
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 5,
            backgroundColor: Colors[colorScheme].tint + '20',
            padding: 5,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: Colors[colorScheme].text + '60',
            }}
          >
            Start - {startDate}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default OccasionStartDate;
