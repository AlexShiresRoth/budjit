import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, Text, View } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectAccount } from '../../../redux/reducers/accounts.reducers';
import { format } from 'date-fns';
import Skeleton from '../../reusable/Skeleton';
import { TransactionItemType } from '../../../types/Transaction.types';
const SpendingChart = () => {
  const colorScheme = useColorScheme();

  const {
    spending: { filter, totals },
  } = useAppSelector(selectAccount);

  const [data, setData] = useState<{
    totalsArr: Array<number>;
    labelsArr: Array<string>;
  }>({
    totalsArr: [],
    labelsArr: [],
  });

  const { totalsArr, labelsArr } = data;

  const handleChartData = (
    filter: 'Month' | 'Week' | 'Year',
    totals: Array<any>,
  ) => {
    let newTotals = [0];
    let newLabels = [format(new Date(), 'MM')];

    if (totals.length > 0) {
      newTotals = [
        ...totals.map((total: TransactionItemType) => total.amount),
      ].reverse();
      newLabels = [
        ...totals.map((total: TransactionItemType) =>
          format(new Date(total.date), 'MMM dd').toString(),
        ),
      ].reverse();
    }

    setData({
      totalsArr: newTotals,
      labelsArr: newLabels,
    });
  };

  useEffect(() => {
    handleChartData(filter, totals);
  }, [filter, totals]);

  if (!filter || totalsArr.length === 0) {
    return <Skeleton verticalBars={4} />;
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: Colors[colorScheme].secondary,
        alignItems: 'center',
      }}
    >
      <View style={{ marginTop: 20, marginBottom: 20, width: '90%' }}>
        <Text
          style={{
            color: Colors[colorScheme].background,
            fontWeight: '700',
            fontSize: 24,
            marginBottom: 5,
          }}
        >
          Spending This {filter}
        </Text>
        <LineChart
          data={{
            labels: labelsArr,
            datasets: [
              {
                data: totalsArr,
              },
            ],
          }}
          width={Dimensions.get('window').width - 37} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: Colors[colorScheme].secondary,
            backgroundGradientFrom: Colors[colorScheme].secondary,
            backgroundGradientTo: Colors[colorScheme].secondary,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 5,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: Colors[colorScheme].tint,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default SpendingChart;
