export type CoinGeckoPriceObject = {
  btc: number;
  eth: number;
  ltc: number;
  bch: number;
  bnb: number;
  eos: number;
  xrp: number;
  xlm: number;
  link: number;
  dot: number;
  yfi: number;
  usd: number;
  aed: number;
  ars: number;
  aud: number;
  bdt: number;
  bhd: number;
  bmd: number;
  brl: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  eur: number;
  gbp: number;
  gel: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  vef: number;
  vnd: number;
  zar: number;
  xdr: number;
  xag: number;
  xau: number;
  bits: number;
  sats: number;
};

export type CoinGeckoMarketDataItem = {
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
  last_updated: string;
  low_24h: number;
  price_change_percentage_24h_in_currency: number;
  roi: { currency: string; percentage: number; times: number } | null;
};

export type CoinGeckoTrendCoinItem = {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: string;
      price_btc: string;
      price_change_percentage_24h: CoinGeckoPriceObject;
      market_cap: string;
      market_cap_btc: string;
      total_volume: string;
      total_volume_btc: string;
      sparkline: string;
      content: null | { title: string; description: string };
    };
  };
};

export type CoinGeckoTrendNFTItem = {
  id: string;
  symbol: string;
  name: string;
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
  data: {
    floor_price: string;
    floor_price_in_usd_24h_percentage_change: string;
    h24_volume: string;
    h24_average_sale_price: string;
    sparkline: string;
    content: null | { title: string; description: string };
  };
};

export type CoinGeckoTrendCategoryItem = {
  id: number;
  name: string;
  market_cap_1h_change: number;
  slug: string;
  data: {
    market_cap: number;
    market_cap_btc: number;
    total_volume: number;
    total_volume_btc: number;
    market_cap_change_percentage_24h: CoinGeckoPriceObject;
    sparkline: string;
  };
};

export type CoinGeckoTrendDataResponse = {
  coins: CoinGeckoTrendCoinItem[];
  nfts: CoinGeckoTrendNFTItem[];
  categories: CoinGeckoTrendCategoryItem[];
};

export type CoinGeckoGlobalDataResponse = {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: CoinGeckoPriceObject;
    total_volume: CoinGeckoPriceObject;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
};
