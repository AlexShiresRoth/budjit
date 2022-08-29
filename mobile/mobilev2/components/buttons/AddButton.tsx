import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  addFunction: (param: any) => void;
  args: any;
  buttonText?: string;
};

const AddButton = ({ addFunction, args, buttonText }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: Colors[colorScheme].success,
        borderRadius: 5,
        width: '100%',
      }}
      onPress={() => addFunction(args)}
    >
      <Text style={{ color: Colors[colorScheme].background }}>
        <Ionicons name="add-circle-outline" /> {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default AddButton;
