import { RootStateOrAny } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AUTHENTICATE, CREATE_ACCOUNT } from '../types/accounts.types';

export const action_authenticateUser =
  (payload: any): ThunkAction<void, RootStateOrAny, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      payload,
    });
  };

export const action_createUser =
  (payload: any): ThunkAction<void, RootStateOrAny, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: CREATE_ACCOUNT,
      payload,
    });
  };
