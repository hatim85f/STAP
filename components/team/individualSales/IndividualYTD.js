import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as salesActions from "../../../store/sales/salesActions";
import NativeContainer from "./NativeContainer";
import Loader from "../../Loader";
import { months } from "../../helpers/months";
import YTDCharts from "../teamSales/YTDCharts";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import moment from "moment";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import * as XLSX from "sheetjs-style";
import Colors from "../../../constants/Colors";
import TableToShow from "../teamSales/TableToShow";
import ForecastCalculation from "../../ForecastCalculation";

const IndividualYTD = (props) => {
  const { individualYTD } = useSelector((state) => state.sales);

  // ====================================================MANAGING STATE====================================================

  const [firstMonth, setFirstMonth] = useState("");
  const [secondMonth, setSecondMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [productsSeries, setProductsSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [productsSales, setProductsSales] = useState([]);
  const [sheetDetails, setSheetDetails] = useState([]);
  const [tableIsOpened, setTableIsOpened] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [forecastIsOpened, setForecastIsOpened] = useState(false);
  const [calculations, setCalculations] = useState([]);

  const dispatch = useDispatch();

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

  // ==============================================USE EFFECTS=========================================================
  useEffect(() => {
    const currencySymbol =
      individualYTD &&
      individualYTD.length > 0 &&
      individualYTD[0].currencySymbol;
    setCurrencySymbol(currencySymbol);
    const sheetData = individualYTD.map((item) => {
      return {
        teamName: item.userName,
        salesData: item.product.map((x, i) => {
          return {
            sn: i + 1,
            itemName: x.productNickName,
            cif: item.currencySymbol + " " + x.price,
            targetU: x.totalTargetUnits,
            targetV: parseInt(x.totalTargetValue).toFixed(0),
            salesU: x.totalSalesUnits,
            salesV: x.totalSalesValue,
            ach: parseFloat(x.productAchievement).toFixed(2) + " " + "%",
          };
        }),
        totalTargetValue: item.totalTargetValue,
        totalSalesValue: item.totalSalesValue,
        totalAchievement:
          parseFloat(item.totalAchievement).toFixed(2) + " " + "%",
      };
    });

    setSheetDetails(sheetData);
  }, [individualYTD]);

  // ========================================================CALCULATIONS====================================================

  useEffect(() => {
    if (individualYTD.length > 0) {
      const calculations = individualYTD.map((item) => {
        return {
          businessId: item.businessId,
          businessLogo: item.profilePicture,
          businessName: item.userName,
          currencySymbol: item.currencySymbol,
          salesData: item.product.map((x) => {
            return {
              achievement: x.productAchievement,
              price: x.price,
              productId: x.userAchievement[0].productId,
              productNickName: x.productNickName,
              productImage: x.productImage,
              quantity: x.totalSalesUnits,
              salesValue: x.totalSalesValue,
              targetValue: x.totalTargetValue,
              targetUnits: x.totalTargetUnits,
            };
          }),
          totalAchievement: item.totalAchievement,
          totalSalesValue: item.totalSalesValue,
          totalTargetValue: item.totalTargetValue,
        };
      });

      setCalculations(calculations);
    }
  }, [individualYTD]);

  console.log(individualYTD);

  // ==============================================TOOLS DOWNLOAD===========================================

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
      `${individualYTD[0].firstMonth}_${individualYTD[0].lastMonth}_${individualYTD[0].year} ${individualYTD[0].userName}.xlsx`
    );
  };

  const search = () => {
    const firstMonthNumber = months.indexOf(firstMonth) + 1;
    const secondMonthNumber = months.indexOf(secondMonth) + 1;

    setisLoading(true);
    setLoadingMessage("Getting Member's Sales...");
    dispatch(
      salesActions.getIndividualYTD(
        selectedMember,
        firstMonthNumber,
        secondMonthNumber,
        selectedYear
      )
    ).then(() => {
      setisLoading(false);
      setLoadingMessage("");
    });
  };

  // ========================================================CALCULATIONS====================================================

  useEffect(() => {
    if (individualYTD && individualYTD) {
      const products = individualYTD[0]?.product;
      const userAch = products?.map((a) => a.userAchievement).flat(1);

      const salesValues = userAch?.reduce((acc, data) => {
        const found = acc.find((a) => a.month === data.month);

        if (!found) {
          acc.push({
            month: data.month,
            salesValues: data.salesValue,
            targetValues: data.targetValue,
          });
        } else {
          found.salesValues += data.salesValue;
          found.targetValues += data.targetValue;
        }

        return acc;
      }, []);

      const salesData = salesValues?.map((a) => a.salesValues);
      const targetData = salesValues?.map((a) => a.targetValues);

      console.log(salesData, "inside");
      setSalesData(salesData);
      setTargetData(targetData);
    }
  }, [individualYTD]);

  useEffect(() => {
    if (individualYTD && individualYTD.length > 0) {
      const products = individualYTD[0]?.product;
      const userAch = products?.map((a) => a.userAchievement).flat(1);

      if (userAch && userAch.length > 0) {
        const salesValues = userAch.reduce((acc, data) => {
          const found = acc.find((x) => x.productId === data.productId);

          if (!found) {
            acc.push({
              price: data.price,

              productId: data.productId,
              productImage: data.productImage,
              productNickName: data.productNickName,
              productSalesValue: data.salesValue,
              productTargetValue: data.targetValue,
              soldQuantity: data.soldQuantity,
            });
          } else {
            found.productSalesValue += data.salesValue;
            found.productTargetValue += data.targetValue;
            found.soldQuantity += data.soldQuantity;
            found.productAchievement = parseFloat(
              (found.productSalesValue / found.productTargetValue) * 100
            ).toFixed(2);
          }

          return acc;
        }, []);

        const productSeries = salesValues.map((a) => a.productSalesValue);

        const productLabels = salesValues.map((a) => a.productNickName);

        setProductsSeries(productSeries);
        setLabels(productLabels);

        setProductsSales(salesValues);
      }
    }
  }, [individualYTD]);

  console.log(individualYTD, "individualYTD");

  // ======================================================RETURING JSX ====================================================

  if (isLoading) {
    return <Loader cetner loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <NativeContainer
          getSelectedMonth={(month) => setFirstMonth(month)}
          getSelectedYear={(year) => setSelectedYear(year)}
          getSelectedMember={(member) => setSelectedMember(member)}
          secondMonthDate
          getSecondMonth={(month) => setSecondMonth(month)}
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
              onPress={
                !forecastIsOpened ? animateForecastIn : animateForecastOut
              }
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
      </View>
      {individualYTD && individualYTD.length > 0 && (
        <YTDCharts
          totalTeamsSales={individualYTD[0].totalSalesValue}
          totalTeamTarget={individualYTD[0].totalTargetValue}
          currencySymbol={individualYTD[0].currencySymbol}
          series={productsSeries}
          labels={labels}
          targetData={targetData}
          salesData={salesData}
          productsSales={productsSales}
          salesChartTitle={`${individualYTD[0].firstName}'s Sales ${individualYTD[0].firstMonth} - ${individualYTD[0].lastMonth} / ${individualYTD[0].year}`}
          targetChartTitle={`${individualYTD[0].firstName}'s Target  ${individualYTD[0].firstMonth} - ${individualYTD[0].lastMonth} / ${individualYTD[0].year}`}
          achievementChartTitle={`${individualYTD[0].firstName}'s Achievement ${individualYTD[0].firstMonth} - ${individualYTD[0].lastMonth} / ${individualYTD[0].year}`}
          individual
        />
      )}
      <Animated.View
        style={[
          styles.tableItemsContainer,
          tableBoxScaleAnimatedStyle,
          tableBoxOpacityAnimatedStyle,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.touch,
            { alignSelf: "flex-end", width: globalWidth("3%") },
          ]}
          onPress={tableIsOpened ? animteBoxOut : animteBoxIn}
        >
          <Feather name="eye" size={globalWidth("2.5%")} color="black" />
        </TouchableOpacity>
        <TableToShow data={sheetDetails} currencySymbol={currencySymbol} />
      </Animated.View>
      <Animated.View
        style={[
          styles.tableItemsContainer,
          forecastScaleAnimatedStyle,
          forecastOpacityAnimatedStyle,
        ]}
      >
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
        <ForecastCalculation salesDetails={calculations} />
      </Animated.View>
      <Animated.View
        style={[
          styles.tableItemsContainer,
          forecastScaleAnimatedStyle,
          forecastOpacityAnimatedStyle,
        ]}
      >
        <ForecastCalculation salesDetails={individualYTD} />
      </Animated.View>
      <View style={{ height: globalHeight("10%") }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: globalWidth("1%"),
    marginBottom: globalHeight("6%"),
  },
  downloadContainer: {
    curseoir: "pointer",
    width: globalWidth("3%"),
    alignItems: "flex-start",
  },
  downloadContainer: {
    position: "absolute",
    right: globalWidth("3%"),
    top: globalHeight("8%"),
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

export default IndividualYTD;
