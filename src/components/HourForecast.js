import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import Theme from '../assets/theme';
import { ClockIcon, Cloudy, Sunny } from '../components/Icons';

const HourForecast = () => {
  const cardData = [
    {
      id: '1',
      title: 'Now',
      status: 'sunny',
      degree: '10°',
    },
    {
      id: '2',
      title: 'Now',
      status: 'cloud',
      degree: '10°',
    },
    {
      id: '3',
      title: 'Now',
      status: 'sunny',
      degree: '12°',
    },
    {
      id: '4',
      title: 'Now',
      status: 'cloud',
      degree: '12°',
    },
  ];

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
            <Text style={styles.cardText}>{item.title}</Text>
            <View style={{ height: 30 }}>
              {item.status === 'sunny' ? (
                <Sunny height={30} />
              ) : (
                <Cloudy height={25} />
              )}
            </View>
            <Text style={styles.dayText}>{item.degree}</Text>
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
