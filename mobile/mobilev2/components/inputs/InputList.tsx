import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Dimensions from '../../constants/Layout';

export type ItemParam = { title: string; component: React.ReactNode };

type Params = {
  inputList: Array<ItemParam>;
  isEditMode?: boolean;
};

const InputCol = styled.View`
  margin-vertical: 5px;
`;

//should component adjust height for more menu items as per editing?
const InputList = ({ inputList, isEditMode }: Params) => {
  const renderItem = ({ item }: { item: ItemParam }) => {
    return <InputCol>{item.component}</InputCol>;
  };

  return (
    <FlatList
      renderItem={renderItem}
      data={inputList}
      keyExtractor={(item: ItemParam) => item.title}
      style={{
        maxHeight: isEditMode
          ? Dimensions.window.height - Dimensions.window.height / 2.8
          : Dimensions.window.height - Dimensions.window.height / 4,
      }}
    />
  );
};

export default InputList;
