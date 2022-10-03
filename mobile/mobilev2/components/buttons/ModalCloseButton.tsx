import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {
  handleResetOnClose: () => void;
  buttonText: string;
};

const ModalCloseButton = ({ handleResetOnClose, buttonText }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => handleResetOnClose()}
      style={{ alignItems: 'center' }}
    >
      <AntDesign name="close" size={20} color={Colors[colorScheme].text} />
    </TouchableOpacity>
  );
};

export default ModalCloseButton;
