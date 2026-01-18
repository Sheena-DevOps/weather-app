import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Theme from '../assets/theme';
import { DropDownIcon, Sunny, Cloudy } from './Icons';

const DaysList = ({ weather }) => {
  const formatFullDate = dateString => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDaySmart = (date, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return formatFullDate(date);
  };

  const cardData = weather?.forecast?.forecastday
    ?.slice(0, 10)
    .map((day, index) => ({
      id: index.toString(),
      date: formatDaySmart(day.date, index),
      weather: day.day.condition.text,
      icon: `https:${day.day.condition.icon}`,
      tempHigh: `${day.day.maxtemp_c}°`,
      tempLow: `${day.day.mintemp_c}°`,
    }));

  return (
    <>
      {cardData.map(item => (
        <View style={styles.card2} key={item.id}>
          <View style={styles.row}>
            <View style={styles.leftCol}>
              <Text style={styles.cardText}>{item.date}</Text>
              <Text style={styles.cardSubText}>{item.weather}</Text>
            </View>

            <View style={styles.rightCol}>
              <View style={styles.tempText}>
                <Text style={styles.cardText}>{item.tempHigh}</Text>
                <Text style={styles.cardSubText}>{item.tempLow}</Text>
              </View>
              <View style={styles.verticalDivider} />
              {item.weather === 'cloudy' ? (
                <Cloudy size={20} />
              ) : (
                <Sunny size={20} />
              )}
              <View style={styles.circle}>
                <DropDownIcon size={20} />
              </View>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card2: {
    width: '100%',
    borderRadius: 15,
    padding: 15,
    backgroundColor: Theme.background2,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftCol: {
    width: '40%',
    gap: 5,
  },
  rightCol: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tempText: {
    alignItems: 'flex-end',
  },
  row2: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  circle: {
    top: -20,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: Theme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: Theme.black,
    fontSize: 16,
    fontFamily: 'ProductSans-Regular',
    marginBottom: 5,
  },
  cardSubText: {
    color: '#494649',
    fontSize: 16,
    fontFamily: 'ProductSans-Regular',
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: Theme.black,
  },
});
export default DaysList;
