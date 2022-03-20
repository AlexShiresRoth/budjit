import React from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../hooks/useColorScheme';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectAccount } from '../../../redux/reducers/accounts.reducers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import Spending from './Spending';
import AccountHeader from './AccountHeader';
import BankingConnects from './BankingConnects';
import AccountsModal from './AccountsModal';
import Transactions from './Transactions';
import Occasions from './occasions/Occasions';

const Container = styled.View`
  align-items: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountSpace = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const accountState = useAppSelector(selectAccount);

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
      <Transactions />
      <AccountsModal />
      <Occasions />
    </Container>
  );
};

export default AccountSpace;
