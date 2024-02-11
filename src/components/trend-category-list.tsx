import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CoinGeckoTrendDataResponse } from '../types';
import { SvgUri } from 'react-native-svg';
import { formatMoney } from '../helpers/utils';

type CategoryItemInfoProps = {
  title: string;
  value: string;
  valueColor: 'green' | 'red';
};

const categoryItemValue = ({ title, value, valueColor }: CategoryItemInfoProps): JSX.Element => {
  console.log('CategoryItemValue rendered!!!');
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[styles.text, styles.textItemInfo, styles.whiteText]}>{title}</Text>
      <Text style={[styles.text, styles.textItemInfo, valueColor == 'green' ? styles.greenText : styles.redtext]}>{value}</Text>
    </View>
  );
};

const CategoryItemVal = memo(categoryItemValue);

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

const categoryContainer = ({
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

const CategoryContainer = memo(categoryContainer);

const categoryListComponent = (categoryData: CoinGeckoTrendDataResponse['categories']) => {
  console.log('categoryListComponent Rendered!');
  console.log(`CategoryData Length: ${categoryData.length}`);
  const mapData = categoryData.map((categoryItem) => {
    const marketCapPerc24h = categoryItem.data.market_cap_change_percentage_24h.usd || 0;
    const marketCapPerc24hUsdStr = marketCapPerc24h != 0 ? `${marketCapPerc24h.toFixed(2)}%` : '-';
    const color = marketCapPerc24h > 0 ? 'green' : 'red';

    return (
      <CategoryContainer
        marketCapPerc24hUsdStr={marketCapPerc24hUsdStr}
        marketCapPercColor={color}
        name={categoryItem.name}
        coinsCount={categoryItem.coins_count}
        sparkline={categoryItem.data.sparkline}
        marketCap1hChange={categoryItem.market_cap_1h_change}
        marketCap={categoryItem.data.market_cap}
        totalVolume={categoryItem.data.total_volume}
        key={categoryItem.id}
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

export default categoryListComponent;
