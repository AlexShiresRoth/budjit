import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import OccasionTransactionsList from '../../../../components/occasions/occasion/occasion-transactions/OccasionTransactionsList';
import { View } from '../../../../components/Themed';
import { BATCH_FETCH_OCCASION_TRANSACTIONS } from '../../../../graphql/queries/occasions.query';
import { OccasionStackParamList } from '../../../../types';

type NavProps = NativeStackScreenProps<
  OccasionStackParamList,
  'OccasionTransactionsScreen'
>;

const OccasionTransactionsScreen = ({ navigation, route }: NavProps) => {
  console.log('route.params.occasionId', route?.params?.occasionId);

  const { data, error, loading } = useQuery(BATCH_FETCH_OCCASION_TRANSACTIONS, {
    variables: { input: { occasionID: route?.params?.occasionId } },
  });

  //need an error screen
  if (error) return null;
  //need to create a skeleton loader for this screen
  if (loading) return <SafeAreaView></SafeAreaView>;
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <OccasionTransactionsList
        transactionsData={data?.batchFetchOccasionTransactions?.transactions}
      />
    </View>
  );
};

export default OccasionTransactionsScreen;
