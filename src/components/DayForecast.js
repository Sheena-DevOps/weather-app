import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Theme from '../assets/theme';
import { CalendarIcon } from '../components/Icons';

const DayForecast = () => {
  const offset = 10;

  const data = [
    { value: -8 + offset, label: 'Mon' },
    { value: -3 + offset, label: 'Tue' },
    { value: -4 + offset, label: 'Wed' },
    {
      value: 3 + offset,
      label: 'Thu',
      showStrip: true,
      stripHeight: 40,
      stripColor: Theme.black,
      stripWidth: 2,
      stripDashArray: [6, 6],
      dataPointLabelComponent: () => (
        <View style={styles.tempBubble}>
          <Text style={styles.tempText}>3°</Text>
        </View>
      ),
      dataPointLabelShiftY: -55,
    },
    { value: -1 + offset, label: 'Fri' },
    { value: -6 + offset, label: 'Sat' },
    { value: 5 + offset, label: 'Sun' },
  ];

  const renderDot = item =>
    item.value === 3 + offset ? <View style={styles.dot} /> : null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.row}>
        <View style={styles.circle}>
          <CalendarIcon size={18} />
        </View>
        <Text style={styles.title}>Day forecast</Text>
      </View>

      {/* Chart */}
      <View style={{ marginTop: 30, overflow: 'hidden' }}>
        <LineChart
          data={data}
          curved
          stepValue={10}
          stepHeight={40}
          thickness={2}
          color="#000"
          areaChart
          startFillColor="#3E2C73"
          endFillColor={Theme.background2}
          startOpacity={0.34}
          endOpacity={0.12}
          yAxisLabelTexts={['-10', '0', '10']}
          yAxisLabelWidth={44}
          spacing={42}
          initialSpacing={24}
          endSpacing={24}
          yAxisColor="transparent"
          xAxisColor="rgba(0,0,0,0.2)"
          rulesColor="rgba(0,0,0,0.2)"
          rulesType="solid"
          noOfSections={2}
          xAxisLabelTextStyle={styles.xLabel}
          xAxisLabelsHeight={30}
          xAxisLabelsVerticalShift={12}
          labelsExtraHeight={16}
          dataPointsHeight={14}
          dataPointsWidth={14}
          dataPointRadius={7}
          hideDataPoints={false}
          customDataPoint={renderDot}
          overflowBottom={30}
        />
      </View>
    </View>
  );
};

export default DayForecast;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Theme.background2,
    borderRadius: 20,
    padding: 14,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Theme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: Theme.black,
    fontFamily: 'ProductSans-Regular',
  },
  xLabel: {
    color: Theme.black,
    marginTop: 10,
    fontSize: 13,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3E2C73',
    borderWidth: 3,
    borderColor: Theme.white,
  },
  tempBubble: {
    marginTop: 30,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.white,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    elevation: 3,
  },
  tempText: {
    color: Theme.black,
    fontWeight: '600',
    fontSize: 14,
  },
});
