import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import DropPicker from "../../DropPicker";
import { months } from "../../helpers/months";

import moment from "moment";

const DateAndYearPicker = (props) => {
  const { getYear, getMonth, getIsOpened, month, year } = props;

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const years = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
  ];

  useEffect(() => {
    getYear(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    getMonth(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    getIsOpened(isOpened);
  }, [isOpened]);

  return (
    <View style={styles.dateRow}>
      <View style={[styles.dateItemContainer, { zIndex: 1000 }]}>
        <DropPicker
          list={months.map((month) => {
            return {
              label: month,
              value: month,
            };
          })}
          width="25%"
          dropContainerStyle={styles.dateContainer}
          placeholder="Select Month"
          valueSelected={setSelectedMonth}
          showingValue={month ? month : selectedMonth}
          isOpened={(data) => setIsOpened(data)}
        />
      </View>
      <View style={[styles.dateItemContainer]}>
        <DropPicker
          list={years.map((year) => {
            return {
              label: year,
              value: year,
            };
          })}
          width="25%"
          dropContainerStyle={styles.dateContainer}
          placeholder="Select Year"
          valueSelected={setSelectedYear}
          showingValue={year ? year : selectedYear}
          isOpened={(data) => setIsOpened(data)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "75%",
    alignSelf: "center",
  },
  dateContainer: {
    width: "25%",
  },
  dateItemContainer: {
    width: "30%",
    zIndex: 100,
    flex: 1,
  },
});

export const DateAndYearPickerOptions = (navData) => {
  return {
    headerTitle: "DateAndYearPicker",
  };
};

export default DateAndYearPicker;
