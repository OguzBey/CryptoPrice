import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { formatMoney } from '../../helpers/utils';
import CategoryItemVal from './category-item-val';

type CategoryContainerInfoProps = {
  marketCapPerc24hUsdStr: string;
  marketCapPercColor: 'green' | 'red';
  name: string;
  coinsCount: number;
  sparkline: string;
  marketCap1hChange: number;
  marketCap: number;
  totalVolume: number;
};

const CategoryContainer = ({
  marketCapPerc24hUsdStr,
  marketCapPercColor,
  name,
  coinsCount,
  sparkline,
  marketCap1hChange,
  marketCap,
  totalVolume,
}: CategoryContainerInfoProps): JSX.Element => {
  console.log('CategoryContainer rendered!');

  return (
    <View style={styles.categoryItemContainer}>
      <View style={[styles.categoryItemHeader]}>
        <Text style={[styles.textItemHeader, styles.greenText, styles.text]}>{name}</Text>
      </View>
      <View style={[styles.categoryItemBody]}>
        <View style={[styles.categoryItemValuesContainer]}>
          <View style={styles.categoryItemValuesContainerSection}>
            <CategoryItemVal value={`${coinsCount}`} title="Coins Count" valueColor="green" />
            <SvgUri uri={sparkline} width="50" />
          </View>
          <View style={styles.categoryItemValuesContainerSection}>
            <CategoryItemVal
              value={`${marketCap1hChange.toFixed(2)}%`}
              title={'MarketCap (1h)'}
              valueColor={marketCap1hChange > 0 ? 'green' : 'red'}
            />
            <CategoryItemVal value={marketCapPerc24hUsdStr} title={'MarketCap (24h)'} valueColor={marketCapPercColor} />
          </View>
          <View style={styles.categoryItemValuesContainerSection}>
            <CategoryItemVal value={`${formatMoney(marketCap)}`} title="MarketCap" valueColor="green" />
            <CategoryItemVal value={formatMoney(totalVolume)} title="Total Volume" valueColor="green" />
          </View>
        </View>
        {/* <View style={[styles.categoryItemSparkContainer]}>
            <SvgUri uri={sparkline} width="50" />
          </View> */}
      </View>
    </View>
  );
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

  //
  categoryItemContainer: {
    borderWidth: 1,
    borderTopColor: 'black',
    paddingVertical: 10,
  },
  categoryItemHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  categoryItemBody: {
    display: 'flex',
    flexDirection: 'row',
  },
  categoryItemValuesContainer: {
    flexDirection: 'column',
    flex: 3,
    justifyContent: 'center',
  },
  categoryItemValuesContainerSection: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  categoryItemSparkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(CategoryContainer);
