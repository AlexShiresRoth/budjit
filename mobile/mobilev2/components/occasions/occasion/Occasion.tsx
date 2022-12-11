import { format } from 'date-fns';
import React, { useState } from 'react';
import { Text, View, ViewWithBG } from '../../Themed';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';
import OccasionName from './OccasionName';
import BudgetChart from './BudgetChartContainer';
import OccasionCreator from './OccasionCreator';
import OccasionActivityFeed from './OccasionActivityFeed';
import { StyleSheet } from 'react-native';
import OccasionActions from './OccasionActions';
import OccasionStartDate from './OccasionStartDate';

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
        ...styles.container,
      }}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <ViewWithBG style={[styles.column, { marginRight: 10 }]}>
            <OccasionStartDate occasion={occasion} startDate={startDate} />
            <OccasionName occasion={occasion} />
          </ViewWithBG>
          <ViewWithBG style={styles.column}>
            <View style={{ width: '95%' }}>
              <OccasionCreator occasion={occasion} />
            </View>
          </ViewWithBG>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              ...styles.chartContainer,
              backgroundColor: Colors[colorScheme].background,
            }}
          >
            <BudgetChart occasion={occasion} />
          </View>
        </View>
        <View style={styles.fullWidthContainer}>
          <OccasionActions />
        </View>

        <View style={styles.activityRow}>
          <OccasionActivityFeed occasion={occasion} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  content: {
    width: '95%',
    marginTop: 20,
    maxWidth: '95%',
  },
  header: {
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  column: {
    padding: 10,
    borderRadius: 5,
    width: '50%',
    height: '100%',
    flex: 1,
    flexGrow: 1,
  },
  fullWidthContainer: {
    width: '100%',
  },
  chartContainer: {
    padding: 15,
    borderRadius: 5,
    flexGrow: 1,
  },
  activityRow: {
    marginVertical: 5,
    padding: 5,
    width: '100%',
    overflow: 'hidden',
  },
});

export default Occasion;
