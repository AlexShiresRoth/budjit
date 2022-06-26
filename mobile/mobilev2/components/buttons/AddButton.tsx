import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

type Props = {
  addFunction: (param: any) => void;
  args: any;
};

const AddButton = ({ addFunction, args }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={{
        padding: 5,
        backgroundColor: Colors[colorScheme].success + '90',
        borderRadius: 5,
      }}
      onPress={() => addFunction(args)}
    >
      <Text style={{ color: Colors[colorScheme].background }}>+ Add</Text>
    </TouchableOpacity>
  );
};

export default AddButton;
