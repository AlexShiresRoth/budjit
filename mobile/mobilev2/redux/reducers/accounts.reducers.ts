import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type AccountParams = {
  myAccount: {
    email: string;
    name: string;
    profile: string;
  };
  token: string;
};

export type TransactionType = {
  name: string;
  date: string;
  amount: number;
  transaction_id: string;
};

export type PlaidAccountsModal = {
  modalVisible: boolean;
  connection: any;
};

interface InitialStateParams {
  myAccount: {
    email: string;
    name: string;
    profile: string;
  };
  plaidAccounts: {
    connection: any;
    modalVisible: boolean;
    accessTokens: Array<string>;
  };
  spending: {
    filter: 'Month' | 'Year' | 'Week';
    totals: Array<{ id: string; amount: number }>;
    startDate: string;
    endDate: string;
    isSpendingFilterLoading: boolean;
    account_transactions: Array<{
      account_id: string;
      transactions: Array<{
        name: string;
        date: string;
        amount: number;
        transaction_id: string;
      }>;
    }>;
  };
  isAuthenticated: boolean;
}

const initialState: InitialStateParams = {
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

export const accountSlice = createSlice({
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
      action: PayloadAction<{
        transactions: Array<TransactionType>;
        account_id: string;
      }>,
    ) => {
      state.spending.account_transactions = [
        ...state.spending.account_transactions,
        action.payload,
      ];
    },
    setTransactionsWithinTimeFrame: (
      state,
      action: PayloadAction<{
        account_transactions: {
          account_id: string;
          transactions: Array<{
            name: string;
            date: string;
            amount: number;
            transaction_id: string;
          }>;
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
  setSpendingAmount,
  setSpendingFilterLoadingState,
  setTransactionsWithinTimeFrame,
} = accountSlice.actions;

export const selectAccount = (state: RootState) => state.accounts;

export default accountSlice.reducer;
