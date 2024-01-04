import { coinGeckoCoinsMarketsMockData, coinGeckoTrendsMockData } from '../helpers/data';
import { to } from '../helpers/utils';
import { CoinGeckoMarketDataItem, CoinGeckoTrendDataResponse } from '../types';

export const fetchCryptoData = async (limit: number, isDevMode = false) => {
  console.log('fetchCryptoData()');

  // for development
  if (isDevMode) return coinGeckoCoinsMarketsMockData;

  const url = 'https://api.coingecko.com/api/v3/coins/markets';

  let params = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: `${limit}`,
    page: '1',
    sparkline: 'false',
    price_change_percentage: '24h',
    locale: 'tr',
  };

  const reqInit: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const fullURL: string = `${url}?${new URLSearchParams(params).toString()}`;

  const fetchExec = await to(fetch(fullURL, reqInit));
  if ('error' in fetchExec) {
    console.error(fetchExec.error);
    return [];
  }

  const dataExec = await to(fetchExec.result.json());
  if ('error' in dataExec) {
    console.error(dataExec.error);
    return [];
  }

  const data = dataExec.result as CoinGeckoMarketDataItem[];

  return data;
};

export const fetchTrendData = async (isDevMode = false) => {
  console.log('fetchTrendData()');

  // for development
  if (isDevMode) return coinGeckoTrendsMockData;

  const url = 'https://api.coingecko.com/api/v3/search/trending';

  const reqInit: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const fetchExec = await to(fetch(url, reqInit));

  if ('error' in fetchExec) {
    console.error(fetchExec.error);
    return null;
  }

  const dataExec = await to(fetchExec.result.json());

  if ('error' in dataExec) {
    console.error(dataExec.error);
    return null;
  }

  const data = dataExec.result as CoinGeckoTrendDataResponse;

  return data;
};
