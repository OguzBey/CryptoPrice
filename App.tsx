import { memo, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import HomeScreen from './src/screens/home';
import TrendStatsScreen from './src/screens/trend-stats';
import HeaderBackButton from './src/components/header-back-button';
import HeaderRightButton from './src/components/header-right-button-text';
import { fetchCryptoData, fetchTrendData } from './src/api/coingecko';
import { loadTop100, loadTrends } from './src/redux/slice';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataProcess = async () => {
      const top100Data = await fetchCryptoData(100);
      const trendsData = await fetchTrendData();

      if (top100Data.length > 0) dispatch(loadTop100(top100Data));
      else Alert.alert('Error..', 'Api rate-limit. Crypto data not loading..');

      if (trendsData) dispatch(loadTrends(trendsData));
      else Alert.alert('Error..', 'Api rate-limit. Trends data not loading..');
    };
    fetchDataProcess();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route, navigation }) => ({
            title: 'Top 💯',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white', fontFamily: 'RobotoMono-Medium', fontSize: 18 },
            headerStyle: {
              backgroundColor: 'black',
            },
            headerRight: () => <HeaderRightButton navigation={navigation} screenName="TrendStats" displayText="Trends" key={route.name} />,
          })}
        />
        <Stack.Screen
          name="TrendStats"
          component={TrendStatsScreen}
          options={({ route, navigation }) => ({
            title: '🌟 Trends 🌟',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white', fontFamily: 'RobotoMono-Medium', fontSize: 18 },
            headerStyle: {
              backgroundColor: 'black',
            },
            animation: 'slide_from_right',
            headerLeft: () => <HeaderBackButton screenName="Home" navigation={navigation} key={route.name} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ProvidedApp: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default memo(ProvidedApp);
