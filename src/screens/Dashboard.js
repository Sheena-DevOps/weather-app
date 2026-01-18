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
} from '../components/Icons';
import HourForecast from '../components/HourForecast';
import DayForecast from '../components/DayForecast';
import ChanceOfRain from '../components/ChanceOfRain';
import DaysList from '../components/DaysList';
import { fetchWeather, fetchDayForecast } from '../config/weatherService';
import Geolocation from '@react-native-community/geolocation';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [weather, setWeather] = useState(null);
  const [dayForecast, setDayForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (position) {
      loadWeather();
      loadDayForecast();
    }
  }, [position]);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(pos);
      },
      error => console.log('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    );
  };

  const loadWeather = async () => {
    try {
      if (position) {
        const data = await fetchWeather(
          position.coords.longitude,
          position.coords.latitude,
        );
        setWeather(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadDayForecast = async () => {
    try {
      if (position) {
        const data = await fetchDayForecast(
          position.coords.longitude,
          position.coords.latitude,
        );
        setDayForecast(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const input =
    activeTab === 'today' || activeTab === '10days'
      ? weather?.location?.localtime
      : activeTab === 'tomorrow'
      ? weather?.forecast?.forecastday?.[1]?.date
      : null;

  const localDate = input ? new Date(input.replace(' ', 'T')) : null;

  const formatted = localDate
    ? new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
        .format(localDate)
        .replace(' at ', ', ')
    : '';

  function timeStringToDate(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') return null;

    const parts = timeStr.trim().split(' ');
    if (parts.length !== 2) return null;

    const [time, modifier] = parts;
    let [hours, minutes] = time.split(':').map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const targetDate = new Date();
    targetDate.setHours(hours, minutes, 0, 0);

    return targetDate;
  }

  function getRelativeTime(timeStr) {
    const target = timeStringToDate(timeStr);
    if (!target) return '';

    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    const diffMinutes = Math.round(Math.abs(diffMs) / 60000);

    if (diffMinutes < 60) {
      return diffMs < 0 ? `${diffMinutes}m ago` : `in ${diffMinutes}m`;
    }

    const diffHours = Math.round(diffMinutes / 60);

    return diffMs < 0 ? `${diffHours}h ago` : `in ${diffHours}h`;
  }

  const cardData = [
    {
      id: '1',
      title: 'Wind speed',
      unit: `${weather?.current?.wind_kph ?? ''} km/h`,
      value: `${weather?.current?.wind_mph ?? ''} km/h`,
      icon: <AirIcon size={20} />,
      status: 'up',
    },
    {
      id: '2',
      title: 'Rain chance',
      unit: `${weather?.current?.precip_mm ?? ''} %`,
      value: `${weather?.current?.precip_in ?? ''} %`,
      icon: <RainIcon size={20} />,
      status: 'down',
    },
    {
      id: '3',
      title: 'Pressure',
      unit: `${weather?.current?.pressure_mb ?? ''} hPa`,
      value: `${weather?.current?.pressure_in ?? ''} hPa`,
      icon: <WaveIcon size={20} />,
      status: 'down',
    },
    {
      id: '4',
      title: 'UV Index',
      unit: `${weather?.current?.uv ?? ''}`,
      value: `${weather?.current?.uv ?? ''}`,
      icon: <WaveIcon size={20} />,
      status: 'down',
    },
  ];

  const fetchTmrwForecast = async () => {
    try {
      if (position) {
        const data = await fetchDayForecast(
          position.coords.longitude,
          position.coords.latitude,
          true,
        );
        const weatherData = await fetchWeather(
          position.coords.longitude,
          position.coords.latitude,
          true,
        );
        setDayForecast(data);
        setWeather(weatherData);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <Text style={[styles.text, { maxWidth: '60%' }]}>
              {weather?.location?.tz_id ?? ''},{' '}
              {weather?.location?.country ?? ''}
            </Text>
            <SearchIcon size={20} />
          </View>
          <View style={styles.row2}>
            <View style={styles.temp}>
              <Text style={styles.tempText}>
                {activeTab === 'today' || activeTab === '10days'
                  ? weather?.current?.temp_c
                  : activeTab === 'tomorrow'
                  ? weather?.forecast?.forecastday?.[1]?.day?.maxtemp_c
                  : ''}
                °
              </Text>
              {(activeTab === 'today' || activeTab === '10days') && (
                <Text style={[styles.text, { marginLeft: -20 }]}>
                  Feels like {weather?.current?.feelslike_c ?? ''}°
                </Text>
              )}
            </View>
            <View style={styles.timeColumn}>
              <Image
                source={{
                  uri: weather?.current?.condition?.icon
                    ? `https:${weather.current.condition.icon}`
                    : null,
                }}
                style={{ width: 100, height: 100 }}
              />
              <Text style={[styles.text, { fontSize: 22 }]}>
                {weather?.current?.condition?.text ?? ''}
              </Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={styles.text}>{formatted}</Text>
            <View>
              <Text style={styles.dayTempText}>
                Day {weather?.forecast?.forecastday?.[0]?.day?.maxtemp_c ?? ''}°
              </Text>
              <Text style={styles.dayTempText}>
                Night{' '}
                {weather?.forecast?.forecastday?.[0]?.day?.mintemp_c ?? ''}°
              </Text>
            </View>
          </View>
        </View>

        {loading && <ActivityIndicator size="large" />}

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'today' && styles.activeTab]}
            onPress={() => {
              loadDayForecast();
              setActiveTab('today');
            }}
          >
            <Text style={styles.dayText}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'tomorrow' && styles.activeTab]}
            onPress={() => {
              fetchTmrwForecast();
              setActiveTab('tomorrow');
            }}
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
            <DaysList weather={weather} />
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

              <HourForecast loadDayForecast={dayForecast} />

              {weather && <DayForecast weather={weather} />}

              <ChanceOfRain loadDayForecast={dayForecast} />

              <View style={styles.contentGrid}>
                <View style={styles.card}>
                  <View style={styles.circle}>
                    <SunriseIcon size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardText}>Sunrise</Text>
                    <View style={styles.row2}>
                      <Text style={styles.timeText}>
                        {weather?.forecast?.forecastday?.[0]?.astro?.sunrise ??
                          ''}
                      </Text>
                      <Text style={styles.coverageText}>
                        {' '}
                        {getRelativeTime(
                          weather?.forecast?.forecastday?.[0]?.astro?.sunrise,
                        )}
                      </Text>
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
                      <Text style={styles.timeText}>
                        {weather?.forecast?.forecastday?.[0]?.astro?.sunset ??
                          ''}
                      </Text>
                      <Text style={styles.coverageText}>
                        {' '}
                        {getRelativeTime(
                          weather?.forecast?.forecastday?.[0]?.astro?.sunset,
                        )}{' '}
                      </Text>
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
    fontSize: 9,
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
