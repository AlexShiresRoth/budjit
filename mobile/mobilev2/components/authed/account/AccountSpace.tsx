import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectProfile } from '../../../redux/reducers/profiles.reducers';
import { selectAccount } from '../../../redux/reducers/accounts.reducers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import Spending from './Spending';
import AccountHeader from './AccountHeader';

const Container = styled.View`
  align-items: center;
`;
const Content = styled.View`
  width: 90%;
`;
const Box = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 10px;
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

const AccountSpace = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const accountState = useAppSelector(selectAccount);

  const profileState = useAppSelector(selectProfile);

  console.log('profile state', profileState);

  const OCCASION_TOTAL = 0;

  return (
    <Container>
      <AccountHeader
        accounts={accountState}
        colorScheme={colorScheme}
        navigation={navigation}
        route={route}
      />
      <Spending colorScheme={colorScheme} />
      <Content>
        <Box style={{ backgroundColor: Colors[colorScheme].secondary }}>
          <SubHeading style={{ color: Colors[colorScheme].tint }}>
            Create Budgets For Certain Occasions
          </SubHeading>
          <Text>View My Occasions</Text>
          <SubText>Occasions Created:</SubText>
          <Total>{OCCASION_TOTAL}</Total>
        </Box>
      </Content>
    </Container>
  );
};

export default AccountSpace;
