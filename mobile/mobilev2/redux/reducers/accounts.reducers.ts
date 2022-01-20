import { AUTHENTICATE, CREATE_ACCOUNT } from '../types/accounts.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InitialStateParams {
  myAccount: undefined | null;
  isAuthenticated: boolean;
}

interface ActionParams {
  type: string;
  payload: any;
}

const initialState: InitialStateParams = {
  myAccount: null,
  isAuthenticated: false,
};

export const accounts = (
  state: InitialStateParams = initialState,
  action: ActionParams,
) => {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATE:
      AsyncStorage.setItem('@auth_token', payload.token);
      return {
        ...state,
        myAccount: payload.account,
        isAuthenticated: true,
      };
    case CREATE_ACCOUNT:
      AsyncStorage.setItem('@auth_token', payload.token);
      return {
        ...state,
        myAccount: payload.account,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
