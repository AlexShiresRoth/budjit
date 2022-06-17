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
import Spending from './spending/Spending';
import AccountHeader from './AccountHeader';
import BankingConnects from './BankingConnects';
import AccountsModal from './AccountsModal';
import Transactions from './spending/Transactions';
import OccasionsCard from './OccasionsCard';
import ManualTransactionCard from './spending/ManualTranasactionCard';
import { ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import { selectAlert } from '../../../redux/reducers/alerts.reducers';
import Alert from '../../alerts/Alert';
import SpendingChart from './SpendingChart';

const Container = styled.View`
  align-items: center;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountSpace = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const accountState = useAppSelector(selectAccount);

  const {
    alert: { type, message },
    isVisible,
  } = useAppSelector(selectAlert);

  const dispatch = useAppDispatch();

  useEffect(() => {
    //if no banking connects exist, dont load component
    if (accountState?.plaidAccounts?.accessTokens?.length === 0) {
      dispatch(setSpendingFilterLoadingState(false));
    }
  }, [accountState]);

  return (
    <>
      {isVisible && <Alert />}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme].background,
          padding: 0,
        }}
      >
        <Container>
          <AccountHeader
            accounts={accountState}
            colorScheme={colorScheme}
            navigation={navigation}
            route={route}
          />
          <SpendingChart />
          <Spending colorScheme={colorScheme} />
          <Transactions />
          <AccountsModal />
          <OccasionsCard route={route} navigation={navigation} />
        </Container>
      </ScrollView>
      <ManualTransactionCard colorScheme={colorScheme} />
    </>
  );
};

export default AccountSpace;
