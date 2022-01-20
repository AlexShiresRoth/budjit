import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Signin from '../../components/signin/Signin';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { RootStackParamList } from '../../types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

const Container = styled.View`
  width: 90%;
  flex: 1;
`;

type Props = BottomTabScreenProps<RootStackParamList, 'Signin'>;

const SigninScreen = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors[colorScheme].background,
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Container>
        <Signin navigation={navigation} route={route} />
      </Container>
    </SafeAreaView>
  );
};

export default SigninScreen;
