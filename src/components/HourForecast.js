import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import Theme from '../assets/theme';
import { ClockIcon } from '../components/Icons';

const HourForecast = ({ loadDayForecast }) => {
  const formatHour = (time, index) => {
    const date = new Date(time);
    const hour = date.getHours();

    if (index === 0) return 'Now';

    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}${period}`;
  };

  const todayHours = loadDayForecast?.forecast?.forecastday?.[0]?.hour ?? [];
  const tomorrowHours = loadDayForecast?.forecast?.forecastday?.[1]?.hour ?? [];
  const currentHour = new Date().getHours();
  const combinedHours = [
    ...todayHours.slice(currentHour),
    ...tomorrowHours,
  ].slice(0, 12);

  const cardData = combinedHours.map((hour, index) => ({
    id: index.toString(),
    time: formatHour(hour.time, index),
    icon: `https:${hour.condition.icon}`,
    temp: `${hour.temp_c}°`,
  }));

  return (
    <View style={styles.card2}>
      <View style={styles.row}>
        <View style={styles.circle}>
          <ClockIcon size={20} />
        </View>
        <Text style={styles.cardText}>Hourly forecast</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row2}
      >
        {cardData.map(item => (
          <View key={item.id} style={styles.timeColumn}>
            <Text style={styles.cardText}>{item.time}</Text>
            <View style={{ height: 30 }}>
              <Image
                source={{ uri: item.icon }}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={styles.dayText}>{item.temp}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card2: {
    width: '100%',
    borderRadius: 15,
    padding: 10,
    backgroundColor: Theme.background2,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  row2: {
    gap: 30,
    alignItems: 'center',
  },
  timeColumn: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: Theme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: Theme.black,
    fontSize: 18,
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
});
export default HourForecast;
