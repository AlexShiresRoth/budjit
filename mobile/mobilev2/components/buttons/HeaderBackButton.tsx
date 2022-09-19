import { Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

type Nav = {
  navFunction: () => void;
};

const HeaderBackButton = ({ navFunction }: Nav) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={navFunction}
      style={{
        marginRight: 0,
        backgroundColor: Colors[colorScheme].accountBg,
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <FontAwesome name="arrow-left" style={{ marginRight: 5 }} />
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
