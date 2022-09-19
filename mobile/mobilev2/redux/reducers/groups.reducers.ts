import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupType } from '../../types/Groups.types';
import { RootState } from '../store';

export type GroupsState = {
  groups: Array<GroupType>;
};

const initialState: GroupsState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: 'groups',

  initialState,
  reducers: {
    fetchMyGroups: (state, action: PayloadAction<Array<GroupType>>) => {
      state.groups = action.payload;
    },
    addNewGroupToState: (state, action: PayloadAction<GroupType>) => {
      state.groups.push(action.payload);
    },
    removeGroupFromState: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(
        (group) => group._id !== action.payload,
      );
    },
  },
});

export const { fetchMyGroups, addNewGroupToState, removeGroupFromState } =
  groupSlice.actions;

export const selectGroups = (state: RootState) => state.groups;

export default groupSlice.reducer;
