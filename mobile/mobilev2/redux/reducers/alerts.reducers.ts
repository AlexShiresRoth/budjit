import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AlertParams {
  type: 'danger' | 'success' | '';
  message: string;
}

export type InitialStateParams = {
  alert: AlertParams;
  isVisible: boolean;
};

const initialState: InitialStateParams = {
  alert: {
    type: '',
    message: '',
  },
  isVisible: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertParams>) => {
      state.alert = action.payload;
      state.isVisible = true;
    },
    resetAlert: (state, action: PayloadAction<any>) => {
      state.alert = { type: '', message: '' };
      state.isVisible = false;
    },
  },
});

export const { setAlert, resetAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alerts;

export default alertSlice.reducer;
