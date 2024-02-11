import { CoinGeckoTrendDataResponse } from '../types';
import CategoryContainer from './trend-category/category-container';

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

export default categoryListComponent;
