import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import styled from 'styled-components/native';
const Row = styled.View`
  flex-direction: row;
`;
type Props = {
  handleResetOnClose: () => void;
  buttonText: string;
};

const ModalCloseButton = ({ handleResetOnClose, buttonText }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => handleResetOnClose()}
      style={{
        backgroundColor: Colors[colorScheme].cardBg,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors[colorScheme].cardBg,
      }}
    >
      <Text
        style={{
          color: Colors[colorScheme].background,
          fontSize: 12,
        }}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default ModalCloseButton;
