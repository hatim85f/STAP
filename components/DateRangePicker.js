import moment from "moment";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { globalWidth } from "../constants/globalWidth";

const DateRangePicker = (props) => {
  const { getDate } = props;

  const [startDay, setStartDay] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [startYear, setStartYear] = useState(null);

  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (startDay && startMonth && startYear && startYear.length === 4) {
      setStartDate(new Date(startYear, parseInt(startMonth) - 1, startDay));
    }
  }, [startDay, startMonth, startYear]);

  useEffect(() => {
    if (startDate) {
      getDate(startDate);
    }
  }, [startDate]);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TextInput
          placeholder="Day"
          style={styles.input}
          onChangeText={(text) => setStartDay(text)}
          defaultValue={startDay ? startDay : null}
        />
        <TextInput
          placeholder="Month"
          style={styles.input}
          onChangeText={(text) => setStartMonth(text)}
          defaultValue={startMonth ? startMonth : null}
        />
        <TextInput
          placeholder="Year"
          style={styles.input}
          onChangeText={(text) => setStartYear(text)}
          defaultValue={startYear}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-around",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: globalWidth("5%"),
    height: 40,
    borderColor: Colors.font,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    textAlign: "center",
    fontFamily: "numbers",
  },
});

export default DateRangePicker;
