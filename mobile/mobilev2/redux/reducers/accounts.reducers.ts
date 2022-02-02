import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialStateParams {
  myAccount: {
    email: string;
    name: string;
    profile: string;
  };
  isAuthenticated: boolean;
}

export type AccountParams = {
  myAccount: {
    email: string;
    name: string;
    profile: string;
  };
  token: string;
};

const initialState: InitialStateParams = {
  myAccount: {
    email: '',
    name: '',
    profile: '',
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
  },
});

export const { authenticate, createAccount, signOutOfAccount } =
  accountSlice.actions;

export const selectAccount = (state: RootState) => state.accounts;

export default accountSlice.reducer;
