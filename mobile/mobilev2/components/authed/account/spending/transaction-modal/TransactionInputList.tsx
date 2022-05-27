import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Dimensions from '../../../../../constants/Layout';

type ItemParam = { title: string; component: React.ReactNode };

type Params = {
  inputList: Array<ItemParam>;
};

const InputCol = styled.View`
  margin-vertical: 8px;
`;

const TransactionInputList = ({ inputList }: Params) => {
  const renderItem = ({ item }: { item: ItemParam }) => {
    return <InputCol>{item.component}</InputCol>;
  };

  console.log('dimensions', Dimensions);
  //TODO need to get device dimensions
  return (
    <FlatList
      renderItem={renderItem}
      data={inputList}
      keyExtractor={(item: ItemParam) => item.title}
      style={{ maxHeight: Dimensions.window.height - 250 }}
    />
  );
};

export default TransactionInputList;
