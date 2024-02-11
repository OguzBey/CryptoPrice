import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AnimatedNumber from './animated-number';

type CoinPriceProps = {
  name: string;
  logoUri: string;
  price: string;
  rank: number;
};

const CoinPrice = ({ name, logoUri, price, rank }: CoinPriceProps) => {
  console.log('CoinPrice rendered!');

  return (
    <View style={styles.container}>
      <Image source={{ uri: logoUri }} style={styles.coinLogo} />
      <Text style={styles.coinPriceHeader}>
        {name} (#{rank})
      </Text>
      <AnimatedNumber customCss={styles.coinPriceValue} value={price} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  coinLogo: {
    marginBottom: 5,
    width: 80,
    height: 80,
  },

  coinPriceHeader: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'RobotoMono-Thin',
  },

  coinPriceValue: {
    fontSize: 24,
    color: '#4CAF50',
    fontFamily: 'RobotoMono-Thin',
    marginTop: 5,
  },

  backgroundImageContainer: {
    height: 200,
    width: 200,
    marginTop: 20,
  },
});

export default memo(CoinPrice);
