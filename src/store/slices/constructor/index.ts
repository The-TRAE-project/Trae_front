import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState = {
  constructorId: null,
} as InitialState;

export const constructorSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setConstructor(state, action) {
      state.constructorId = action.payload;
    },
    clearConstructorState(state) {
      state.constructorId = null;
    },
  },
});

export const { setConstructor, clearConstructorState } =
  constructorSlice.actions;
export default constructorSlice.reducer;
