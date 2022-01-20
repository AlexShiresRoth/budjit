import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';
import Signup from '../../components/signup/Signup';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../types';
import styled from 'styled-components/native';

const Content = styled.View`
  width: 90%;
  flex: 1;
  justify-content: center;
`;

type Props = BottomTabScreenProps<RootStackParamList, 'Signup'>;
//TODO finish adding nav
const SignupScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].background,
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Content>
        <Signup
          colorScheme={colorScheme}
          navigation={navigation}
          route={route}
        />
      </Content>
    </SafeAreaView>
  );
};

SignupScreen.propTypes = {};

export default SignupScreen;
