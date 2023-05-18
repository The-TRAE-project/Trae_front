import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState = {
  projectStage: null,
} as InitialState;

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearProjectState(state) {
      state.projectStage = null;
    },
    setProjectStage(state, action) {
      state.projectStage = action.payload;
    },
  },
});

export const { clearProjectState, setProjectStage } = projectSlice.actions;
export default projectSlice.reducer;
