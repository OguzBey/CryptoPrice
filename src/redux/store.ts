import { configureStore } from '@reduxjs/toolkit';
import coingeckoSlice from './slice';

const store = configureStore({
  reducer: coingeckoSlice.reducer,
});

store.subscribe(() => console.log('Dispatch!'));

export type RootState = ReturnType<typeof store.getState>;

export default store;
