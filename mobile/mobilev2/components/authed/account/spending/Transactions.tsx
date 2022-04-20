import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import useColorScheme from '../../../../hooks/useColorScheme';
import Colors from '../../../../constants/Colors';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { selectAccount } from '../../../../redux/reducers/accounts.reducers';
import { FlatList, ScrollView } from 'react-native';

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

const Item = styled.View`
  padding: 20px;
  margin: 0 10px 0 0;
  border-radius: 5px;
  min-width: 200px;
`;

const Text = styled.Text``;

type TransactionItemProps = {
  item: { name: string; amount: number; date: string; transaction_id: string };
};

const Transactions = () => {
  const colorScheme = useColorScheme();

  const spendingState = useAppSelector(selectAccount);

  const [transactions, concatTransactions] = useState<
    Array<{
      name: string;
      date: string;
      amount: number;
      transaction_id: string;
    }>
  >([]);

  const {
    spending: { filter, account_transactions },
  } = spendingState;

  useEffect(() => {
    if (account_transactions.length > 0) {
      const temp: Array<{
        name: string;
        date: string;
        amount: number;
        transaction_id: string;
      }> = [];
      account_transactions.forEach(
        (account: {
          transactions: Array<{
            name: string;
            date: string;
            amount: number;
            transaction_id: string;
          }>;
        }) => {
          account.transactions.forEach((transaction) => {
            const ids = temp.map((t) => t.transaction_id);
            if (!ids.includes(transaction.transaction_id)) {
              temp.push(transaction);
            }
          });
        },
      );

      concatTransactions(temp);
    }
  }, [spendingState]);

  if (transactions.length === 0) {
    return null;
  }

  const renderItem = ({ item }: TransactionItemProps) => {
    return <TransactionItem item={item} />;
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
        keyExtractor={(item) => item.transaction_id}
        style={{
          marginTop: 10,
        }}
      />
    </Container>
  );
};

const TransactionItem = ({ item }: TransactionItemProps) => {
  const colorScheme = useColorScheme();

  const formatDate = (date: string) => {
    const dateArr = date.split('-');
    const firstEl = dateArr[0];
    dateArr.shift();
    dateArr.push(firstEl);
    return dateArr.join('/');
  };
  return (
    <Item style={{ backgroundColor: Colors[colorScheme].tint + '40' }}>
      <Text
        style={{
          color: Colors[colorScheme].text + '90',
          fontWeight: '700',
          marginBottom: 5,
          marginTop: 5,
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          color: item.amount < 0 ? 'green' : Colors[colorScheme].danger,
          fontWeight: '700',
          marginBottom: 5,
          marginTop: 5,
        }}
      >
        ${item.amount.toFixed(2)}
      </Text>
      <Text
        style={{
          color: Colors[colorScheme].tint,
          fontWeight: '200',
          marginBottom: 5,
          marginTop: 5,
          fontStyle: 'italic',
        }}
      >
        {formatDate(item.date)}
      </Text>
    </Item>
  );
};

export default Transactions;
