import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Text = styled.Text`
  font-weight: 500;
  font-size: 20px;
  opacity: 0.8;
`;

type Props = {
  subheadingText: string;
};
const SubHeading = ({ subheadingText }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Text style={{ color: Colors[colorScheme].text }}>{subheadingText}</Text>
  );
};

export default SubHeading;
