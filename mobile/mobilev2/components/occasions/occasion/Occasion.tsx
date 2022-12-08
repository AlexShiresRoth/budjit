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
import OccasionBudgetUsed from './BudgetChartContainer';
import OccasionCreator from './OccasionCreator';
import OccasionActivityFeed from './OccasionActivityFeed';

type Props = {
  occasion: OccasionType;
};

const Occasion = ({ occasion }: Props) => {
  const colorScheme = useColorScheme();

  const startDate = occasion?.occasionStartDate
    ? format(new Date(occasion?.occasionStartDate ?? ''), 'PP')
    : format(new Date(), 'PP');

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors[colorScheme]?.accountBg + 50,
      }}
    >
      <View style={{ width: '95%', marginTop: 20, maxWidth: '95%' }}>
        <View style={{  marginBottom: 10 }}>
          <View
            style={{
              backgroundColor: Colors[colorScheme].background,
              padding: 15,
              borderRadius: 5,
              flexGrow: 1,
            }}
          >
            <OccasionBudgetUsed occasion={occasion} />
          </View>
        
        </View>
        <View
          style={{
            backgroundColor: Colors[colorScheme].background,
            padding: 15,
            borderRadius: 5,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <View style={{ width: '60%', alignItems: 'flex-start' }}>
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
                  style={{
                    fontSize: 10,
                    color: Colors[colorScheme].text + '60',
                  }}
                >
                  Start - {startDate}
                </Text>
              </View>
            ) : null}
            <OccasionName occasion={occasion} />
          </View>
          <View
            style={{
              backgroundColor: Colors[colorScheme].tint + '20',
              padding: 5,
              borderRadius: 5,
              width: '40%',
              alignItems: 'center',
            }}
          >
            <View style={{ width: '95%' }}>
              <OccasionCreator occasion={occasion} />
            </View>
          </View>
        </View>

        <View
          style={{
            marginVertical: 5,
            padding: 5,
            borderRadius: 5,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <OccasionActivityFeed occasion={occasion} />
        </View>
      </View>
    </View>
  );
};

export default Occasion;
