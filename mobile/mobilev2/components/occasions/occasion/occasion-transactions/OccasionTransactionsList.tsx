import React from 'react';
import { FlatList } from 'react-native';
import { OccasionTransactionsType } from '../../../../types/Occasion.types';
import OccasionTransactionListItem from './OccasionTransactionListItem';

type Props = {
  transactionsData: OccasionTransactionsType['transactions'];
};
const OccasionTransactionsList = ({ transactionsData }: Props) => {
  const renderItem = ({ item }: any) => {
    return <OccasionTransactionListItem item={item} key={item?._id} />;
  };
  return (
    <FlatList
      data={transactionsData}
      renderItem={renderItem}
      style={{ minHeight: 400 }}
      contentContainerStyle={{ width: '100%', alignItems: 'center' }}
    />
  );
};

export default OccasionTransactionsList;
