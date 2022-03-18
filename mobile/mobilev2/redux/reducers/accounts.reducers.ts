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

export type PlaidAccountsModal = {
  modalVisible: boolean;
  connection: any;
};

export type SpendingParams = {
  spending: { filter: 'Month' | 'Year' | 'Week'; amount: number };
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
        spending: { filter: 'Year' | 'Month' | 'Week' };
      }>,
    ) => {
      /////////////////////////
      state.spending.filter = action.payload.spending.filter;
      ////////////////////////
    },
    setSpendingAmount: (
      state,
      action: PayloadAction<{ amount: number; id: string }>,
    ) => {
      //transactions and access tokens must be same length
      //TODO insert payload at index of id
      if (state.spending.totals.length > 0) {
        console.log('yes?');
        const ids = state.spending.totals.map((total) => total.id);
        const indexOfInsert = ids.indexOf(action.payload.id);
        console.log('index', indexOfInsert, ids, action.payload.id);
        if (indexOfInsert > 0) {
          console.log('replacing', indexOfInsert);
          state.spending.totals[indexOfInsert] = action.payload;
        } else state.spending.totals.push(action.payload);
      } else state.spending.totals.push(action.payload);
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
} = accountSlice.actions;

export const selectAccount = (state: RootState) => state.accounts;

export default accountSlice.reducer;
