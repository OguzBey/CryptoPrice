import React, { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CoinInfo } from './components/coin-info';
import CoinListItem from './components/coin-item';
import CoinPrice from './components/coin-price';
import { CoinMarketsResponseItem, fetchCryptoData } from './api/coingecko';
import { moneyFormatter, numberFormatter } from './helpers/utils';

type SortByTypes = 'rankDesc' | 'rankAsc' | 'priceDesc' | 'priceAsc' | 'changePercentageAsc' | 'changePercentageDesc';

function GetCoinListItems(coinInfoData: CoinMarketsResponseItem[], selectCoinFunc: Function, selectedSymbol: string): JSX.Element[] {
  let listItems = coinInfoData.map(o => {
    const formattedPrice = moneyFormatter.format(o.current_price);
    const color: 'white' | 'black' = o.symbol == selectedSymbol ? 'white' : 'black';
    return (
      <CoinListItem
        key={o.symbol}
        coinName={o.name}
        logoUri={o.image}
        price={formattedPrice}
        rank={o.market_cap_rank}
        selectFunc={selectCoinFunc}
        symbol={o.symbol}
        borderColor={color}
        priceChange24h={o.price_change_24h}
        priceChange24hPercentage={o.price_change_percentage_24h}
      />
    );
  });

  return listItems;
}

function App(): JSX.Element {
  console.log('App rendered!');
  const [coinInfoData, setCoinInfoData] = useState([] as CoinMarketsResponseItem[]);
  const [volume, setVolume] = useState('$0');
  const [totalSup, setTotalSup] = useState('-');
  const [maxSup, setMaxSup] = useState('-');
  const [marketCap, setMarketCap] = useState('$0');
  const [ath, setAth] = useState('$0');
  const [atl, setAtl] = useState('$0');
  const [change24h, setChange24h] = useState('$0');
  const [high24h, setHigh24h] = useState('$0');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [animatingVal, setAnimatingVal] = useState(true);
  const [sortBy, setSortBy] = useState('rankDesc' as SortByTypes);

  const [coinDetail, setCoinDetail] = useState({ name: '', logoUri: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', price: '-', rank: 0, symbol: '' });

  const changeData = useCallback((coin: CoinMarketsResponseItem) => {
    setVolume(moneyFormatter.format(coin.total_volume));
    setMarketCap(moneyFormatter.format(coin.market_cap));
    setTotalSup(coin.total_supply ? numberFormatter.format(coin.total_supply) : '--');
    setMaxSup(coin.max_supply ? numberFormatter.format(coin.max_supply) : '--');
    setAth(moneyFormatter.format(coin.ath));
    setAtl(moneyFormatter.format(coin.atl));
    setChange24h(moneyFormatter.format(coin.price_change_24h));
    setHigh24h(moneyFormatter.format(coin.high_24h));
    const coinCurrentPrice = coin.current_price > 1 ? Number(coin.current_price.toFixed(2)) : coin.current_price;
    setCoinDetail({ name: coin.name, logoUri: coin.image, price: moneyFormatter.format(coinCurrentPrice), rank: coin.market_cap_rank, symbol: coin.symbol });
    setSelectedSymbol(coin.symbol);
  }, []);

  const selectCoin = useCallback(
    (symbol: string) => {
      let coin = coinInfoData.find(o => o.symbol == symbol)!;
      changeData(coin);
    },
    [coinInfoData],
  );

  const changeSort = useCallback(
    (selectedArrow: 'rank' | 'price' | 'percentageChange', currentSortBy: SortByTypes) => {
      if (selectedArrow == 'rank' && currentSortBy != 'rankAsc') {
        setSortBy('rankAsc');
        coinInfoData.sort((firstVal, secVal) => {
          if (firstVal.market_cap_rank > secVal.market_cap_rank) return -1;
          else if (firstVal.market_cap_rank < secVal.market_cap_rank) return 1;
          else return 0;
        });
      } else if (selectedArrow == 'rank' && currentSortBy != 'rankDesc') {
        setSortBy('rankDesc');
        coinInfoData.sort((firstVal, secVal) => {
          if (firstVal.market_cap_rank > secVal.market_cap_rank) return 1;
          else if (firstVal.market_cap_rank < secVal.market_cap_rank) return -1;
          else return 0;
        });
      } else if (selectedArrow == 'price' && currentSortBy != 'priceAsc') {
        setSortBy('priceAsc');
        coinInfoData.sort((firstVal, secVal) => {
          if (firstVal.current_price > secVal.current_price) return 1;
          else if (firstVal.current_price < secVal.current_price) return -1;
          else return 0;
        });
      } else if (selectedArrow == 'price' && currentSortBy != 'priceDesc') {
        setSortBy('priceDesc');
        coinInfoData.sort((firstVal, secVal) => {
          if (firstVal.current_price > secVal.current_price) return -1;
          else if (firstVal.current_price < secVal.current_price) return 1;
          else return 0;
        });
      } else if (selectedArrow == 'percentageChange' && currentSortBy != 'changePercentageAsc') {
        setSortBy('changePercentageAsc');
        coinInfoData.sort((firstVal, secVal) => {
          if (firstVal.price_change_percentage_24h > secVal.price_change_percentage_24h) return 1;
          else if (firstVal.price_change_percentage_24h < secVal.price_change_percentage_24h) return -1;
          else return 0;
        });
      } else if (selectedArrow == 'percentageChange' && currentSortBy != 'changePercentageDesc') {
        setSortBy('changePercentageDesc');
        coinInfoData.sort((firstVal, secVal) => {
          if (firstVal.price_change_percentage_24h > secVal.price_change_percentage_24h) return -1;
          else if (firstVal.price_change_percentage_24h < secVal.price_change_percentage_24h) return 1;
          else return 0;
        });
      }
    },
    [coinInfoData],
  );

  useEffect(() => {
    const fetchDataProcess = async () => {
      console.log('Data Fetched()');
      const data = await fetchCryptoData(100);

      // const data = [
      //   {
      //     ath: 69045,
      //     ath_change_percentage: -47.17604,
      //     ath_date: '2021-11-10T14:24:11.849Z',
      //     atl: 67.81,
      //     atl_change_percentage: 53686.63565,
      //     atl_date: '2013-07-06T00:00:00.000Z',
      //     circulating_supply: 19549856,
      //     current_price: 36481,
      //     fully_diluted_valuation: 765811934680,
      //     high_24h: 37410,
      //     id: 'bitcoin',
      //     image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      //     last_updated: '2023-11-22T16:34:06.614Z',
      //     low_24h: 35788,
      //     market_cap: 712929192670,
      //     market_cap_change_24h: -9327985672.73877,
      //     market_cap_change_percentage_24h: -1.2915,
      //     market_cap_rank: 1,
      //     max_supply: 21000000,
      //     name: 'Bitcoin',
      //     price_change_24h: -420.66899453338556,
      //     price_change_percentage_24h: -1.13998,
      //     price_change_percentage_24h_in_currency: -1.1399828786308033,
      //     roi: null,
      //     symbol: 'btc',
      //     total_supply: 21000000,
      //     total_volume: 23232690758,
      //   },
      //   {
      //     ath: 4878.26,
      //     ath_change_percentage: -58.13213,
      //     ath_date: '2021-11-10T14:24:19.604Z',
      //     atl: 0.432979,
      //     atl_change_percentage: 471614.4701,
      //     atl_date: '2015-10-20T00:00:00.000Z',
      //     circulating_supply: 120249014.661258,
      //     current_price: 2040.17,
      //     fully_diluted_valuation: 245108550824,
      //     high_24h: 2049.4,
      //     id: 'ethereum',
      //     image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      //     last_updated: '2023-11-22T16:34:16.070Z',
      //     low_24h: 1940.08,
      //     market_cap: 245108550824,
      //     market_cap_change_24h: 5330015893,
      //     market_cap_change_percentage_24h: 2.22289,
      //     market_cap_rank: 2,
      //     max_supply: null,
      //     name: 'Ethereum',
      //     price_change_24h: 54.03,
      //     price_change_percentage_24h: 2.72047,
      //     price_change_percentage_24h_in_currency: 2.720465266988783,
      //     roi: { currency: 'btc', percentage: 7378.726604691019, times: 73.78726604691019 },
      //     symbol: 'eth',
      //     total_supply: 120249014.661258,
      //     total_volume: 25883988805,
      //   },
      // ];
      // const data = [];

      if (data.length > 0) {
        setCoinInfoData(data);
        setAnimatingVal(false);
        const selectedCoin = data.sort((a, b) => {
          if (a.market_cap_rank > b.market_cap_rank) {
            return 1;
          } else if (a.market_cap_rank < b.market_cap_rank) {
            return -1;
          }
          return 0;
        })[0];
        changeData(selectedCoin);
      } else {
        Alert.alert('Error..', 'Api rate-limit. Please try again later.');
      }
    };

    fetchDataProcess();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.coinInfoTopContainer}>
          <View style={{ ...styles.coinInfoTop, marginTop: 40 }}>
            <CoinInfo infoName="Volume" value={volume} customCss={{}} />
            <CoinInfo infoName="Market Cap" value={marketCap} customCss={{}} />
          </View>
          <View style={{ ...styles.coinInfoTop, marginBottom: 10 }}>
            <CoinInfo infoName="Max Supply" value={maxSup} customCss={{}} />
            <CoinInfo infoName="Total Supply" value={totalSup} customCss={{}} />
          </View>
        </View>

        <View style={styles.coinInfoBottomContainer}>
          <View style={styles.coinPriceSideContainer}>
            <CoinInfo infoName="ATH" value={ath} customCss={{ marginTop: 20, marginBottom: 10 }} />
            <CoinInfo infoName="ATL" value={atl} customCss={{ marginBottom: 40 }} />
          </View>
          <View>
            <CoinPrice name={coinDetail.name} price={coinDetail.price} logoUri={coinDetail.logoUri} rank={coinDetail.rank} key={coinDetail.symbol} />
          </View>
          <View style={styles.coinPriceSideContainer}>
            <CoinInfo infoName="Change (24h)" value={change24h} customCss={{ marginTop: 20, marginBottom: 10 }} />
            <CoinInfo infoName="High (24h)" value={high24h} customCss={{ marginBottom: 40 }} />
          </View>
        </View>
      </View>

      {animatingVal == true ? (
        <View style={[styles.containerBottom, { alignItems: 'center', justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color={'#4CAF50'} style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />
        </View>
      ) : (
        <View style={styles.containerBottom}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
            <TouchableOpacity style={styles.sortByItemContainer} onPress={() => changeSort('rank', sortBy)}>
              <Text style={styles.sortByText}>Rank</Text>
              <Image
                source={sortBy == 'rankAsc' ? require('./assets/arrow-up.png') : sortBy == 'rankDesc' ? require('./assets/arrow-down.png') : require('./assets/line.png')}
                style={styles.sortByImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sortByItemContainer, { marginLeft: 15, justifyContent: 'flex-end' }]} onPress={() => changeSort('price', sortBy)}>
              <Text style={styles.sortByText}>Price</Text>
              <Image
                source={sortBy == 'priceAsc' ? require('./assets/arrow-up.png') : sortBy == 'priceDesc' ? require('./assets/arrow-down.png') : require('./assets/line.png')}
                style={styles.sortByImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sortByItemContainer, { justifyContent: 'flex-end' }]} onPress={() => changeSort('percentageChange', sortBy)}>
              <Text style={styles.sortByText}>Change</Text>
              <Image
                source={sortBy == 'changePercentageAsc' ? require('./assets/arrow-up.png') : sortBy == 'changePercentageDesc' ? require('./assets/arrow-down.png') : require('./assets/line.png')}
                style={styles.sortByImage}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>{GetCoinListItems(coinInfoData, selectCoin, selectedSymbol)}</ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    flex: 1,
    backgroundColor: 'black',
  },

  coinInfoTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  coinInfoTopContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  coinInfoBottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  containerBottom: {
    flex: 1,
    backgroundColor: '#455A64',
  },
  coinPriceSideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  sortByItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    color: 'white',
    marginRight: 5,
    fontSize: 12,
    fontFamily: 'RobotoMono-Medium',
  },
  sortByImage: {
    height: 16,
    width: 16,
  },
});

export default memo(App);
