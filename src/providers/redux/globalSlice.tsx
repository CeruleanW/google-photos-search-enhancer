
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';

const initialState = {};


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
  }
});

export default globalSlice.reducer;

export const {

} = globalSlice.actions;

export const selectDisplayedPhotos = (state: AppState) =>
  state[globalSlice.name].displayedPhotos;