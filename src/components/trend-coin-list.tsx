import { memo } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { CoinGeckoTrendDataResponse } from '../types';

import { fixedString } from '../helpers/utils';

type TrendCoinListItemProps = {
  coinId: number;
  imageSource: string;
  name: string;
  symbol: string;
  priceChange24h: number;
  price: string;
};

const trendCoinListItem = ({ imageSource, name, symbol, priceChange24h, price }: TrendCoinListItemProps) => {
  console.log('trendCoinListItem Rendered!!!!');
  return (
    <View style={styles.coinItemContainer}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: imageSource }} style={{ width: 24, height: 24 }} />
      </View>
      <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.text, styles.whiteText, styles.textItemMini]}>{fixedString(name, 12)}</Text>
        <Text style={[styles.text, styles.whiteText, styles.textItemMini]}>(${symbol})</Text>
      </View>
      <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[styles.text, styles.textItemInfo, priceChange24h > 0 ? styles.greenText : styles.redtext]}>
          {priceChange24h != 0 ? priceChange24h.toFixed(2) : '-'}%
        </Text>
        <Text style={[styles.text, styles.greenText, styles.textItemInfo]}>{price}</Text>
      </View>
    </View>
  );
};

const TrendCoinListItem = memo(trendCoinListItem);

const coinListComponent = (coinData: CoinGeckoTrendDataResponse['coins']): JSX.Element[] => {
  console.log('coinListComponent Rendered!');
  console.log(`coinsData Length ${coinData.length}`);
  const mapData = coinData.map((coinItem) => {
    const coinPriceChange24hUsd = coinItem.item.data.price_change_percentage_24h.usd || 0;
    const coinId = coinItem.item.coin_id;
    const imageSource = coinItem.item.large;
    const name = coinItem.item.name;
    const symbol = coinItem.item.symbol;
    const price = coinItem.item.data.price;

    return (
      <TrendCoinListItem
        coinId={coinId}
        imageSource={imageSource}
        name={name}
        price={price}
        priceChange24h={coinPriceChange24hUsd}
        symbol={symbol}
        key={coinId}
      />
    );
  });

  return mapData;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RobotoMono-Medium',
  },
  textHeader: {
    fontSize: 20,
  },
  textItemHeader: {
    fontSize: 16,
  },
  textItemHeader2: {
    fontSize: 14,
  },
  textItemInfo: {
    fontSize: 12,
  },
  textItemMini: {
    fontSize: 10,
  },
  whiteText: {
    color: 'white',
  },
  greenText: {
    color: '#4CAF50',
  },
  redtext: {
    color: '#F44336',
  },
  coinItemContainer: {
    display: 'flex',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default coinListComponent;
