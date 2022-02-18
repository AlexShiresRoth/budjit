import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-width: 1.4px;
  padding: 5px;
  border-radius: 5px;
`;
const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-right-width: 1.4px;
  margin-right: 10px;
  width: 50px;
`;
const Column = styled.View`
  justify-content: center;
`;
const Label = styled.Text`
  color: #fefefe;
  font-size: 16px;
  opacity: 0.5;
`;
const TextInput = styled.TextInput`
  border-color: #fff;
  border-style: solid;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #f5f5f5;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
`;

type Props = {
  value: string;
  callback: ({ ...args }: any) => any;
  style: any;
  label: string;
  isSecure: boolean;
  icon: React.ReactElement;
  color: string;
};

const Input = ({
  value,
  callback,
  style,
  label,
  isSecure,
  icon,
  color,
}: Props) => {
  return (
    <Container style={{ backgroundColor: color + '44' }}>
      <IconContainer>{icon}</IconContainer>
      <Column>
        {/* <Label>{label}</Label> */}
        <TextInput
          value={value}
          onChangeText={callback}
          secureTextEntry={isSecure ? true : false}
          placeholder={label}
          placeholderTextColor="#ffffff75"
          multiline={isSecure ? false : true}
          textAlignVertical="auto"
        />
      </Column>
    </Container>
  );
};

export default Input;
