import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as salesActions from "../../store/sales/salesActions";

import Loader from "../../components/Loader";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import TopBar from "./TopBar";
import DatePickerLists from "../../components/DatePickerLists";
import SalesShowComp from "./SalesShowComp";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const ShowSalesScreen = (props) => {
  const { sales } = useSelector((state) => state.sales);

  // ==========================================STATE MANAGEMENT==========================================
  const [startPeriod, setStartPeriod] = useState(null);
  const [endPeriod, setEndPeriod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // ==========================================GETTING SALES======================================================

  const dispatch = useDispatch();
  useEffect(() => {
    // store start date and end date in local storage
    async () => {
      if (startPeriod !== "Invalid date" && endPeriod !== "Invalid date") {
        AsyncStorage.setItem("startDate", startPeriod);
        AsyncStorage.setItem("endDate", endPeriod);
      }
    };
  }, [startPeriod, endPeriod]);

  const submitHandler = () => {
    try {
      setIsLoading(true);
      dispatch(salesActions.getSales(startPeriod, endPeriod)).then(() => {
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  // =====================================================MANAGING DATE===================================================

  // =====================,==============================JSX RETURN======================================================

  if (isLoading) {
    return <Loader loadingMessage="Getting Sales Data..." center />;
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <TopBar />
      <View style={styles.innerContainer}>
        <View style={styles.leftContainer}>
          <Button
            title="Submit"
            onPress={submitHandler}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            disabled={
              startPeriod === "Inavalid date" || endPeriod === "Invalid date"
            }
            disabledStyle={{ backgroundColor: Colors.lightBG }}
          />
          <DatePickerLists
            getDate={(e) => setStartPeriod(moment(e).format("MM/DD/YYYY"))}
            title="Start Date"
          />
          <DatePickerLists
            getDate={(e) => setEndPeriod(moment(e).format("MM/DD/YYYY"))}
            title="End Date"
          />
        </View>
        <View style={styles.rightContainer}>
          <SalesShowComp
            sales={sales}
            startDate={startPeriod}
            endDate={endPeriod}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    width: globalWidth("25%"),
    height: globalHeight("80%"),
  },
  rightContainer: {
    width: globalWidth("75%"),
  },
  buttonStyle: {
    width: "40%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignSelf: "center",
  },
  titleStyle: {
    fontSize: globalWidth("1%"),
    fontFamily: "Helvetica",
  },
});

export const ShowSalesScreenOptions = (navData) => {
  return {
    headerTitle: "ShowSalesScreen",
  };
};

export default ShowSalesScreen;
