import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type UpdateState = { shouldRefreshGroup: boolean };

const INITIAL_STATE: UpdateState = {
  shouldRefreshGroup: false,
};

export const updatesSlice = createSlice({
  name: 'updates',
  initialState: INITIAL_STATE,
  reducers: {
    setShouldRefreshGroup: (state, action) => {
      state.shouldRefreshGroup = action.payload;
    },
  },
});

export const { setShouldRefreshGroup } = updatesSlice.actions;

export const selectUpdateState = (state: RootState) => state.updates;

export default updatesSlice.reducer;
