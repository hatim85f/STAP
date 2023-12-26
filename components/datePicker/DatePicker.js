import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Button } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import DaySelection from "./DaySelection";

const mainHeight = Dimensions.get("window").height;
const mainWidth = Dimensions.get("window").width;

const DatePicker = (props) => {
  const {
    borderColor,
    backgroundColor,
    width,
    height,
    arrowsColor,
    useRange,
    firstDate,
    secondDate,
    showPicker,
    closePicker,
    daysColor,
  } = props;

  const [currentYear, setcurrentYear] = useState(
    moment(new Date()).format("YYYY")
  );
  const [yearList, setYearList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const yearsContainerHeight = useRef(
    new Animated.Value(-mainHeight * 2)
  ).current;
  const mainContainerHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Function to generate an array of 10 years including the current year
    const generateYearList = () => {
      const startYear = parseInt(currentYear, 10) - 4;
      const years = Array.from({ length: 12 }, (_, index) =>
        (startYear + index).toString()
      );
      setYearList(years);
    };

    generateYearList();
  }, [currentYear]);

  const closeYearsContainer = () => {
    Animated.timing(yearsContainerHeight, {
      toValue: -mainHeight * 2,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.bounce, // Change "ease" to "easing"
    }).start();
  };

  const showYearsContainer = () => {
    Animated.timing(yearsContainerHeight, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.bounce, // Change "ease" to "easing"
    }).start();
  };

  const increaseYears = () => {
    const startYear = parseInt(yearList[yearList.length - 1], 10) + 1;
    const years = Array.from({ length: 12 }, (_, index) =>
      (startYear + index).toString()
    );
    setYearList(years);
  };

  const decreaseYears = () => {
    const startYear = parseInt(yearList[0], 10) - 12;
    const years = Array.from({ length: 12 }, (_, index) =>
      (startYear + index).toString()
    );
    setYearList(years);
  };

  useEffect(() => {
    firstDate(startDate);
  }, [startDate]);

  useEffect(() => {
    secondDate(endDate);
  }, [endDate]);

  const showMainContainer = () => {
    Animated.timing(mainContainerHeight, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bounce, // Change "ease" to "easing"
    }).start();
  };

  useEffect(() => {
    if (showPicker) {
      showMainContainer();
    }
  }, [showPicker]);

  const hideMainContainer = () => {
    Animated.timing(mainContainerHeight, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bounce, // Change "ease" to "easing"
    }).start();
    closePicker();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.datePickerContainer,
          {
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            width: width,
            height: height,
            transform: [{ scale: mainContainerHeight }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={showYearsContainer}
          style={styles.yearPicker}
        >
          <Text style={styles.yearText}>{currentYear}</Text>
        </TouchableOpacity>
        <DaySelection
          year={currentYear}
          arrowsColor={arrowsColor}
          daysColor={daysColor}
          useRange={useRange}
          getStart={(date) => setStartDate(date)}
          getEnd={(date) => setEndDate(date)}
        />
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={hideMainContainer}
            style={styles.cancelContainer}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={hideMainContainer}
            style={styles.cancelContainer}
          >
            <Text style={styles.cancelText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.yearsContainer,
          {
            transform: [{ translateY: yearsContainerHeight }],
            height: width * 0.25,
            width: width * 0.5,
          },
        ]}
      >
        <TouchableOpacity
          onPress={closeYearsContainer}
          style={styles.closeContainer}
        >
          <Ionicons name="close" size={24} color="#ff0055" />
        </TouchableOpacity>
        <View style={styles.yearsDetailsContainer}>
          <TouchableOpacity
            onPress={decreaseYears}
            style={styles.arrowContainer}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={arrowsColor}
            />
          </TouchableOpacity>
          <View style={styles.yearsDetails}>
            {yearList.map((year) => (
              <TouchableOpacity
                onPress={() => {
                  setcurrentYear(year);
                  closeYearsContainer();
                }}
                key={year}
                style={[
                  styles.yearDetail,
                  {
                    backgroundColor: year === currentYear ? "skyblue" : "white",
                  },
                ]}
              >
                <Text style={styles.yearText}>{year}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={increaseYears}
            style={styles.arrowContainer}
          >
            <MaterialIcons
              name="arrow-forward-ios"
              size={24}
              color={arrowsColor}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerContainer: {
    borderRadius: 15,
    borderWidth: 2.5,
    padding: 10,
  },
  cancelContainer: {
    flex: 0.05,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
  },
  cancelText: {
    color: "blue",
    fontFamily: "Helvetica",
    fontSize: 18,
  },
  yearPicker: {
    width: mainWidth * 0.06,
    height: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    color: "black",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  yearText: {
    color: "black",
    fontFamily: "Helvetica",
    fontSize: mainWidth * 0.01,
  },
  yearsContainer: {
    position: "absolute",
    backgroundColor: "white",
    top: mainHeight * 0.06,
    left: mainWidth * 0.01,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1.5,
  },
  arrowContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  yearsDetails: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  yearDetail: {
    width: mainWidth * 0.05,
    marginTop: mainHeight * 0.009,
    marginBottom: mainHeight * 0.009,
    alignItems: "center",
    justifyContent: "center",
    height: mainHeight * 0.02,
    borderRadius: 5,
  },

  yearsDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 5,
    marginBottom: 10,
  },
  buttonsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DatePicker;
