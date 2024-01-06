import { CoinGeckoMarketDataItem } from '../types';
import { formatMoney, formatNumberWithGroup, numberFormatter } from '../helpers/utils';
import CoinInfo from '../components/coin-info';
import GetCoinListItems from '../components/coin-item';
import CoinPrice from '../components/coin-price';
import { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

type SortByTypes = 'rankDesc' | 'rankAsc' | 'priceDesc' | 'priceAsc' | 'changePercentageAsc' | 'changePercentageDesc';

type HomeScreenProps = NativeStackScreenProps<ParamListBase, 'Home'>;

const Home: React.FC<HomeScreenProps> = () => {
  console.log('Home screen rendered!');

  const [coinInfoData, setCoinInfoData] = useState<CoinGeckoMarketDataItem[]>([]);
  const [coinInfoDataOneTime, setCoinInfoDataOneTime] = useState<CoinGeckoMarketDataItem[]>([]);
  const [volume, setVolume] = useState('$0');
  const [totalSup, setTotalSup] = useState('-');
  const [maxSup, setMaxSup] = useState('-');
  const [circulatingSup, setCirculatingSup] = useState('-');
  const [marketCap, setMarketCap] = useState('$0');
  const [fullyDilutedValuation, setFullyDilutedValuation] = useState('$0');
  const [ath, setAth] = useState('$0');
  const [atl, setAtl] = useState('$0');
  const [change24h, setChange24h] = useState('$0');
  const [high24h, setHigh24h] = useState('$0');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [animatingVal, setAnimatingVal] = useState(true);
  const [sortBy, setSortBy] = useState<SortByTypes>('rankDesc');
  const [coinDetail, setCoinDetail] = useState({
    name: '',
    logoUri: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    price: '-',
    rank: 0,
    symbol: '',
  });

  const top100Data = useSelector((state: RootState) => state.top100Data);

  const changeCoinInfoData = (coin: CoinGeckoMarketDataItem) => {
    setSelectedSymbol(coin.symbol);
    setVolume(formatMoney(coin.total_volume));
    setMarketCap(formatMoney(coin.market_cap));
    setFullyDilutedValuation(formatMoney(coin.fully_diluted_valuation));
    setTotalSup(coin.total_supply ? numberFormatter.format(coin.total_supply) : '--');
    setMaxSup(coin.max_supply ? formatNumberWithGroup(coin.max_supply) : '--');
    setCirculatingSup(coin.circulating_supply ? numberFormatter.format(coin.circulating_supply) : '--');
    setAth(formatMoney(coin.ath));
    setAtl(formatMoney(coin.atl));
    setChange24h(formatMoney(coin.price_change_24h));
    setHigh24h(formatMoney(coin.high_24h));
    const coinCurrentPrice = coin.current_price > 1 ? Number(coin.current_price.toFixed(2)) : coin.current_price;

    setCoinDetail({
      name: coin.name,
      logoUri: coin.image,
      price: formatMoney(coinCurrentPrice),
      rank: coin.market_cap_rank,
      symbol: coin.symbol,
    });
  };

  const changeSort = useCallback(
    (selectedArrow: 'rank' | 'price' | 'percentageChange', currentSortBy: SortByTypes) => {
      const currentData = [...coinInfoData];
      if (selectedArrow == 'rank' && currentSortBy != 'rankAsc') {
        setSortBy('rankAsc');
        currentData.sort((firstVal, secVal) => {
          if (firstVal.market_cap_rank > secVal.market_cap_rank) return -1;
          else if (firstVal.market_cap_rank < secVal.market_cap_rank) return 1;
          else return 0;
        });
      } else if (selectedArrow == 'rank' && currentSortBy != 'rankDesc') {
        setSortBy('rankDesc');
        currentData.sort((firstVal, secVal) => {
          if (firstVal.market_cap_rank > secVal.market_cap_rank) return 1;
          else if (firstVal.market_cap_rank < secVal.market_cap_rank) return -1;
          else return 0;
        });
      } else if (selectedArrow == 'price' && currentSortBy != 'priceAsc') {
        setSortBy('priceAsc');
        currentData.sort((firstVal, secVal) => {
          if (firstVal.current_price > secVal.current_price) return 1;
          else if (firstVal.current_price < secVal.current_price) return -1;
          else return 0;
        });
      } else if (selectedArrow == 'price' && currentSortBy != 'priceDesc') {
        setSortBy('priceDesc');
        currentData.sort((firstVal, secVal) => {
          if (firstVal.current_price > secVal.current_price) return -1;
          else if (firstVal.current_price < secVal.current_price) return 1;
          else return 0;
        });
      } else if (selectedArrow == 'percentageChange' && currentSortBy != 'changePercentageAsc') {
        setSortBy('changePercentageAsc');
        currentData.sort((firstVal, secVal) => {
          if (firstVal.price_change_percentage_24h > secVal.price_change_percentage_24h) return 1;
          else if (firstVal.price_change_percentage_24h < secVal.price_change_percentage_24h) return -1;
          else return 0;
        });
      } else if (selectedArrow == 'percentageChange' && currentSortBy != 'changePercentageDesc') {
        setSortBy('changePercentageDesc');
        currentData.sort((firstVal, secVal) => {
          if (firstVal.price_change_percentage_24h > secVal.price_change_percentage_24h) return -1;
          else if (firstVal.price_change_percentage_24h < secVal.price_change_percentage_24h) return 1;
          else return 0;
        });
      }
      setCoinInfoData(currentData);
    },
    [coinInfoDataOneTime]
  );

  const changeSelectCoin = useCallback(
    (symbol: string) => {
      const coin = coinInfoData.find((o) => o.symbol == symbol)!;
      changeCoinInfoData(coin);
    },
    [coinInfoDataOneTime]
  );

  useEffect(() => {
    console.log('HomeSCreen UseEffect(top100Data)');
    if (top100Data.length > 0) {
      setAnimatingVal(false);
      setCoinInfoData(top100Data);
      setCoinInfoDataOneTime(top100Data);
      setSortBy('rankDesc');
      const sCoin = top100Data.slice().sort((a, b) => {
        if (a.market_cap_rank > b.market_cap_rank) {
          return 1;
        } else if (a.market_cap_rank < b.market_cap_rank) {
          return -1;
        }
        return 0;
      })[0];

      changeCoinInfoData(sCoin);
    }
  }, [top100Data]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.coinInfoTopContainer}>
          <View style={{ ...styles.coinInfoTop, marginTop: 40 }}>
            <CoinInfo infoName="Volume" value={volume} customCss={{}} />
            <CoinInfo infoName="Market Cap" value={marketCap} customCss={{}} />
            <CoinInfo infoName="Fully Dil. Val." value={fullyDilutedValuation} customCss={{}} />
          </View>
          <View style={{ ...styles.coinInfoTop, marginBottom: 10 }}>
            {!maxSup.includes('-') && <CoinInfo infoName="Max" value={maxSup} customCss={{}} />}
            {!totalSup.includes('-') && <CoinInfo infoName="Total" value={totalSup} customCss={{}} />}
            {!circulatingSup.includes('-') && <CoinInfo infoName="Circulating" value={circulatingSup} customCss={{}} />}
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
                source={
                  sortBy == 'rankAsc'
                    ? require('../assets/arrow-up.png')
                    : sortBy == 'rankDesc'
                    ? require('../assets/arrow-down.png')
                    : require('../assets/line.png')
                }
                style={styles.sortByImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortByItemContainer, { marginLeft: 15, justifyContent: 'flex-end' }]}
              onPress={() => changeSort('price', sortBy)}
            >
              <Text style={styles.sortByText}>Price</Text>
              <Image
                source={
                  sortBy == 'priceAsc'
                    ? require('../assets/arrow-up.png')
                    : sortBy == 'priceDesc'
                    ? require('../assets/arrow-down.png')
                    : require('../assets/line.png')
                }
                style={styles.sortByImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortByItemContainer, { justifyContent: 'flex-end' }]}
              onPress={() => changeSort('percentageChange', sortBy)}
            >
              <Text style={styles.sortByText}>Change</Text>
              <Image
                source={
                  sortBy == 'changePercentageAsc'
                    ? require('../assets/arrow-up.png')
                    : sortBy == 'changePercentageDesc'
                    ? require('../assets/arrow-down.png')
                    : require('../assets/line.png')
                }
                style={styles.sortByImage}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>{GetCoinListItems(coinInfoData, changeSelectCoin, selectedSymbol)}</ScrollView>
        </View>
      )}
    </View>
  );
};

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

export default memo(Home);
