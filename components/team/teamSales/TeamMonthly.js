import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import * as XLSX from "sheetjs-style";

import { years } from "../../helpers/years";
import { months } from "../../helpers/months";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";

import Loader from "../../Loader";
import Colors from "../../../constants/Colors";
import AchievementChart from "../AchievementChart";
import DropWithButton from "../../DropWithButton";

import * as salesActions from "../../../store/sales/salesActions";
import TableToShow from "./TableToShow";
import ForecastCalculation from "../../ForecastCalculation";

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
  const [sheetDetails, setSheetDetails] = useState([]);
  const [tableIsOpened, setTableIsOpened] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [forecastIsOpened, setForecastIsOpened] = useState(false);

  // ===========================================ANIMATING TABLE BOX IN AND OUT =========================================

  const tableBoxScale = useRef(new Animated.Value(0)).current;
  const forecastScale = useRef(new Animated.Value(0)).current;

  // interpolate the scale
  const tableBoxScaleInterpolate = tableBoxScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // interpolate forecast view scale
  const forecastScaleInterpolate = forecastScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // animate the scale
  const tableBoxScaleAnimatedStyle = {
    transform: [{ scale: tableBoxScaleInterpolate }],
  };

  // animate forecast view scale
  const forecastScaleAnimatedStyle = {
    transform: [{ scale: forecastScaleInterpolate }],
  };

  // animate the opacity
  const tableBoxOpacityAnimatedStyle = {
    opacity: tableBoxScaleInterpolate,
  };

  // animate forecast view opacity
  const forecastOpacityAnimatedStyle = {
    opacity: forecastScaleInterpolate,
  };

  const animteBoxIn = () => {
    Animated.timing(tableBoxScale, {
      toValue: 1,
      duration: 800,
      easing: Easing.elastic(1.5),
      useNativeDriver: false,
    }).start();
    setTableIsOpened(true);
  };

  const animteBoxOut = () => {
    Animated.timing(tableBoxScale, {
      toValue: 0,
      duration: 800,
      easing: Easing.elastic(1),
      useNativeDriver: false,
    }).start();
    setTableIsOpened(false);
  };

  const animateForecastIn = () => {
    console.log("animated in");
    Animated.timing(forecastScale, {
      toValue: 1,
      duration: 800,
      easing: Easing.elastic(1.5),
      useNativeDriver: false,
    }).start();

    setForecastIsOpened(true);
  };

  const animateForecastOut = () => {
    Animated.timing(forecastScale, {
      toValue: 0,
      duration: 800,
      easing: Easing.elastic(1),
      useNativeDriver: false,
    }).start();

    setForecastIsOpened(false);
  };

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

  // ==============================================TOOLS DOWNLOAD===========================================

  useEffect(() => {
    const currencySymbol =
      fullTeamAch && fullTeamAch.length > 0 && fullTeamAch[0].currencySymbol;

    setCurrencySymbol(currencySymbol);

    const sheetData = fullTeamAch.map((item, index) => {
      return {
        teamName: item.businessName,
        salesData: item.salesData.map((x, i) => {
          return {
            sn: i + 1,
            itemName: x.productNickName,
            cif: item.currencySymbol + " " + x.price,
            targetU: x.targetUnits,
            targetV: x.targetValue,
            salesU: x.quantity,
            salesV: x.salesValue,
            ach: parseFloat(x.achievement).toFixed(2) + " " + "%",
          };
        }),
        totalTargetValue: item.totalTargetValue,
        totalSalesValue: item.totalSalesValue,
        totalAchievement:
          parseFloat(item.totalAchievement).toFixed(2) + " " + "%",
      };
    });

    const totalTeamSales = fullTeamAch.map((a) => a.salesData).flat(1);
    const totalTeamSalesValues = fullTeamAch
      .map((a) => a.totalSalesValue)
      .flat(1);
    const totalTeamTargetValues = fullTeamAch
      .map((a) => a.totalTargetValue)
      .flat(1);

    const sumSales = totalTeamSalesValues.reduce((a, b) => a + b, 0);
    const sumTarget = totalTeamTargetValues.reduce((a, b) => a + b, 0);

    const totalTeam = {
      teamName: "Total",
      salesData: totalTeamSales.map((x, i) => {
        return {
          sn: i + 1,
          itemName: x.productNickName,
          cif: fullTeamAch[0].currencySymbol + " " + x.price,
          targetU: x.targetUnits,
          targetV: x.targetValue,
          salesU: x.quantity,
          salesV: x.salesValue,
          ach: parseFloat(x.achievement).toFixed(2) + " " + "%",
        };
      }),
      totalTargetValue: sumTarget,
      totalSalesValue: sumSales,
      totalAchievement:
        parseFloat((sumSales / sumTarget) * 100).toFixed(2) + " " + "%",
    };

    sheetData.push(totalTeam);

    setSheetDetails(sheetData);
  }, [fullTeamAch]);

  const download = () => {
    const header = [
      "SN",
      "Item Name",
      "CIF",
      "Target U",
      "Target  V",
      "Sales U",
      "Sales V",
      "Ach %",
    ];

    const workbook = XLSX.utils.book_new();

    sheetDetails.forEach((team, index) => {
      const sheetName = team.teamName;
      const salesData = team.salesData;

      // Add "Total" row
      const totalRow = [
        "Total",
        "",
        "",
        "",
        team.totalTargetValue,
        "",
        team.totalSalesValue,
        team.totalAchievement,
      ];

      const sheetDetails = [
        header,
        ...salesData.map((x) => Object.values(x)),
        totalRow,
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(sheetDetails);

      const defaultWidth = 140;
      const columnWidths = header.map(() => ({ wpx: defaultWidth }));

      worksheet["!cols"] = columnWidths;

      const style = {
        font: { name: "Bodoni MT Black", sz: 12 },
        alignment: { horizontal: "center" },
        fill: { fgColor: { rgb: "87CEEB" } }, // Sky Blue background color
      };

      const dataStyle = {
        font: { name: "Arial", sz: 10 },
        alignment: { horizontal: "center" },
      };

      header.forEach((headerItem, index) => {
        const cellRef = XLSX.utils.encode_cell({ c: index, r: 0 }); // r: 0 means first row
        worksheet[cellRef].s = style;
      });

      salesData.forEach((dataItem, rowIndex) => {
        Object.keys(dataItem).forEach((key, colIndex) => {
          const cellRef = XLSX.utils.encode_cell({
            c: colIndex,
            r: 0,
          });
          worksheet[cellRef].s = style;
        });
      });

      salesData.forEach((dataItem, rowIndex) => {
        Object.keys(dataItem).forEach((key, colIndex) => {
          const cellRef = XLSX.utils.encode_cell({
            c: colIndex,
            r: rowIndex + 1,
          }); // r: 0 means first row
          worksheet[cellRef].s = dataStyle;
        });
      });

      // Add style for "Total" row
      totalRow.forEach((item, colIndex) => {
        const cellRef = XLSX.utils.encode_cell({
          c: colIndex,
          r: salesData.length + 1,
        });
        worksheet[cellRef].s = style;
      });

      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });
    // Add the worksheet to the workbook

    XLSX.writeFile(
      workbook,
      `${selectedMonth}_${selectedYear} Team Sales.xlsx`
    );
  };

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
      </View>
      <View
        style={[
          styles.downloadContainer,
          {
            width: tableIsOpened ? globalWidth("3.5%") : globalWidth("10%"),
          },
        ]}
      >
        {(!tableIsOpened || forecastIsOpened) && (
          <TouchableOpacity
            onPress={!forecastIsOpened ? animateForecastIn : animateForecastOut}
            style={styles.touch}
          >
            <Ionicons
              name="calculator"
              size={globalWidth("2.5%")}
              color="black"
            />
          </TouchableOpacity>
        )}
        {!forecastIsOpened && (
          <TouchableOpacity
            style={styles.touch}
            onPress={tableIsOpened ? animteBoxOut : animteBoxIn}
          >
            <Feather name="eye" size={globalWidth("2.5%")} color="black" />
          </TouchableOpacity>
        )}
        {!tableIsOpened && !forecastIsOpened && (
          <TouchableOpacity style={styles.touch} onPress={download}>
            <MaterialCommunityIcons
              name="file-excel"
              size={globalWidth("2.5%")}
              color="#008000"
            />
          </TouchableOpacity>
        )}
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
      <Animated.View
        style={[
          styles.tableItemsContainer,
          tableBoxScaleAnimatedStyle,
          tableBoxOpacityAnimatedStyle,
        ]}
      >
        <TableToShow data={sheetDetails} currencySymbol={currencySymbol} />
      </Animated.View>
      <Animated.View
        style={[
          styles.tableItemsContainer,
          forecastScaleAnimatedStyle,
          forecastOpacityAnimatedStyle,
        ]}
      >
        <ForecastCalculation salesDetails={fullTeamAch} />
      </Animated.View>
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
  downloadContainer: {
    position: "absolute",
    right: globalWidth("3%"),
    top: globalHeight("1%"),
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableItemsContainer: {
    flex: 1,
    position: "absolute",
    height: globalHeight("72%"),
    width: globalWidth("75%"),
    alignSelf: "center",
    marginTop: 'globalHeight("10%")',
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: "hidden",
    padding: globalHeight("1%"),
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10,
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
