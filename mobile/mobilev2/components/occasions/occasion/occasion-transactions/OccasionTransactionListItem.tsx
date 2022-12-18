import React from 'react';
import { StyleSheet } from 'react-native';
import { OccasionTransactionsType } from '../../../../types/Occasion.types';
import { TransactionItemType } from '../../../../types/Transaction.types';
import { Text, View, ViewWithBG } from '../../../Themed';

type Props = {
  item: TransactionItemType & OccasionTransactionsType['transactions'][number];
};

const OccasionTransactionListItem = ({ item }: Props) => {
  return (
    <ViewWithBG style={styles.container}>
      <View>
        <Text>Transaction {item?.name} </Text>
        <Text>Person: {item?.personAccountRef?._id}</Text>
      </View>
      <View>
        <Text>Amount: {item?.amount}</Text>
      </View>
    </ViewWithBG>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OccasionTransactionListItem;
