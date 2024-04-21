import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import * as XLSX from "sheetjs-style";

import Loader from "../../Loader";
import Colors from "../../../constants/Colors";

import { globalHeight, globalWidth } from "../../../constants/globalWidth";

import * as salesActions from "../../../store/sales/salesActions";

import moment from "moment";

import NativeContainer from "./NativeContainer";
import AchievementChart from "../AchievementChart";
import TableToShow from "../teamSales/TableToShow";
import { Easing } from "react-native";
import ForecastCalculation from "../../ForecastCalculation";

const IndividualMonthly = (props) => {
  const { memberAchievement } = useSelector((state) => state.sales);

  // ==============================================MANAGEMENT OF STATE====================================================

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format("YYYY")
  );
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

  // ==========================================================GETTING DATA===============================================

  const dispatch = useDispatch();

  const search = () => {
    setIsLoading(true);
    setLoadingMessage("Getting Member's Sales...");
    dispatch(
      salesActions.getMemberAchievement(
        selectedMember,
        monthNumber,
        selectedYear
      )
    ).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  // ==============================================TOOLS DOWNLOAD===========================================

  useEffect(() => {
    const currencySymbol =
      memberAchievement &&
      memberAchievement.length > 0 &&
      memberAchievement[0].currencySymbol;
    setCurrencySymbol(currencySymbol);

    const sheetData = memberAchievement.map((item, index) => {
      return {
        teamName: item.userName,
        salesData: item.salesData.map((x, i) => {
          return {
            sn: i + 1,
            itemName: x.productNickName,
            cif: item.currencySymbol + " " + x.price,
            targetU: x.targetUnits,
            targetV: x.targetValue,
            salesU: x.salesUnits,
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

    setSheetDetails(sheetData);
  }, [memberAchievement]);

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
      `${memberAchievement[0].month}_${memberAchievement[0].year} ${memberAchievement[0].userName}.xlsx`
    );
  };

  // ==========================================================HELPER FUNCTIONS===============================================

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

  console.log(memberAchievement);

  // =========================================================RETURN JSX=============================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <NativeContainer
        getSelectedMonth={(month) => setSelectedMonth(month)}
        getSelectedYear={(year) => setSelectedYear(year)}
        getSelectedMember={(member) => setSelectedMember(member)}
        search={search}
      />
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
      {memberAchievement && memberAchievement.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.itemsContainer}
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainRow}>
            {memberAchievement.map((item, index) => {
              return (
                <View style={styles.achContainer} key={index}>
                  <AchievementChart
                    details={[
                      `${parseInt(item.totalSalesValue).toFixed(2)}`,
                      `${parseInt(item.totalTargetValue).toFixed(2)}`,
                    ]}
                    name={item.userName}
                    yaxisName="Value $"
                    xaxisName=""
                    image={item.profilePicture}
                    totalSales={item.totalSalesValue}
                    totalTarget={item.totalTargetValue}
                    achievement={item.totalAchievement}
                    secondColor={() => secondColor(item.totalAchievement)}
                    currencySymbol={item.currencySymbol}
                    height={globalHeight("35%")}
                    width={globalWidth("20%")}
                    secondLine={`${item.designation} - ${item.businessName}`}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.smallRow}>
            {memberAchievement &&
              memberAchievement.length > 0 &&
              memberAchievement[0].salesData.map((product, indx) => {
                return (
                  <View style={styles.smallAchContainer} key={indx}>
                    <AchievementChart
                      details={[
                        `${parseInt(parseInt(product.salesValue)).toFixed(2)}`,
                        `${parseInt(product.targetValue).toFixed(2)}`,
                      ]}
                      name={product.productNickName}
                      yaxisName="Value $"
                      xaxisName=""
                      image={product.productImage}
                      totalSales={parseInt(product.salesValue)}
                      totalTarget={parseInt(product.targetValue)}
                      achievement={product.achievement}
                      secondColor={() => secondColor(product.achievement)}
                      currencySymbol={product.currencySymbol}
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
        <ForecastCalculation salesDetails={memberAchievement} />
      </Animated.View>
      <View style={{ height: globalHeight("10%") }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  teamRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  teamContainer: {
    width: "20%",
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    marginVertical: globalHeight("1%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: globalWidth("3%"),
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: globalWidth("2%"),
  },
  image: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    borderRadius: globalWidth("2.5%"),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  nameContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1.25%"),
    color: Colors.font,
    fontStyle: "italic",
    textAlign: "center",
  },
  designation: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1%"),
    color: Colors.primary,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: globalHeight("0.5%"),
  },
  itemsContainer: {
    flex: 1,
    marginTop: globalHeight("3%"),
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

export default IndividualMonthly;
