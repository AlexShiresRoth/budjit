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

//TODO keep updating redux to more modern pattern

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
  },
});

export const { authenticate, createAccount } = accountSlice.actions;

export const selectAccount = (state: RootState) => state.accounts;

export default accountSlice.reducer;
