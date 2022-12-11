import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OccasionType } from '../../types/Occasion.types';
import { RootState } from '../store';

type INITIAL_STATE = {
  occasions: OccasionType[];
};

const initialState: INITIAL_STATE = {
  occasions: [],
};

export const occasionSlice = createSlice({
  name: 'occasions',
  initialState,
  reducers: {
    fetchOccasions: (
      state,
      action: PayloadAction<{ occasions: OccasionType[] }>,
    ) => {
      state.occasions = action.payload?.occasions;
    },
    addOccasion: (state, action: PayloadAction<{ occasion: OccasionType }>) => {
      // state.occasions.push(action.payload.occasion);
      console.log('STATE WTF', state);
      state.occasions = [...state.occasions, action.payload.occasion];
    },
  },
});

export const { fetchOccasions, addOccasion } = occasionSlice.actions;

export const selectOccasions = (state: RootState) => state.occasions;

export default occasionSlice.reducer;
