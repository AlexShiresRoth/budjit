import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, Text, View } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectAccount } from '../../../redux/reducers/accounts.reducers';
import { format } from 'date-fns';
const SpendingChart = () => {
  const colorScheme = useColorScheme();

  const {
    spending: { filter, totals },
  } = useAppSelector(selectAccount);

  if (!filter || totals.length === 0) {
    return null;
  }
  return (
    <View style={{ flex: 1, maxWidth: '90%', marginTop: 20 }}>
      <Text
        style={{
          color: Colors[colorScheme].text,
          fontWeight: '700',
          fontSize: 24,
          marginBottom: 5,
        }}
      >
        Spending This {filter}
      </Text>
      <LineChart
        data={{
          labels: [
            ...totals.map((total) =>
              format(new Date(total.date), 'MMM dd').toString(),
            ),
          ],
          datasets: [
            {
              data: [...totals.map((total) => total.amount)],
            },
          ],
        }}
        width={Dimensions.get('window').width - 37} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default SpendingChart;
