import { createSlice } from '@reduxjs/toolkit';
import { CoinGeckoTrendDataResponse, CoinGeckoMarketDataItem } from '../types';

const coingeckoSlice = createSlice({
  name: 'coingecko',
  initialState: {
    top100Data: [] as CoinGeckoMarketDataItem[],
    trendsData: { categories: [], coins: [], nfts: [] } as CoinGeckoTrendDataResponse,
  },
  reducers: {
    loadTop100: (state, { payload }: { payload: CoinGeckoMarketDataItem[] }) => {
      state.top100Data = payload;
    },
    loadTrends: (state, { payload }: { payload: CoinGeckoTrendDataResponse }) => {
      state.trendsData = payload;
    },
  },
});

export const { loadTop100, loadTrends } = coingeckoSlice.actions;

export default coingeckoSlice;
