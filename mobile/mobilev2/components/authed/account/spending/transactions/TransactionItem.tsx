import React from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../../hooks/useColorScheme';
import Colors from '../../../../../constants/Colors';
import { TransactionItemType } from '../../../../../types/Transaction.types';

const Item = styled.View`
  padding: 20px;
  margin: 0 10px 0 0;
  border-radius: 5px;
  min-width: 200px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.Text``;

const TransactionItem = ({ item }: { item: TransactionItemType }) => {
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
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors[colorScheme].tint + '20',
        }}
      >
        <Text
          style={{
            color: Colors[colorScheme].text + '60',
            fontWeight: '400',
            marginBottom: 2,
            marginTop: 2,
            fontSize: 15,
          }}
        >
          {item.location}
        </Text>
        <Text
          style={{
            color: Colors[colorScheme].tint + '80',
            fontWeight: '200',
            marginBottom: 5,
            marginTop: 5,
            fontStyle: 'italic',
            fontSize: 12,
          }}
        >
          {formatDate(item.date)}
        </Text>
      </Row>
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
    </Item>
  );
};

export default TransactionItem;
