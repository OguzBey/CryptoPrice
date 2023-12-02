import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CoinInfoProps = {
  infoName: string;
  value: string;
  customCss: Record<string, any>;
};

const CoinInfo = (props: CoinInfoProps) => {
  return (
    <View style={{ ...styles.container, ...props.customCss }}>
      <Text style={styles.coinInfoHeader}>{props.infoName}</Text>
      <Text style={styles.coinInfoValue}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinInfoHeader: {
    fontSize: 14,
    color: '#4CAF50',
    fontFamily: 'RobotoMono-Medium',
    marginBottom: 2,
  },

  coinInfoValue: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'RobotoMono-Medium',
  },
});

export { CoinInfo };
