import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Theme from '../assets/theme';
import { RainIcon } from '../components/Icons';

const ChanceOfRain = ({ loadDayForecast }) => {
  const formatHour = (time, index) => {
    const date = new Date(time);
    const hour = date.getHours();

    if (index === 0) return 'Now';

    const period = hour >= 12 ? ' PM' : ' AM';
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}${period}`;
  };

  const todayHours = loadDayForecast?.forecast?.forecastday?.[0]?.hour ?? [];
  const tomorrowHours = loadDayForecast?.forecast?.forecastday?.[1]?.hour ?? [];
  const currentHour = new Date().getHours();
  const combinedHours = [...todayHours.slice(currentHour), ...tomorrowHours];
  const rainData = combinedHours.slice(1, 5).map((hour, index) => ({
    id: index.toString(),
    time: formatHour(hour.time, index + 1),
    percentage: hour.chance_of_rain || 0,
  }));

  const ProgressBar = ({ percentage }) => {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.min(percentage, 100)}%`,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.card2}>
      <View style={styles.row}>
        <View style={styles.circle}>
          <RainIcon size={20} />
        </View>
        <Text style={styles.cardText}>Chance of rain</Text>
      </View>
      {rainData.map(item => (
        <View style={styles.row2} key={item.id}>
          <Text style={styles.cardText}>{item.time}</Text>
          <ProgressBar percentage={item.percentage} />
          <Text style={styles.cardText}>{Math.round(item.percentage)}%</Text>
        </View>
      ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: Theme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: Theme.black,
    fontSize: 14,
    fontFamily: 'ProductSans-Regular',
    marginBottom: 5,
  },
  container: {
    height: 25,
    width: '70%',
    backgroundColor: Theme.white,
    borderRadius: 15,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 15,
    height: '100%',
    backgroundColor: Theme.secondary,
  },
});
export default ChanceOfRain;
