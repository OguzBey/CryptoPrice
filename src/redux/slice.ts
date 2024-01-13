import { createSlice } from '@reduxjs/toolkit';
import { CoinGeckoTrendDataResponse, CoinGeckoMarketDataItem, CoinGeckoGlobalDataResponse } from '../types';

const coingeckoSlice = createSlice({
  name: 'coingecko',
  initialState: {
    top100Data: [] as CoinGeckoMarketDataItem[],
    trendsData: { categories: [], coins: [], nfts: [] } as CoinGeckoTrendDataResponse,
    globalData: null as CoinGeckoGlobalDataResponse | null,
  },
  reducers: {
    loadTop100: (state, { payload }: { payload: CoinGeckoMarketDataItem[] }) => {
      state.top100Data = payload;
    },
    loadTrends: (state, { payload }: { payload: CoinGeckoTrendDataResponse }) => {
      state.trendsData = payload;
    },

    loadGlobal: (state, { payload }: { payload: CoinGeckoGlobalDataResponse }) => {
      state.globalData = payload;
    },
  },
});

export const { loadTop100, loadTrends, loadGlobal } = coingeckoSlice.actions;

export default coingeckoSlice;
