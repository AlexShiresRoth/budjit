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
import BankingConnects from './BankingConnects';
import AccountsModal from './AccountsModal';

const Container = styled.View`
  align-items: center;
`;
const Content = styled.View`
  width: 90%;
`;
const Box = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 5px;
  margin-top: -60px;
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
      <BankingConnects />
      <Spending colorScheme={colorScheme} />
      <AccountsModal />
      <Container
        style={{
          width: '100%',
          paddingTop: 30,
          paddingBottom: 30,
          height: '100%',
        }}
      >
        <Content>
          <Box>
            <SubHeading style={{ color: Colors[colorScheme].text + '80' }}>
              Create Budgets For Certain Occasions
            </SubHeading>
            <Text style={{ color: Colors[colorScheme].text }}>
              View My Occasions
            </Text>
            <SubText style={{ color: Colors[colorScheme].tint }}>
              Occasions Created:
            </SubText>
            <Total style={{ color: Colors[colorScheme].tint }}>
              {OCCASION_TOTAL}
            </Total>
          </Box>
        </Content>
      </Container>
    </Container>
  );
};

export default AccountSpace;
