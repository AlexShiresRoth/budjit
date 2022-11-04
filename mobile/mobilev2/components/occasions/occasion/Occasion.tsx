import { format } from 'date-fns';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';
import { EvilIcons } from '@expo/vector-icons';
import EditOccasion from './EditOccasion';
import OccasionName from './OccasionName';
import OccasionBudget from './OccasionBudget';
import OccasionBudgetUsed from './OccasionBudgetUsed';

type Props = {
  occasion: OccasionType;
};

const Occasion = ({ occasion }: Props) => {
  const colorScheme = useColorScheme();

  const startDate = occasion?.occasionStartDate
    ? format(new Date(occasion?.occasionStartDate ?? 0), 'PP')
    : format(new Date(), 'PP');

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors[colorScheme]?.accountBg + 50,
      }}
    >
      <View style={{ width: '95%', marginTop: 20 }}>
        <View
          style={{
            backgroundColor: Colors[colorScheme].background,
            padding: 15,
            borderRadius: 5,
            alignItems: 'flex-start',
          }}
        >
          {occasion?.occasionStartDate ? (
            <View
              style={{
                flexDirection: 'row',
                padding: 5,
                borderRadius: 5,
                backgroundColor: Colors[colorScheme].tint + '20',
              }}
            >
              <Text
                style={{ fontSize: 12, color: Colors[colorScheme].text + '60' }}
              >
                Start - {startDate}
              </Text>
            </View>
          ) : null}
          <OccasionName occasion={occasion} />
        </View>
        <View style={{ flexDirection: 'row', }}>
          <View
            style={{
              backgroundColor: Colors[colorScheme].background,
              padding: 15,
              borderRadius: 5,
              alignItems: 'flex-start',
              marginTop: 10,
              marginRight: 5,
              flexGrow:1 
            }}
          >
            <OccasionBudget occasion={occasion} />
          </View>
          <View
            style={{
              backgroundColor: Colors[colorScheme].background,
              padding: 15,
              borderRadius: 5,
              alignItems: 'flex-start',
              marginTop: 10,
              marginLeft: 5,
              flexGrow:1
            }}
          >
            <OccasionBudgetUsed occasion={occasion} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Occasion;
