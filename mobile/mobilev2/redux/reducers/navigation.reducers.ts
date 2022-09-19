import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type InitialState = {
  currentRoute: string;
  showBackButton: boolean;
  showHeader: boolean;
};

const initialState: InitialState = {
  currentRoute: 'Home',
  showBackButton: false,
  showHeader: true,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    changeCurrentRoute: (state, action: PayloadAction<{ route: string }>) => {
      state.currentRoute = action.payload.route;
    },
    showBackButton: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showBackButton = action.payload.show;
    },
    showHeader: (state, action: PayloadAction<{ show: boolean }>) => {
      state.showHeader = action.payload.show;
    },
  },
});

export const { changeCurrentRoute, showBackButton, showHeader } =
  navigationSlice.actions;

export const selectNavState = (state: RootState) => state.navigation;

export default navigationSlice.reducer;
