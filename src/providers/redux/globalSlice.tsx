
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';
import { SnackbarMessage } from '../types';

const initialSnackbarMessage: SnackbarMessage = {
  isOpen: false,
  message: '',
  severity: 'info',
};

const initialState: {
  isUpdateModalShown: boolean;
  isHelpModalOpen: boolean;
  snackbar: SnackbarMessage;
} = {
  isUpdateModalShown: false,
  isHelpModalOpen: false,
  snackbar: initialSnackbarMessage
};


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsUpdateDataModalShown: (state, action) => {
      state.isUpdateModalShown = action.payload;
    },
    toggleIsUpdateDataModalShown: (state) => {
      const prev = state.isUpdateModalShown;
      state.isUpdateModalShown = !prev;
    },
    setIsHelpModalShown: (state, action) => {
      state.isHelpModalOpen = action.payload;
    },
    toggleIshelpModalShown: (state) => {
      const prev = state.isHelpModalOpen;
      state.isHelpModalOpen = !prev;
    },
    setSnackbar: (state, action: PayloadAction<SnackbarMessage>) => {
      state.snackbar = action.payload;
    },
    resetSnackbar: (state) => {
      state.snackbar = initialSnackbarMessage;
    }
  }
});

export default globalSlice.reducer;

export const {
  setIsUpdateDataModalShown,
  toggleIsUpdateDataModalShown,
  setIsHelpModalShown,
  toggleIshelpModalShown,
  setSnackbar,
  resetSnackbar,
} = globalSlice.actions;

export const selectIsUpdateModalShown = (state: AppState) =>
  state[globalSlice.name].isUpdateModalShown;
export const selectIsHelpModalShown = (state: AppState) =>
  state[globalSlice.name].isHelpModalOpen;
export const selectSnackbar = (state: AppState) =>
  state[globalSlice.name].snackbar;