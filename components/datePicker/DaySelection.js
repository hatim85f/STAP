import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const mainWidth = Dimensions.get("window").width;
const mainHeight = Dimensions.get("window").height;

const DaySelection = (props) => {
  const { year, arrowsColor, useRange, getStart, getEnd, daysColor } = props;

  const [currentMonth, setCurrentMonth] = useState(
    moment(new Date()).format("MMMM")
  );
  const [firstMonth, setFirstMonth] = useState(null);
  const [lastMonth, setLastMonth] = useState(null);
  const [weekDays, setWeekDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(null);
  const [firstDay, setFirstDay] = useState(
    moment(`${currentMonth} 1 ${year}`, `MMMM D YYYY`)
  );
  const [daysRange, setDaysRange] = useState([]);
  const [actualMonth, setActualMonth] = useState(
    moment(new Date()).format("MMMM")
  );
  const [lastDay, setLastDay] = useState(null);

  const increaseMonth = () => {
    const nextMonth = moment(currentMonth, "MMMM")
      .add(1, "month")
      .format("MMMM");
    setCurrentMonth(nextMonth);
  };

  const decreaseMonth = () => {
    const previousMonth = moment(currentMonth, "MMMM")
      .subtract(1, "month")
      .format("MMMM");
    setCurrentMonth(previousMonth);
  };

  useEffect(() => {
    getStart(new Date(`${firstMonth} ${currentDay} ${year}`));
  }, [currentDay, currentMonth, year]);

  useEffect(() => {
    getEnd(new Date(`${lastMonth} ${lastDay} ${year}`));
  }, [lastDay, currentMonth, year]);

  const getDaysOfMonthByWeekday = (year, month) => {
    const daysOfMonthByWeekday = [];

    // Get the first day of the month
    const firstDayOfMonth = moment(`${month} 1 ${year}`, "MMMM D YYYY");

    // Get the number of days in the month
    const daysInMonth = firstDayOfMonth.daysInMonth();

    // Determine the weekday index of the first day
    const firstWeekdayIndex = firstDayOfMonth.day();

    // Initialize an array to store days for each weekday
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysByWeekday = weekdays.map((weekday) => ({
      day: weekday,
      days: [],
    }));

    // Populate the array with days of the month for each weekday
    for (let day = 1; day <= daysInMonth; day++) {
      const weekdayIndex = (firstWeekdayIndex + day - 1) % 7;
      daysByWeekday[weekdayIndex].days.push(day.toString());
    }

    // Format the result as an array of objects
    daysByWeekday.forEach((weekday, index) => {
      daysOfMonthByWeekday.push({
        day: weekday.day,
        days: firstWeekdayIndex > index ? ["", ...weekday.days] : weekday.days,
      });
    });

    return daysOfMonthByWeekday;
  };

  useEffect(() => {
    const daysOfMonthByWeekday = getDaysOfMonthByWeekday(year, currentMonth);
    setWeekDays(daysOfMonthByWeekday);
  }, [currentMonth, year]);

  const changeSelectedDay = (day) => {
    if (useRange) {
      if (currentDay && lastDay) {
        setCurrentDay(day);
        setFirstMonth(currentMonth);
        setLastDay(null);
        let newRange = [];
        newRange.push(day);
        setDaysRange(newRange);
      } else if (currentDay) {
        setLastDay(day);
        setLastMonth(currentMonth);
      } else if (!currentDay) {
        setCurrentDay(day);
        setFirstMonth(currentMonth);
        let newRange = [];
        newRange.push(day);
        setDaysRange(newRange);
      } else {
        setCurrentDay(day);
        setFirstMonth(currentMonth);
        let newRange = [];
        newRange.push(day);
        setDaysRange(newRange);
      }
    }
  };

  useEffect(() => {
    if (currentDay && lastDay) {
      let daysRange = [];
      for (let i = parseInt(currentDay); i <= parseInt(lastDay); i++) {
        daysRange.push(`${i}`);
      }
      setDaysRange([...new Set(daysRange)]);
    }
  }, [currentDay, lastDay]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={decreaseMonth} style={styles.arrowContainer}>
          <MaterialIcons
            name="arrow-back-ios"
            size={mainWidth * 0.01}
            color={arrowsColor}
          />
        </TouchableOpacity>
        <Text style={styles.header}> {currentMonth} </Text>
        <TouchableOpacity onPress={increaseMonth} style={styles.arrowContainer}>
          <MaterialIcons
            name="arrow-forward-ios"
            size={mainWidth * 0.01}
            color={arrowsColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.daysRow}>
        {weekDays.map((week, index) => {
          return (
            <View style={styles.mainDaysContainer} key={index}>
              <Text style={styles.day}>{week.day}</Text>
              <View style={styles.daysDetails}>
                {week.days.map((day, dIndex) => (
                  <TouchableOpacity
                    key={dIndex}
                    style={[
                      styles.dayContainer,
                      {
                        backgroundColor: daysRange.includes(day)
                          ? daysColor
                          : day === ""
                          ? "transparent"
                          : "white",
                        borderWidth: day === "" ? 0 : 1,
                        elevation: day === "" ? 0 : 5,
                        shadowOffset: {
                          width: 0,
                          height: day === "" ? 0 : 2,
                        },
                        shadowOpacity: day === "" ? 0 : 0.25,
                        shadowRadius: day === "" ? 0 : 10,
                      },
                    ]}
                    onPress={() => changeSelectedDay(day)}
                    disabled={day === "" ? true : false}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color:
                            daysRange.includes(day) && day !== ""
                              ? "white"
                              : "black",
                        },
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontFamily: "Helvetica",
    fontSize: mainWidth * 0.01,
    color: "blue",
    marginTop: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: mainWidth * 0.25,
    alignSelf: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 40,
    position: "relative",
  },
  day: {
    fontFamily: "Helvetica",
    fontSize: mainWidth * 0.01,
    fontWeight: "bold",
    marginBottom: 25,
  },
  dayContainer: {
    width: mainWidth * 0.025,
    justifyContent: "center",
    alignItems: "center",
    height: mainHeight * 0.04,
    aspectRatio: 0.5,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  daysDetails: {
    height: mainHeight * 0.05,
  },
  mainDaysContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontFamily: "open-sans",
    fontSize: mainWidth * 0.01,
  },
});

export default DaySelection;
