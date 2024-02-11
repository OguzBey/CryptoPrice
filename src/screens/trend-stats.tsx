import { memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CoinGeckoTrendCategoryItem } from '../types';
import { formatMoney } from '../helpers/utils';
import { PieChart } from 'react-native-chart-kit';
import randomcolor from 'randomcolor';
import coinListComponent from '../components/trend-coin-list';
import categoryListComponent from '../components/trend-category-list';

type TrendStatsProps = NativeStackScreenProps<ParamListBase, 'TrendStats'>;

const TrendStats: React.FC<TrendStatsProps> = () => {
  console.log('TrendStats rendered!!!');
  const globalData = useSelector((state: RootState) => state.globalData);
  const trendsData = useSelector((state: RootState) => state.trendsData);
  const [categoryData, setCategoryData] = useState([] as CoinGeckoTrendCategoryItem[]);
  const [pieChardData, setPieChartData] = useState(
    [] as { name: string; percentage: number; color: string; legendFontColor: string; legendFontSize: number }[]
  );
  console.log(categoryData.length);
  // const categoryData = [...trendsData.categories];
  const screenWidth = Dimensions.get('window').width;

  const totalMarketCapUsd = globalData != null ? globalData.data.total_market_cap.usd || 0 : 0;

  useEffect(() => {
    console.log('useEfffect Rendered!');
    const colors: string[] = ['#4CAF50', '#2196F3', '#FFEB3B', '#F44336', '#9C27B0', '#795548', '#FF9800', '#9E9E9E', '#3F51B5', '#607D8B'];
    const legendFontColor = '#FFFFFF';
    const legendFontSize = 14;

    let pieData: { name: string; percentage: number; color: string; legendFontColor: string; legendFontSize: number }[] = [];
    if (globalData) {
      let colorCount = 0;
      let totalPerc = 0;
      for (const coinKey of Object.keys(globalData.data.market_cap_percentage)) {
        const percentage = globalData.data.market_cap_percentage[coinKey];
        const color = colors[colorCount] || randomcolor();
        colorCount += 1;
        totalPerc += percentage;
        pieData.push({ name: coinKey.toUpperCase(), percentage, color, legendFontSize, legendFontColor });
      }

      const otherPerc = 100 - totalPerc;
      if (otherPerc > 0) {
        pieData.push({ name: 'Other', percentage: otherPerc, color: randomcolor(), legendFontSize, legendFontColor });
      }

      setPieChartData(pieData);
    }
    const cData = [...trendsData.categories];
    cData.sort((pItem, nItem) => {
      const pItemData = Math.abs(pItem.data.market_cap_change_percentage_24h.usd || 0);
      const nItemData = Math.abs(nItem.data.market_cap_change_percentage_24h.usd || 0);
      if (pItemData > nItemData) return 1;
      else if (pItemData == nItemData) return 0;
      else return -1;
    });
    setCategoryData(cData);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {pieChardData.length != 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.text, styles.textHeader, styles.greenText]}>🚀 Global Market 🚀</Text>
          </View>
          <View style={styles.sectionValueContainer}>
            <Text style={[styles.text, styles.textHeader, styles.whiteText]}>Domination</Text>
            {totalMarketCapUsd != 0 && <Text style={[styles.text, styles.textItemHeader2, styles.greenText]}>{formatMoney(totalMarketCapUsd)}</Text>}
            <PieChart
              data={pieChardData}
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
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.text, styles.textHeader, styles.greenText]}>💸 Category 💸</Text>
        </View>
        <View>{categoryListComponent(categoryData)}</View>
      </View>
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
});

export default memo(TrendStats);
