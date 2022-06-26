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
`;

type Props = {
  id: string;
  deleteFunction: (id: string) => void;
  buttonText: string;
};

const DeleteButton = ({ id, deleteFunction, buttonText }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <Button
      style={{
        padding: 5,
        backgroundColor: Colors[colorScheme].danger + '90',
        borderRadius: 5,
      }}
      onPress={() => deleteFunction(id)}
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
