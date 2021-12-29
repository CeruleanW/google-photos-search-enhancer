import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import {Action, combineReducers, Reducer} from 'redux';
import thunk from 'redux-thunk';

//self-defined dependencies
import photosReducer, {photosSlice} from './photosSlice';

const baseReducers:Reducer = combineReducers({
  //all reducers should be put here
  [photosSlice.name]: photosReducer,
});

const reducers = baseReducers;

const makeStore = () =>
  configureStore({
    reducer: reducers,
    devTools: true,
    middleware: [thunk],
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;



// export an assembled wrapper
const store = makeStore();
export default store;
