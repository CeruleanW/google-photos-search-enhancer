
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import produce from 'immer';
import { AppState } from './store';
import {LocalUrls} from '@/features/media-items';

const initialState: {
  displayedPhotos: LocalUrls[]
} = {
  displayedPhotos: [],
};


export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setDisplayedPhotos(state, action: PayloadAction<any>) {
      state.displayedPhotos = action.payload;
    },
    resetDisplayedPhotos(state) {
      state.displayedPhotos = [];
    }
  }
});

export default photosSlice.reducer;

export const {
  setDisplayedPhotos,
  resetDisplayedPhotos,
} = photosSlice.actions;

export const selectDisplayedPhotos = (state: AppState) =>
  state[photosSlice.name].displayedPhotos;
export const selectProductUrls = (state: AppState) => state[photosSlice.name].displayedPhotos.map(photo => photo?.productUrl);
export const selectBaseUrls = (state: AppState) => state[photosSlice.name].displayedPhotos.map(photo => photo?.baseUrl);