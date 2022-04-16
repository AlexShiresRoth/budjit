import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../hooks/useColorScheme';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectAccount,
  setSpendingFilterLoadingState,
} from '../../../redux/reducers/accounts.reducers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import Spending from './Spending';
import AccountHeader from './AccountHeader';
import BankingConnects from './BankingConnects';
import AccountsModal from './AccountsModal';
import Transactions from './Transactions';
import OccasionsCard from './OccasionsCard';

const Container = styled.View`
  align-items: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountSpace = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const accountState = useAppSelector(selectAccount);

  const dispatch = useAppDispatch();

  useEffect(() => {
    //if no banking connects exist, dont load component
    if (accountState?.plaidAccounts?.accessTokens?.length === 0) {
      dispatch(setSpendingFilterLoadingState(false));
    }
  }, [accountState]);

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
      <OccasionsCard route={route} navigation={navigation} />
    </Container>
  );
};

export default AccountSpace;
