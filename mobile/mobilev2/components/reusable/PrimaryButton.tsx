import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  width: 100%;
`;
const Text = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 18px;
`;

interface PrimaryButtonParams {
  buttonText: string;
  colorArr: Array<string>;
  callBack: undefined | ((args: any | undefined) => any);
  callBackArgs: null | undefined | any;
  buttonTextColor: string | undefined | null;
}

const PrimaryButton = ({
  buttonText = 'Click Here',
  colorArr = [`#8980F5`, `#76E5FC`],
  callBack,
  callBackArgs,
  buttonTextColor = '#fff',
}: PrimaryButtonParams) => {
  return (
    <Button onPress={callBack ? () => callBack(callBackArgs) : () => {}}>
      <LinearGradient colors={colorArr} style={Styles.button}>
        <Text style={{ color: buttonTextColor || '#fff' }}>{buttonText}</Text>
      </LinearGradient>
    </Button>
  );
};

const Styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrimaryButton;
