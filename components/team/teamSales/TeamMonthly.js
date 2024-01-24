import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import DateAndYearPicker from "./DateAndYearPicker";

import * as salesActions from "../../../store/sales/salesActions";
import { months } from "../../helpers/months";
import Loader from "../../Loader";
import moment from "moment";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
// import AchivementChart from "../AchievementChart";
import Colors from "../../../constants/Colors";
import SalesCharts from "../SalesCharts";
import AchievementChart from "../AchievementChart";
import DropWithButton from "../../DropWithButton";
import { years } from "../../helpers/years";

const TeamMonthly = (props) => {
  const { fullTeamAch } = useSelector((state) => state.sales);

  const [selectedMonth, setSelectedMonth] = useState(
    moment(new Date()).format("MMMM")
  );
  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format("YYYY")
  );
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);

  // ====================================CHANGING DATES===============================================================
  const changeMonth = (month) => {
    if (!month) {
      return;
    } else {
      window.localStorage.setItem("selectedMonth", month);
      setSelectedMonth(month);
    }
  };

  const changeYear = (year) => {
    if (!year) {
      return;
    } else {
      window.localStorage.setItem("selectedYear", year);
      setSelectedYear(year);
    }
  };

  // ===============================================GETTING TEAM SALES=====================================================

  const dispatch = useDispatch();

  useEffect(() => {
    const monthNumber = months.indexOf(selectedMonth) + 1;
    setIsLoading(true);
    setLoadingMessage("Getting Team Sales");
    dispatch(
      salesActions.getFullTeamAchievement(monthNumber, selectedYear)
    ).then(() => {
      setIsLoading(false);
    });
  }, [selectedMonth, selectedYear]);

  const secondColor = (achievement) => {
    if (achievement <= 30) {
      return "#FF0055";
    } else if (achievement <= 50 && achievement > 30) {
      return "#AB7E02";
    } else if (achievement > 50 && achievement <= 75) {
      return "#03FCDF";
    } else {
      return Colors.primary;
    }
  };

  console.log(selectedMonth, selectedYear);

  // ========================================================RENDERING JSX====================================================

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} cneter />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.mainRow,
          {
            width: globalWidth("22%"),
            marginBottom: globalHeight("6%"),
            alignItems: "flex-start",
          },
        ]}
      >
        <DropWithButton
          list={months.map((a) => {
            return {
              label: a,
              value: a,
            };
          })}
          buttonTitle={"Select Second Month"}
          getSelection={(data) => changeMonth(data)}
          width={globalWidth("10%")}
          margin={globalWidth("0.1%")}
          isOpened={(data) => setIsOpened(data)}
        />
        <DropWithButton
          list={years}
          buttonTitle={"Select Year"}
          getSelection={(data) => changeYear(data)}
          width={globalWidth("10%")}
          margin={globalWidth("0.1%")}
          isOpened={(data) => setIsOpened(data)}
        />
        {/* <DateAndYearPicker
          getMonth={(month) => changeMonth(month)}
          getYear={(year) => changeYear(year)}
          getIsOpened={(opened) => setIsOpened(opened)}
          month={selectedMonth}
          year={selectedYear}
        /> */}
      </View>
      {fullTeamAch && fullTeamAch.length > 0 && !isOpened && (
        <ScrollView
          contentContainerStyle={styles.itemsContainer}
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainRow}>
            {fullTeamAch.map((item, index) => {
              return (
                <View style={styles.achContainer} key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentIndex(currentIndex === index ? null : index)
                    }
                  >
                    <AchievementChart
                      details={[
                        `${parseInt(item.totalSalesValue).toFixed(2)}`,
                        `${parseInt(item.totalTargetValue).toFixed(2)}`,
                      ]}
                      name={item.businessName}
                      yaxisName="Value $"
                      xaxisName=""
                      image={item.businessLogo}
                      totalSales={item.totalSalesValue}
                      totalTarget={item.totalTargetValue}
                      achievement={item.totalAchievement}
                      secondColor={() => secondColor(item.totalAchievement)}
                      currencySymbol={item.currencySymbol}
                      height={globalHeight("35%")}
                      width={globalWidth("20%")}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View style={styles.smallRow}>
            {currentIndex !== null &&
              fullTeamAch[currentIndex].salesData.map((item, index) => {
                return (
                  <View style={styles.smallAchContainer} key={index}>
                    <AchievementChart
                      details={[
                        `${parseInt(parseInt(item.salesValue)).toFixed(2)}`,
                        `${parseInt(item.targetValue).toFixed(2)}`,
                      ]}
                      name={item.productNickName}
                      yaxisName="Value $"
                      xaxisName=""
                      image={item.productImage}
                      totalSales={parseInt(item.salesValue)}
                      totalTarget={parseInt(item.targetValue)}
                      achievement={item.achievement}
                      secondColor={() => secondColor(item.achievement)}
                      currencySymbol={item.currencySymbol}
                      height={globalHeight("30%")}
                      width={globalWidth("12%")}
                      smallImage
                    />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      )}
      {/* {currentIndex !== null && (
        <SalesCharts salesData={fullTeamAch[currentIndex].salesData} />
      )} */}
      <View style={{ height: globalHeight("10%") }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemsContainer: {
    flex: 1,
  },
  achContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  smallRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    height: "100%",
    marginTop: globalWidth("40%"),
    paddingHorizontal: globalWidth("2%"),
  },
  smallAchContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: globalHeight("1%"),
    width: globalWidth("16%"),
    height: globalHeight("55%"),
    padding: globalHeight("1%"),
  },
});

export const TeamMonthlyOptions = (navData) => {
  return {
    headerTitle: "TeamMonthly",
  };
};

export default TeamMonthly;

// {currentIndex !== null && (
//   <SalesCharts salesData={fullTeamAch[currentIndex].salesData} />
// )}
