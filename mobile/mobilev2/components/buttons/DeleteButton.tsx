import React from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text } from 'react-native';

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 15px;
`;

type Props = {
  id: string;
  handleDeleteTransaction: (id: string) => void;
  buttonText: string;
};

const DeleteButton = ({ id, handleDeleteTransaction, buttonText }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Button
      style={{
        padding: 5,
        backgroundColor: Colors[colorScheme].danger + '90',
        borderRadius: 5,
      }}
      onPress={() => handleDeleteTransaction(id)}
    >
      <AntDesign
        name="delete"
        size={14}
        color={Colors[colorScheme].background}
      />
      <Text
        style={{
          color: Colors[colorScheme].background,
          fontSize: 14,
          marginLeft: 5,
        }}
      >
        {buttonText}
      </Text>
    </Button>
  );
};

export default DeleteButton;
