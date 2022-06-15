import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  selectAccount,
  setManualTransactions,
  setTransactionsInDateRange,
} from '../../../../redux/reducers/accounts.reducers';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../../../../graphql/queries/accounts.query';
import {
  SpendingStateParams,
  TransactionItemType,
} from '../../../../types/Transaction.types';
import TransactionItem from './transactions/TransactionItem';

const Container = styled.View`
  width: 90%;
  margin: 0px 0 20px 0;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const Transactions = () => {
  const colorScheme = useColorScheme();

  //redux store spending data
  const spendingState: SpendingStateParams = useAppSelector(selectAccount);

  //redux dispatch to state
  const dispatch = useAppDispatch();

  const {
    spending: { filter, startDate, endDate },
  } = spendingState;

  //retrieve manual transactions from DB
  const { error, data, loading, refetch } = useQuery(GET_ALL_TRANSACTIONS);

  useEffect(() => {
    if (!error && !loading) {
      //send manual transactions to redux store received via api
      dispatch(
        setManualTransactions({
          account_id: 'manual_transaction',
          transactions: data?.getAllManualTransactions?.transactions,
        }),
      );
    }
  }, [data, loading, error]);

  useEffect(() => {
    if (spendingState.spending.account_transactions.length > 0) {
      dispatch(
        setTransactionsInDateRange({
          all_transactions: spendingState.spending.account_transactions,
          startDate,
          endDate,
        }),
      );
    }
  }, [filter, spendingState.spending.account_transactions]);

  useEffect(() => {
    //refetch on component load
    refetch();
  }, [filter]);

  if (spendingState?.spending?.transactions_in_date_range?.length === 0) {
    return null;
  }

  const renderItem = ({ item }: { item: TransactionItemType }) => {
    return (
      <TransactionItem
        item={item}
        filter={filter}
        startDate={startDate}
        endDate={endDate}
      />
    );
  };

  return (
    <Container
      style={{
        borderWidth: 1,
        borderColor: Colors[colorScheme].tint + '90',
      }}
    >
      <Title style={{ color: Colors[colorScheme].text }}>
        Transactions This {filter}
      </Title>
      <FlatList
        horizontal={true}
        data={spendingState?.spending?.transactions_in_date_range}
        renderItem={renderItem}
        keyExtractor={(item) => item.transaction_id ?? item._id}
        style={{
          marginTop: 10,
        }}
      />
    </Container>
  );
};

export default Transactions;
