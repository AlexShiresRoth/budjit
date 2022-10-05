import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import IconContainerWithRightBorder from '../icons/IconContainerWithRightBorder';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
`;

const Column = styled.View`
  justify-content: center;
`;
const Label = styled.Text`
  font-size: 12px;
  opacity: 0.7;
`;
const TextInput = styled.TextInput`
  border-style: solid;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
`;

type Props = {
  value: string;
  callback: (...args: any) => any;
  style: any;
  label: string;
  isSecure: boolean;
  icon: React.ReactElement;
  color: string;
  labelStyle: any;
  descriptor: string | undefined;
};

const Input = ({
  value,
  callback,
  style,
  label,
  isSecure,
  icon,
  color,
  descriptor,
  labelStyle,
}: Props) => {
  const colorScheme = useColorScheme();

  return (
    <Container style={{ borderColor: color, borderWidth: 1 }}>
      <IconContainerWithRightBorder icon={icon} borderRightColor={color} />
      <Column>
        {descriptor ? <Label style={labelStyle}>{descriptor}</Label> : null}
        <TextInput
          value={value}
          onChangeText={callback}
          secureTextEntry={isSecure ? true : false}
          placeholder={label}
          placeholderTextColor={Colors[colorScheme].text + '40'}
          multiline={isSecure ? false : true}
          textAlignVertical="auto"
          style={style}
        />
      </Column>
    </Container>
  );
};

export default Input;
