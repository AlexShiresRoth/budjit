import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  buttonColor?: string;
  text: string;
  onPress: (val: any) => void;
  textColor?: string;
};

const ToggleButton = ({ buttonColor, text, onPress, textColor }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        backgroundColor: buttonColor ?? "transparent",
      }}
    >
      <Text style={{ color: textColor ?? "transparent", fontSize: 16 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ToggleButton;
