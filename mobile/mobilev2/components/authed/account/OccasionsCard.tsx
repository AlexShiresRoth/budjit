import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { RootStackParamList } from '../../../types';

const Container = styled.View`
  align-items: center;
`;
const Content = styled.View`
  width: 90%;
`;
const Box = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 5px;
`;
const SubHeading = styled.Text`
  font-size: 16px;
  color: #fefefe;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: #fefefe;
  font-size: 30px;
  font-weight: 700;
`;
const SubText = styled.Text`
  color: #fefefe55;
  font-weight: 700;
  margin-top: 20px;
`;
const Total = styled.Text`
  color: #fefefe;
  font-weight: 700;
  font-size: 50px;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const OccasionsCard = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <Container
      style={{
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        height: '100%',
      }}
    >
      <Content
        style={{
          borderRadius: 10,
          backgroundColor: Colors[colorScheme].cardBg + '20',
        }}
      >
        <Box onPress={() => navigation.navigate('Occasions')}>
          <SubHeading style={{ color: Colors[colorScheme].text + '80' }}>
            Create Budgets For Certain Occasions
          </SubHeading>
          <Text style={{ color: Colors[colorScheme].text }}>
            View My Occasions
          </Text>
          <SubText style={{ color: Colors[colorScheme].tint }}>
            Occasions Created:
          </SubText>
          <Total style={{ color: Colors[colorScheme].tint }}>{0}</Total>
        </Box>
      </Content>
    </Container>
  );
};

export default OccasionsCard;
