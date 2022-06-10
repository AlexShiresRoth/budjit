import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  selectAccount,
  setManualTransactions,
} from '../../../../redux/reducers/accounts.reducers';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../../../../graphql/queries/accounts.query';
import {
  SpendingStateParams,
  TransactionItemType,
} from '../../../../types/Transaction.types';
import { RootStateOrAny } from 'react-redux';
import TransactionItem from './transactions/TransactionItem';
import { RootState } from '../../../../redux/store';
import useTransactionsInRange from '../../../../hooks/useTransactionsInRange';

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
    spending: { filter, account_transactions, startDate, endDate },
  } = spendingState;

  const [transactions, setTransactions] = useState<Array<TransactionItemType>>(
    [],
  );

  //retrieve manual transactions from DB
  const { error, data, loading, refetch } = useQuery(GET_ALL_TRANSACTIONS);

  //custom hook for setting transactions in range
  const { transactionsInRange } = useTransactionsInRange();

  //transactions can either be connected via plaid or entered manually.
  //This function combines both into a concatenated array sorted by date
  const combineArraysOfTransactions = () => {
    if (account_transactions?.length > 0 && account_transactions) {
      const temp: Array<TransactionItemType> = [];
      account_transactions?.forEach(
        (account: { transactions: Array<TransactionItemType> }) =>
          account?.transactions?.forEach((transaction) => {
            //transactions will either have _id if manual transaction or
            //transaction_id if from connected plaid account
            const ids = temp.map((t) => t.transaction_id ?? t._id);
            if (!ids.includes(transaction.transaction_id ?? transaction._id)) {
              temp.push(transaction);
            }
          }),
      );

      const sorted = temp.sort(
        (a: TransactionItemType, b: TransactionItemType) => {
          let aDate = new Date(a.date),
            bDate = new Date(b.date);
          return aDate > bDate ? -1 : 1;
        },
      );

      setTransactions(sorted);
    }
  };

  useEffect(() => {
    combineArraysOfTransactions();
  }, [spendingState]);

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
    //refetch on component load
    refetch();
  }, [filter]);

  if (transactions.length === 0) {
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
        data={transactions}
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
