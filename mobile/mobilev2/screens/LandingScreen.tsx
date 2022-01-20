import React, { FC } from 'react';
import styled from 'styled-components/native';
import Splash from '../components/landing/Splash';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const Screen = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const LandingScreen: FC = () => {
  const colorScheme = useColorScheme();
  return (
    <Screen style={{ backgroundColor: Colors[colorScheme].background }}>
      <Splash />
    </Screen>
  );
};

export default LandingScreen;
