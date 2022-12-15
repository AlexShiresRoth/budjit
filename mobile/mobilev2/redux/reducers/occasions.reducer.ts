import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OccasionType } from '../../types/Occasion.types';
import { RootState } from '../store';

//@TODO add transactions to occasion type
type INITIAL_STATE = {
  occasions: OccasionType[];
  occasionRefreshTriggers: string[];
  currentOccasion: OccasionType | null;
};

const initialState: INITIAL_STATE = {
  occasions: [],
  occasionRefreshTriggers: [],
  currentOccasion: null,
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
      state.occasions = [...state.occasions, action.payload.occasion];
    },
    setCurrentOccasion: (
      state,
      action: PayloadAction<{ occasion: OccasionType }>,
    ) => {
      state.currentOccasion = action.payload.occasion;
    },
    OCCASION_addRefreshTrigger: (
      state,
      action: PayloadAction<{ trigger: string }>,
    ) => {
      state.occasionRefreshTriggers = [
        ...state.occasionRefreshTriggers,
        action.payload.trigger,
      ];
    },
  },
});

export const {
  fetchOccasions,
  addOccasion,
  OCCASION_addRefreshTrigger,
  setCurrentOccasion,
} = occasionSlice.actions;

export const selectOccasions = (state: RootState) => state.occasions;

export default occasionSlice.reducer;
