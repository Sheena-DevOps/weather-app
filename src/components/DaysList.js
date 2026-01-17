import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Theme from '../assets/theme';
import { DropDownIcon, Sunny, Cloudy } from './Icons';

const DaysList = () => {
  const cardData = [
    {
      id: '1',
      day: 'Today',
      weather: 'cloudy',
      tempHigh: '3°',
      tempLow: '-2°',
    },
    {
      id: '2',
      day: 'Thursday,Jan 19',
      weather: 'rainy',
      tempHigh: '5°',
      tempLow: '-2°',
    },
    {
      id: '3',
      day: 'Thursday,Jan 19',
      weather: 'cloudy and sunny',
      tempHigh: '5°',
      tempLow: '-2°',
    },
    {
      id: '4',
      day: 'Thursday,Jan 19',
      weather: 'cloudy',
      tempHigh: '5°',
      tempLow: '-2°',
    },
  ];

  return (
    <>
      {cardData.map(item => (
        <View style={styles.card2} key={item.id}>
          <View style={styles.row}>
            <View style={styles.leftCol}>
              <Text style={styles.cardText}>{item.day}</Text>
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
