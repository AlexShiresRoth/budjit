import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Text = styled.Text`
  font-weight: 700;
  font-size: 40px;
`;

type Props = {
  headingText: string;
};

const Heading = ({ headingText }: Props) => {
  const colorScheme = useColorScheme();
  return <Text style={{ color: Colors[colorScheme].text }}>{headingText}</Text>;
};

export default Heading;
