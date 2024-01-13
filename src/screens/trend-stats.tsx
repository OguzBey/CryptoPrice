import { memo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CoinGeckoTrendDataResponse } from '../types';
import { SvgUri } from 'react-native-svg';
import { fixedString, formatMoney } from '../helpers/utils';
import { PieChart } from 'react-native-chart-kit';
import randomcolor from 'randomcolor';

type TrendStatsProps = NativeStackScreenProps<ParamListBase, 'TrendStats'>;

type CategoryItemInfoProps = {
  title: string;
  value: string;
  valueColor: 'green' | 'red';
};
const CategoryItemValue = ({ title, value, valueColor }: CategoryItemInfoProps): JSX.Element => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[styles.text, styles.textItemInfo, styles.whiteText]}>{title}</Text>
      <Text style={[styles.text, styles.textItemInfo, valueColor == 'green' ? styles.greenText : styles.redtext]}>{value}</Text>
    </View>
  );
};

const categoryListComponent = (categoryData: CoinGeckoTrendDataResponse['categories']): JSX.Element[] => {
  console.log('categoryListComponent Rendered!');
  const mapData = categoryData.map((categoryItem) => {
    return (
      <View style={styles.categoryItemContainer} key={categoryItem.id}>
        <View style={[styles.categoryItemHeader]}>
          <Text style={[styles.textItemHeader, styles.greenText, styles.text]}>{categoryItem.name}</Text>
        </View>
        <View style={[styles.categoryItemBody]}>
          <View style={[styles.categoryItemValuesContainer]}>
            <View style={styles.categoryItemValuesContainerSection}>
              <CategoryItemValue
                value={`${categoryItem.market_cap_1h_change.toFixed(2)}%`}
                title={'MarketCap (1h)'}
                valueColor={categoryItem.market_cap_1h_change > 0 ? 'green' : 'red'}
              />
              <CategoryItemValue
                value={`${categoryItem.data.market_cap_change_percentage_24h.usd.toFixed(2)}%`}
                title={'MarketCap (24h)'}
                valueColor={categoryItem.data.market_cap_change_percentage_24h.usd > 0 ? 'green' : 'red'}
              />
            </View>
            {/* <View style={styles.categoryItemValuesContainerSection}>
              <CategoryItemValue value={`${formatMoney(categoryItem.data.market_cap)}`} title="MarketCap" valueColor="green" />
              <CategoryItemValue value={formatMoney(categoryItem.data.total_volume)} title="Total Volume" valueColor="green" />
            </View> */}
          </View>
          <View style={[styles.categoryItemSparkContainer]}>
            <SvgUri uri={categoryItem.data.sparkline} width="50" />
          </View>
        </View>
      </View>
    );
  });

  return mapData;
};

const coinListComponent = (coinData: CoinGeckoTrendDataResponse['coins']): JSX.Element[] => {
  const mapData = coinData.map((coinItem) => {
    return (
      <View style={styles.coinItemContainer} key={coinItem.item.coin_id}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: coinItem.item.large }} style={{ width: 24, height: 24 }} />
        </View>
        <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.text, styles.whiteText, styles.textItemMini]}>{fixedString(coinItem.item.name, 12)}</Text>
          <Text style={[styles.text, styles.whiteText, styles.textItemMini]}>(${coinItem.item.symbol})</Text>
        </View>
        <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text
            style={[styles.text, styles.textItemInfo, coinItem.item.data.price_change_percentage_24h.usd > 0 ? styles.greenText : styles.redtext]}
          >
            {coinItem.item.data.price_change_percentage_24h.usd.toFixed(2)}%
          </Text>
          <Text style={[styles.text, styles.greenText, styles.textItemInfo]}>{coinItem.item.data.price}</Text>
        </View>
      </View>
    );
  });

  return mapData;
};

const TrendStats: React.FC<TrendStatsProps> = () => {
  const globalData = useSelector((state: RootState) => state.globalData);
  const trendsData = useSelector((state: RootState) => state.trendsData);
  const categoryData = [...trendsData.categories];
  const screenWidth = Dimensions.get('window').width;

  const colors: string[] = ['#4CAF50', '#2196F3', '#FFEB3B', '#F44336', '#9C27B0', '#795548', '#FF9800', '#9E9E9E', '#3F51B5', '#607D8B'];
  const legendFontColor = '#FFFFFF';
  const legendFontSize = 14;

  let pieChartData: { name: string; percentage: number; color: string; legendFontColor: string; legendFontSize: number }[] = [];
  if (globalData) {
    let colorCount = 0;
    for (const coinKey of Object.keys(globalData.data.market_cap_percentage)) {
      const percentage = globalData.data.market_cap_percentage[coinKey];
      const color = colors[colorCount] || randomcolor();
      colorCount += 1;
      pieChartData.push({ name: coinKey.toUpperCase(), percentage, color, legendFontSize, legendFontColor });
    }
  }

  // sort categories
  categoryData.sort((pItem, nItem) => {
    const pItemData = Math.abs(pItem.data.market_cap_change_percentage_24h.usd);
    const nItemData = Math.abs(nItem.data.market_cap_change_percentage_24h.usd);
    if (pItemData > nItemData) return 1;
    else if (pItemData == nItemData) return 0;
    else return -1;
  });

  return (
    <ScrollView style={styles.container}>
      {globalData != null && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.text, styles.textHeader, styles.greenText]}>🚀 Global Market 🚀</Text>
          </View>
          <View style={styles.sectionValueContainer}>
            <Text style={[styles.text, styles.textHeader, styles.whiteText]}>Domination</Text>
            <Text style={[styles.text, styles.textItemHeader2, styles.greenText]}>{formatMoney(globalData.data.total_market_cap.usd)}</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor={'percentage'}
              backgroundColor={'transparent'}
              paddingLeft={'25'}
            />
          </View>
        </View>
      )}
      {categoryData.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.text, styles.textHeader, styles.greenText]}>💸 Category 💸</Text>
          </View>
          <View>{categoryListComponent(categoryData)}</View>
        </View>
      )}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.text, styles.textHeader, styles.greenText]}>💰 Coin 💰</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
          <Text style={[styles.text, styles.whiteText, styles.textItemHeader]}>Name</Text>
          <Text style={[styles.text, styles.whiteText, styles.textItemHeader]}>24h Change</Text>
          <Text style={[styles.text, styles.whiteText, styles.textItemHeader]}>Price</Text>
        </View>
        <View>{coinListComponent(trendsData.coins)}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455A64',
  },

  section: {
    flex: 1,
  },

  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
  },

  sectionValueContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

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

  //

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

export default memo(TrendStats);
