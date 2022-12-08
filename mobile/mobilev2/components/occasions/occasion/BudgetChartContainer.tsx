import React, { createRef, useEffect, useRef, useState } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';
import BudgetUsed from './BudgetUsed';
import OccasionBudget from './OccasionBudget';

type Props = {
  occasion: OccasionType;
};

const OccasionBudgetUsed = ({ occasion }: Props) => {
  const colorScheme = useColorScheme();

  const [budgetUsed, setBudgetUsed] = useState(0);

  const handleBudgetCalculation = (
    amountContributed: string,
    initialBudget: string,
  ) => {
    const budgetUsed = Number(
      (Number(amountContributed) / Number(initialBudget)).toFixed(2),
    );
    setBudgetUsed(budgetUsed);
  };

  useEffect(() => {
    handleBudgetCalculation(
      occasion?.amountContributed,
      occasion?.initialBudget,
    );
  }, [occasion]);

  return (
    <>
      <View
        style={{
          ...styles.heading,
          borderBottomColor: Colors[colorScheme].accountBg,
        }}
      >
        <BudgetUsed occasion={occasion} />
        <OccasionBudget occasion={occasion} />
      </View>
      <ProgressChart
        data={{
          data: [budgetUsed],
        }}
        width={Dimensions?.get('window').width - 47}
        height={120}
        strokeWidth={16}
        radius={32}
        style={{ borderRadius: 10, maxWidth: '100%' }}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 6,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OccasionBudgetUsed;
