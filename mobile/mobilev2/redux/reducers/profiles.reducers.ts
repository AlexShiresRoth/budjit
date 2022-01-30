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

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileState: (state, action: PayloadAction<UpdateProfileParams>) => {
      state.myProfile = action.payload;
    },
    updateMyProfile: (state, action: PayloadAction<UpdateProfileParams>) => {
      state.myProfile = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<{ avatar: string }>) => {
      state.myProfile.avatar = action.payload.avatar;
    },
  },
});

export const { updateMyProfile, updateAvatar, setProfileState } =
  profileSlice.actions;

export const selectProfile = (state: RootState) => state.profiles;

export default profileSlice.reducer;
