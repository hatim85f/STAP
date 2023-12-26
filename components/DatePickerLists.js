import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import DropPicker from "./DropPicker";
import { globalWidth } from "../constants/globalWidth";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";

const daysList = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
  { label: "17", value: "17" },
  { label: "18", value: "18" },
  { label: "19", value: "19" },
  { label: "20", value: "20" },
  { label: "21", value: "21" },
  { label: "22", value: "22" },
  { label: "23", value: "23" },
  { label: "24", value: "24" },
  { label: "25", value: "25" },
  { label: "26", value: "26" },
  { label: "27", value: "27" },
  { label: "28", value: "28" },
  { label: "29", value: "29" },
  { label: "30", value: "30" },
  { label: "31", value: "31" },
];

const monthsList = [
  { label: "Jan", value: "Jan" },
  { label: "Feb", value: "Feb" },
  { label: "Mar", value: "Mar" },
  { label: "Apr", value: "Apr" },
  { label: "May", value: "May" },
  { label: "Jun", value: "Jun" },
  { label: "Jul", value: "Jul" },
  { label: "Aug", value: "Aug" },
  { label: "Sep", value: "Sep" },
  { label: "Oct", value: "Oct" },
  { label: "Nov", value: "Nov" },
  { label: "Dec", value: "Dec" },
];

const yearsList = [
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
  { label: "2030", value: "2030" },
  { label: "2031", value: "2031" },
  { label: "2032", value: "2032" },
  { label: "2033", value: "2033" },
  { label: "2034", value: "2034" },
  { label: "2035", value: "2035" },
  { label: "2036", value: "2036" },
  { label: "2037", value: "2037" },
  { label: "2038", value: "2038" },
  { label: "2039", value: "2039" },
  { label: "2040", value: "2040" },
  { label: "2041", value: "2041" },
  { label: "2042", value: "2042" },
  { label: "2043", value: "2043" },
  { label: "2044", value: "2044" },
  { label: "2045", value: "2045" },
  { label: "2046", value: "2046" },
  { label: "2047", value: "2047" },
  { label: "2048", value: "2048" },
  { label: "2049", value: "2049" },
  { label: "2050", value: "2050" },
];

const DatePickerLists = (props) => {
  const { title, getDate } = props;

  const [isOpened, setIsOpened] = useState(false);
  const [monthIsOpened, setMonthIsOpened] = useState(false);
  const [yearIsOpened, setYearIsOpened] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const day = selectedDay ? selectedDay : null;
    const month = selectedMonth ? selectedMonth : null;
    const year = selectedYear ? selectedYear : null;

    const date = `${day} ${month} ${year}`;
    const fullDate = new Date(date);

    setSelectedDate(fullDate);
    getDate(fullDate);
  }, [selectedDay, selectedMonth, selectedYear]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <View style={styles.rowContainer}>
        <View style={styles.listContainer}>
          <DropDownPicker
            open={isOpened}
            value={selectedDay}
            items={daysList}
            setOpen={setIsOpened}
            setValue={setSelectedDay}
            setItems={setSelectedDay}
            placeholder="Day"
            placeholderStyle={{ color: "#6a6b6c" }}
            style={styles.listStyle}
            textStyle={styles.dropText}
            dropDownContainerStyle={styles.dropListStyle}
            containerStyle={props.mainListStyle}
          />
        </View>
        <View style={styles.listContainer}>
          <DropDownPicker
            open={monthIsOpened}
            value={selectedMonth}
            items={monthsList}
            setOpen={setMonthIsOpened}
            setValue={setSelectedMonth}
            setItems={setSelectedMonth}
            placeholder="Month"
            placeholderStyle={{ color: "#6a6b6c" }}
            style={styles.listStyle}
            textStyle={styles.dropText}
            dropDownContainerStyle={styles.dropListStyle}
            containerStyle={props.mainListStyle}
          />
        </View>
        <View style={styles.listContainer}>
          <DropDownPicker
            open={yearIsOpened}
            value={selectedYear}
            items={yearsList}
            setOpen={setYearIsOpened}
            setValue={setSelectedYear}
            setItems={setSelectedYear}
            placeholder="Day"
            placeholderStyle={{ color: "#6a6b6c" }}
            style={styles.listStyle}
            textStyle={styles.dropText}
            dropDownContainerStyle={styles.dropListStyle}
            containerStyle={props.mainListStyle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: globalWidth("1%"),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: globalWidth("1%"),
  },
  dropContainerStyle: {
    width: "25%",
  },
  listContainer: {
    width: "25%",
  },
  title: {
    fontSize: globalWidth("1.2%"),
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: globalWidth("1%"),
    color: Colors.primary,
  },
});

export const DatePickerListsOptions = (navData) => {
  return {
    headerTitle: "DatePickerLists",
  };
};

export default DatePickerLists;
