import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState = {
  projectId: null,
  projectStage: null,
} as InitialState;

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectId(state, action) {
      state.projectId = action.payload;
    },
    clearProjectState(state) {
      state.projectId = null;
      state.projectStage = null;
    },
    setProjectStage(state, action) {
      state.projectStage = action.payload;
    },
  },
});

export const { setProjectId, clearProjectState, setProjectStage } =
  projectSlice.actions;
export default projectSlice.reducer;
