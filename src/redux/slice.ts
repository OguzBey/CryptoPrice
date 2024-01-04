import { createSlice } from '@reduxjs/toolkit';
import { CoinGeckoTrendDataResponse, CoinMarketsResponseItem } from '../api/coingecko';

const coingeckoSlice = createSlice({
  name: 'coingecko',
  initialState: {
    top100Data: [] as CoinMarketsResponseItem[],
    trendsData: { categories: [], coins: [], nfts: [] } as CoinGeckoTrendDataResponse,
  },
  reducers: {
    loadTop100: (state, { payload }: { payload: CoinMarketsResponseItem[] }) => {
      state.top100Data = payload;
    },
    loadTrends: (state, { payload }: { payload: CoinGeckoTrendDataResponse }) => {
      state.trendsData = payload;
    },
  },
});

export const { loadTop100, loadTrends } = coingeckoSlice.actions;

export default coingeckoSlice;
