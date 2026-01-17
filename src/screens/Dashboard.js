import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Theme from '../assets/theme';
import {
  SearchIcon,
  AirIcon,
  RainIcon,
  WaveIcon,
  SunriseIcon,
  SunsetIcon,
  DownArrowIcon,
  UpArrowIcon,
  SunnyLarge,
} from '../components/Icons';
import HourForecast from '../components/HourForecast';
import DayForecast from '../components/DayForecast';
import ChanceOfRain from '../components/ChanceOfRain';
import DaysList from '../components/DaysList';
import { fetchWeather } from '../config/weatherService';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      setLoading(true);
      const data = await fetchWeather();
      setWeather(data);
      console.log('Weather Data:', data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const cardData = [
    {
      id: '1',
      title: 'Wind speed',
      unit: 'km/h',
      value: '12',
      icon: <AirIcon size={20} />,
      status: 'up',
    },
    {
      id: '2',
      title: 'Rain chance',
      unit: '%',
      value: '%',
      icon: <RainIcon size={20} />,
      status: 'down',
    },
    {
      id: '3',
      title: 'Pressure',
      unit: 'hPa',
      value: 'hpa',
      icon: <WaveIcon size={20} />,
      status: 'down',
    },
    {
      id: '4',
      title: 'Pressure',
      unit: 'hPa',
      value: 'hpa',
      icon: <WaveIcon size={20} />,
      status: 'down',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView showVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/images/night_sky.png')}
          style={styles.backgroundImage}
          imageStyle={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.row2}>
            <Text style={styles.text}>
              {weather?.location?.name ?? ''},{' '}
              {weather?.location?.country ?? ''}
            </Text>
            <SearchIcon size={20} />
          </View>
          <View style={styles.row2}>
            <View style={styles.temp}>
              <Text style={styles.tempText}>3°</Text>
              <Text style={[styles.text, { marginLeft: -20 }]}>Feels like</Text>
            </View>
            <View style={styles.timeColumn}>
              <SunnyLarge size={100} />
              <Text style={[styles.text, { fontSize: 22 }]}>Cloudy</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={styles.text}>date, time</Text>
            <View>
              <Text style={styles.dayTempText}>Day</Text>
              <Text style={styles.dayTempText}>Night</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'today' && styles.activeTab]}
            onPress={() => setActiveTab('today')}
          >
            <Text style={styles.dayText}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'tomorrow' && styles.activeTab]}
            onPress={() => setActiveTab('tomorrow')}
          >
            <Text style={styles.dayText}>Tomorrow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === '10days' && styles.activeTab]}
            onPress={() => setActiveTab('10days')}
          >
            <Text style={styles.dayText}>10 days</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          {activeTab === '10days' ? (
            <DaysList />
          ) : (
            <>
              <View style={styles.contentGrid}>
                {cardData.map(item => (
                  <View key={item.id} style={styles.card}>
                    <View style={styles.circle}>{item.icon}</View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardText}>{item.title}</Text>
                      <View style={styles.row2}>
                        <Text style={styles.cardText}>{item.unit}</Text>
                        <View style={styles.row3}>
                          {item.status === 'up' ? (
                            <UpArrowIcon size={20} />
                          ) : (
                            <DownArrowIcon size={20} />
                          )}
                          <Text style={styles.coverageText}>{item.value}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <HourForecast />

              <DayForecast />

              <ChanceOfRain />

              <View style={styles.contentGrid}>
                <View style={styles.card}>
                  <View style={styles.circle}>
                    <SunriseIcon size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardText}>Sunrise</Text>
                    <View style={styles.row2}>
                      <Text style={styles.timeText}>4 AM</Text>
                      <Text style={styles.coverageText}>4h ago</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.card}>
                  <View style={styles.circle}>
                    <SunsetIcon size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardText}>Sunset</Text>
                    <View style={styles.row2}>
                      <Text style={styles.timeText}>4 PM</Text>
                      <Text style={styles.coverageText}>in 9h</Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  content: {
    flexDirection: 'column',
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.43,
  },
  container2: {
    flex: 1,
    backgroundColor: Theme.background,
    padding: 20,
  },
  backgroundImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  image: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    color: Theme.white,
    fontSize: 16,
    fontFamily: 'ProductSans-Regular',
  },
  dayTempText: {
    color: Theme.white,
    fontSize: 14,
    fontFamily: 'ProductSans-Bold',
    textAlign: 'right',
  },
  tabRow: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    width: '30%',
    height: 40,
    backgroundColor: Theme.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Theme.primary,
  },
  dayText: {
    color: Theme.black,
    fontSize: 16,
    fontFamily: 'ProductSans-Regular',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  cardText: {
    color: Theme.black,
    fontSize: 14,
    fontFamily: 'ProductSans-Regular',
    marginBottom: 5,
  },
  timeText: {
    color: Theme.black,
    fontSize: 14,
    fontFamily: 'ProductSans-Medium',
  },
  coverageText: {
    color: Theme.black,
    fontSize: 11,
    fontFamily: 'ProductSans-Medium',
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contentGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    flexDirection: 'row',
    width: '48%',
    height: 60,
    backgroundColor: Theme.background2,
    borderRadius: 15,
    marginBottom: 20,
    gap: 10,
    alignItems: 'center',
    padding: 10,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: Theme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  temp: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  tempText: {
    color: Theme.white,
    fontSize: 100,
    fontFamily: 'ProductSans-Regular',
  },
  timeColumn: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
  },
});

export default Dashboard;
