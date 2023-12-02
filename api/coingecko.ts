import { to } from '../helpers/utils';

export type CoinMarketsResponseItem = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply?: number | null;
  total_supply?: number | null;
  max_supply?: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
};

export const fetchCryptoData = async (limit: number) => {
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
  const data = dataExec.result as CoinMarketsResponseItem[];

  return data;
};
