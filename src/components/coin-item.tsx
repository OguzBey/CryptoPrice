import React, { memo, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fixedString, formatMoney } from '../helpers/utils';
import { CoinGeckoMarketDataItem } from '../types';

type CoinListItemProps = {
  coinName: string;
  symbol: string;
  price: string;
  logoUri: any;
  selectFunc: Function;
  rank: number;
  borderColor: 'white' | 'black';
  priceChange24hPercentage: number;
  priceChange24h: number;
};

const CoinListItem = ({
  coinName,
  logoUri,
  price,
  rank,
  selectFunc,
  symbol,
  borderColor,
  priceChange24h,
  priceChange24hPercentage,
}: CoinListItemProps) => {
  console.log('CoinListItem rendered!', coinName);

  const textStylePercentage = priceChange24h && priceChange24h > 0 ? styles.textGreen : styles.textRed;

  return (
    <TouchableOpacity
      style={[styles.container, borderColor == 'white' ? styles.selectedContainer : styles.deSelectedContainer]}
      onPress={() => {
        selectFunc(symbol);
      }}
    >
      <View style={[styles.itemInfoGroup, { justifyContent: 'flex-start', flex: 2 }]}>
        <Text style={[styles.textStyle, styles.textWhite, { marginLeft: 5 }]}>{rank}</Text>
        <Image source={{ uri: logoUri }} style={[styles.coinLogo, { marginLeft: 5 }]} />
        <Text style={[styles.textStyle, styles.textWhite, { marginLeft: 10 }]}>{fixedString(coinName)}</Text>
      </View>

      <View style={[styles.itemInfoGroup]}>
        <Text style={[styles.textStyle, styles.textWhite]}>{price}</Text>
      </View>

      <View style={[styles.itemInfoGroup, { justifyContent: 'flex-end' }]}>
        <Text style={[styles.textStyle, textStylePercentage, { marginRight: 10 }]}>{priceChange24hPercentage.toFixed(2)}%</Text>
      </View>
    </TouchableOpacity>
  );
};

const MCoinListItem = memo(CoinListItem);

function GetCoinListItems(coinInfoData: CoinGeckoMarketDataItem[], selectCoinFunc: Function, selectedSymbol: string) {
  console.log('GetCoinListItems()');

  let listItems = coinInfoData.map((o) => {
    const formattedPrice = formatMoney(o.current_price);
    const color: 'white' | 'black' = o.symbol == selectedSymbol ? 'white' : 'black';
    return (
      <MCoinListItem
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderColor: 'black',
    borderWidth: 1,
  },

  itemInfoGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  coinLogo: {
    width: 32,
    height: 32,
  },

  textStyle: {
    fontSize: 12,
    fontFamily: 'RobotoMono-Medium',
  },

  textWhite: {
    color: 'white',
  },

  textGreen: {
    color: '#4CAF50',
  },

  textGreenSoft: {
    color: '#81C784',
  },

  textRed: {
    color: '#F44336',
  },

  textRedSoft: {
    color: '#EF9A9A',
  },

  selectedContainer: {
    borderColor: 'white',
    borderWidth: 2,
  },

  deSelectedContainer: {
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default GetCoinListItems;
