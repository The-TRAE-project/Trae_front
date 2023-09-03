import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState = {
  workType: null,
} as InitialState;

export const workTypeSlice = createSlice({
  name: 'workType',
  initialState,
  reducers: {
    setWorkType(state, action) {
      state.workType = action.payload;
    },
    clearWorkTypeState(state) {
      state.workType = null;
    },
  },
});

export const { setWorkType, clearWorkTypeState } = workTypeSlice.actions;
export default workTypeSlice.reducer;
