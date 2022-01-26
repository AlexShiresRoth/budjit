import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialStateParams {
  myProfile: {
    displayName: string;
    avatar: string;
  };
}

export type ProfileParams = {
  myProfile: {
    displayName: string;
    avatar: string;
  };
};

export type UpdateProfileParams = {
  displayName: string;
  avatar: string;
};

const initialState: InitialStateParams = {
  myProfile: {
    displayName: '',
    avatar: '',
  },
};

export const accountSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateMyProfile: (state, action: PayloadAction<UpdateProfileParams>) => {
      state.myProfile = action.payload;
    },
  },
});

export const { updateMyProfile } = accountSlice.actions;

export const selectProfile = (state: RootState) => state.profiles;

export default accountSlice.reducer;
