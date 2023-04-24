import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState = {
  projectId: 1,
} as InitialState;

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action) {
      state.projectId = action.payload;
    },
    clearProjectState(state) {
      state.projectId = null;
    },
  },
});

export const { setProject, clearProjectState } = projectSlice.actions;
export default projectSlice.reducer;
