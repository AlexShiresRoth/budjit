import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountParams, PlaidAccountsModal } from '../../types/Accounts.types';
import {
  AccountsInitialStateParams,
  TransactionItemType,
} from '../../types/Transaction.types';
import { RootState } from '../store';

const initialState: AccountsInitialStateParams = {
  myAccount: {
    email: '',
    name: '',
    profile: '',
  },
  plaidAccounts: {
    connection: null,
    modalVisible: false,
    accessTokens: [],
  },
  spending: {
    filter: 'Week',
    totals: [],
    startDate: '',
    endDate: '',
    isSpendingFilterLoading: true,
    account_transactions: [],
  },
  isAuthenticated: false,
};

export const accountSlice: any = createSlice({
  name: 'account',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AccountParams>) => {
      AsyncStorage.setItem('@auth_token', action.payload.token);
      /////////////////////////////
      state.isAuthenticated = true;
      ////////////////////////////////
      state.myAccount = action.payload.myAccount;
    },
    createAccount: (state, action: PayloadAction<AccountParams>) => {
      AsyncStorage.setItem('@auth_token', action.payload.token);
      /////////////////////////////
      state.isAuthenticated = true;
      ////////////////////////////////
      state.myAccount = action.payload.myAccount;
    },
    signOutOfAccount: (state, action: PayloadAction<undefined>) => {
      state.isAuthenticated = false;
      state.myAccount = { email: '', name: '', profile: '' };
    },
    addPlaidAccessTokens: (
      state,
      action: PayloadAction<{ accessToken: string }>,
    ) => {
      if (
        !state.plaidAccounts.accessTokens.includes(action.payload.accessToken)
      ) {
        state.plaidAccounts.accessTokens.push(action.payload.accessToken);
      }
    },
    togglePlaidAccountsModal: (
      state,
      action: PayloadAction<PlaidAccountsModal>,
    ) => {
      /////////////////////////
      state.plaidAccounts.connection = action.payload.connection;
      /////////////////////////////////////////
      state.plaidAccounts.modalVisible = action.payload.modalVisible;
    },
    setSpendingFilter: (
      state,
      action: PayloadAction<{
        spending: {
          filter: 'Year' | 'Month' | 'Week';
          startDate: string;
          endDate: string;
        };
      }>,
    ) => {
      /////////////////////////
      state.spending.filter = action.payload.spending.filter;
      ////////////////////////
      state.spending.startDate = action.payload.spending.startDate;
      ////////////////////////
      state.spending.endDate = action.payload.spending.endDate;
    },
    setSpendingAmount: (
      state,
      action: PayloadAction<{ amount: number; id: string }>,
    ) => {
      ////////////////////////////////////
      const ids = state.spending.totals.map((total) => total.id);
      //////////////////////////////////////
      const indexToInsert = ids.indexOf(action.payload.id);
      //////////////////////////////
      if (indexToInsert !== -1) {
        //////////////////////
        state.spending.totals[indexToInsert] = action.payload;
        ////////////////////////
      } else state.spending.totals.push(action.payload);
    },
    setSpendingFilterLoadingState: (state, action: PayloadAction<boolean>) => {
      ///////////////////////////////
      state.spending.isSpendingFilterLoading = action.payload;
      ///////////////////////////////
    },
    //setting transactions from manual input is different than from plaid
    addManualTransaction: (
      state,
      action: PayloadAction<TransactionItemType>,
    ) => {
      //retrieve account ids for filtering
      const accountIds = state.spending.account_transactions.map(
        (account) => account.account_id,
      );
      //filter by manual account
      const index = accountIds.indexOf('manual_transaction');

      state.spending.account_transactions[index].transactions = [
        ...state.spending.account_transactions[index].transactions,
        action.payload,
      ];
    },
    setManualTranactions: (
      state,
      action: PayloadAction<
        Array<{ account_id: string; transactions: Array<TransactionItemType> }>
      >,
    ) => {
      state.spending.account_transactions = [
        ...state.spending.account_transactions,
        ...action.payload,
      ];
    },
    setTransactionsWithinTimeFrame: (
      state,
      action: PayloadAction<{
        account_transactions: {
          account_id: string;
          transactions: Array<TransactionItemType>;
        };
      }>,
    ) => {
      /////////////////////////////////////
      if (action.payload.account_transactions) {
        if (state.spending.account_transactions.length > 0) {
          const ids = state.spending.account_transactions.map(
            (tr) => tr.account_id,
          );
          const insertIndex = ids.indexOf(
            action.payload.account_transactions.account_id,
          );

          if (insertIndex !== -1) {
            state.spending.account_transactions[insertIndex].transactions =
              action.payload.account_transactions.transactions;
          } else
            state.spending.account_transactions.push(
              action.payload.account_transactions,
            );
        } else
          state.spending.account_transactions.push(
            action.payload.account_transactions,
          );
      }
    },
  },
});

export const {
  authenticate,
  createAccount,
  signOutOfAccount,
  togglePlaidAccountsModal,
  setSpendingFilter,
  addPlaidAccessTokens,
  addManualTransaction,
  setSpendingAmount,
  setSpendingFilterLoadingState,
  setTransactionsWithinTimeFrame,
  setManualTranactions,
} = accountSlice.actions;

export const selectAccount = (state: RootState) => state.accounts;

export default accountSlice.reducer;
