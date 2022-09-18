import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type InitialState = {
  currentRoute: string;
  showBackButton: boolean;
};

const initialState: InitialState = {
  currentRoute: 'Home',
  showBackButton: false,
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
  },
});

export const { changeCurrentRoute, showBackButton } = navigationSlice.actions;

export const selectNavState = (state: RootState) => state.navigation;

export default navigationSlice.reducer;
