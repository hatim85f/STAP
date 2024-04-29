import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as salesActions from "../../store/sales/salesActions";

import TopBar from "./TopBar";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import Loader from "../../components/Loader";
import DatePickerLists from "../../components/DatePickerLists";
import moment from "moment";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import SalesShowComp from "./SalesShowComp";
import ContributeSalesComp from "./ContributeSalesComp";

const ContributeSalesScreen = (props) => {
  const { sales } = useSelector((state) => state.sales);



  // ==========================================STATE MANAGEMENT==========================================
  const [startPeriod, setStartPeriod] = useState(null);
  const [endPeriod, setEndPeriod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [finalSales, setFinalSales] = useState([]);

  // ==========================================GETTING SALES======================================================

  const dispatch = useDispatch();
  useEffect(() => {
    // store start date and end date in local storage
    async () => {
      if (startPeriod !== "Invalid date" && endPeriod !== "Invalid date") {
        AsyncStorage.setItem("startDate", startPeriod);
        AsyncStorage.setItem("endDate", endPeriod);
      } else {
        const startDate = await AsyncStorage.getItem("startDate");
        const endDate = await AsyncStorage.getItem("endDate");

        setStartPeriod(startDate);
        setEndPeriod(endDate);
      }
    };
  }, [startPeriod, endPeriod]);

  useEffect(() => {
    dispatch(salesActions.getSales(startPeriod, endPeriod));
  }, [dispatch, startPeriod, endPeriod]);

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

  useEffect(() => {
    if (sales && sales.length > 0) {
      const finalSales = sales.filter((a) => a.isFinal === true);

      setFinalSales(finalSales);
    }
  }, [sales]);

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
          {finalSales && finalSales.length === 0 && (
            <View style={styles.container}>
              <Text style={styles.note}>
                It seems there is no Final Sales Version for the selected
                period.
              </Text>
              <Text style={styles.note}>Please select another period.</Text>
            </View>
          )}
          {finalSales && finalSales.length > 0 && (
            <ContributeSalesComp
              sales={finalSales}
              startDate={startPeriod}
              endDate={endPeriod}
            />
          )}
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
    height: globalHeight("80%"),
    justifyContent: "center",
    alignItems: "center",
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
  note: {
    textAlign: "center",
    fontSize: globalWidth("1.4%"),
    color: Colors.primary,
    marginTop: globalHeight("5%"),
    fontFamily: "Helvetica",
  },
});

export const ContributeSalesScreenOptions = (navData) => {
  return {
    headerTitle: "ContributeSalesScreen",
  };
};

export default ContributeSalesScreen;
