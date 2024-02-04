import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import DropWithButton from "../../DropWithButton";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

import { months } from "../../helpers/months";
import { years } from "../../helpers/years";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";

import moment from "moment";

import * as XLSX from "sheetjs-style";

import * as salesAction from "../../../store/sales/salesActions";

import Colors from "../../../constants/Colors";
import Loader from "../../Loader";
import YTDCharts from "./YTDCharts";
import TableToShow from "./TableToShow";
import { Easing } from "react-native";
import ForecastCalculation from "../../ForecastCalculation";

const TeamYTD = (props) => {
  const { teamYTD, teamTarget, teamSales } = useSelector(
    (state) => state.sales
  );

  const dispatch = useDispatch();

  // =========================================MANAGING STATE====================================================

  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format("YYYY")
  );
  const [firstMonth, setFirstMonth] = useState(
    moment(new Date()).format("MMMM")
  );
  const [secondMonth, setSecondMonth] = useState(
    moment(new Date()).format("MMMM")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [totalTeamsSales, setTotalTeamsSales] = useState(null);
  const [totalTeamTarget, setTotalTeamTarget] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [productsSeries, setProductsSeries] = useState([]);
  const [productsLabels, setProductsLabels] = useState([]);
  const [productsSales, setProductsSales] = useState([]);
  const [teamData, setTeamData] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [sheetDetails, setSheetDetails] = useState([]);
  const [tableIsOpened, setTableIsOpened] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [calculations, setCalculations] = useState([]);
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

  // ==============================================SUBMIT SEARCH ===========================================

  const submit = () => {
    setIsLoading(true);
    setLoadingMessage("Loading...");
    dispatch(
      salesAction.getTeamYTD(
        months.findIndex((month) => month === firstMonth) + 1,
        months.findIndex((month) => month === secondMonth) + 1,
        selectedYear
      )
    ).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  // ===========================================GETTIN TEAM DATA===========================================

  useEffect(() => {
    if (teamYTD && teamYTD.length > 0) {
      const teamList = [
        {
          label: "All Businesses",
          value: "All Businesses",
        },
      ];

      const newTeam = teamYTD.map((a) => {
        return {
          label: a.businessName,
          value: a.businessId,
        };
      });

      const allName = teamList.concat(newTeam);
      setTeamData(allName);
    }
  }, [teamYTD]);

  useEffect(() => {
    if (selectedTeam === "All Businesses") {
      setSalesData(teamYTD);
      return;
    }

    if (selectedTeam) {
      const salesData = teamYTD.filter((a) => a.businessId === selectedTeam);
      setSalesData(salesData);
    } else {
      setSalesData(teamYTD);
    }
  }, [teamYTD, selectedTeam]);

  // ==============================================TOOLS DOWNLOAD===========================================

  useEffect(() => {
    const currencySymbol =
      salesData && salesData.length > 0 && salesData[0].currencySymbol;
    setCurrencySymbol(currencySymbol);

    const sheetData = teamYTD.map((item) => {
      return {
        teamName: item.businessName,
        salesData: item.products.map((x, i) => {
          return {
            sn: i + 1,
            itemName: x.productNickName,
            cif: item.currencySymbol + " " + x.price,
            targetU: x.productTargetUnits,
            targetV: x.productTargetValue,
            salesU: x.soldQuantity,
            salesV: x.productSalesValue,
            ach: parseFloat(x.productAchievement).toFixed(2) + " " + "%",
          };
        }),
        totalTargetValue: item.totalBusinessTargetValue,
        totalSalesValue: item.totalBusinessSalesValue,
        totalAchievement:
          parseFloat(item.businessAchievement).toFixed(2) + " " + "%",
      };
    });

    const totalTeamSales = teamYTD.map((a) => a.products).flat(1);
    const totalTeamSalesValues = teamYTD
      .map((a) => a.totalBusinessSalesValue)
      .flat(1);
    const totalTeamTargetValues = teamYTD
      .map((a) => a.totalBusinessTargetValue)
      .flat(1);

    const sumSales = totalTeamSalesValues.reduce((a, b) => a + b, 0);
    const sumTarget = totalTeamTargetValues.reduce((a, b) => a + b, 0);

    const totalTeam = {
      teamName: "Total",
      salesData: totalTeamSales.map((x, i) => {
        return {
          sn: i + 1,
          itemName: x.productNickName,
          cif: teamYTD[0].currencySymbol + " " + x.price,
          targetU: x.productTargetUnits,
          targetV: x.productTargetValue,
          salesU: x.soldQuantity,
          salesV: x.productSalesValue,
          ach: parseFloat(x.productAchievement).toFixed(2) + " " + "%",
        };
      }),
      totalTargetValue: sumTarget,
      totalSalesValue: sumSales,
      totalAchievement:
        parseFloat((sumSales / sumTarget) * 100).toFixed(2) + " " + "%",
    };

    sheetData.push(totalTeam);

    setSheetDetails(sheetData);
  }, [salesData]);

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
      `${firstMonth}_${secondMonth}_${selectedYear} Team Sales YTD.xlsx`
    );
  };

  // =============================================MAKING CALCULATIONS===========================================

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      const totalBusinessSalesValue = salesData.map(
        (a) => a.totalBusinessSalesValue
      );
      const totalSales = totalBusinessSalesValue.reduce((a, b) => a + b, 0);

      const totalBusinessTargetValue = salesData.map(
        (a) => a.totalBusinessTargetValue
      );
      const totalTarget = totalBusinessTargetValue.reduce((a, b) => a + b, 0);

      setTotalTeamTarget(totalTarget);
      setTotalTeamsSales(totalSales);
    }
  }, [salesData]);

  useEffect(() => {
    if (salesData && salesData.length > 0) {
      const productsSales = salesData.map((a) => a.products).flat(1);

      const productsValues = productsSales.map(
        (a) => +parseInt(a.productSalesValue).toFixed(2)
      );

      const labels = productsSales.map((a) => a.productNickName);

      setProductsLabels(labels);
      setProductsSeries(productsValues);
    }
  }, [salesData]);

  useEffect(() => {
    const teamProducts = salesData.map((a) => a.products).flat(1);
    setProductsSales(teamProducts);
  }, [salesData]);

  // ================================================CALCULATING DATA FOR CALCULATOR==============================

  useEffect(() => {
    if (teamYTD.length > 0) {
      const calculations = teamYTD.map((item, index) => {
        return {
          businessId: item.businessId,
          businessLogo: item.businessLogo,
          businessName: item.businessName,
          currencySymbol: item.currencySymbol,
          salesData: item.products.map((x) => {
            return {
              achievement: x.productAchievement,
              price: x.price,
              product: x.productId,
              productImage: x.productImage,
              productNickName: x.productNickName,
              quantity: x.soldQuantity,
              salesValue: x.productSalesValue,
              targetUnits: x.productTargetUnits,
              targetValue: x.productTargetValue,
            };
          }),
          totalAchievement: item.businessAchievement,
          totalSalesValue: item.totalBusinessSalesValue,
          totalTargetValue: item.totalBusinessTargetValue,
        };
      });

      setCalculations(calculations);
    }
  }, [teamYTD]);

  console.log(teamYTD, "teamYTD");

  // ==============================================RETURNED JSX ===========================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <View style={styles.pickersRow}>
          <DropWithButton
            list={months.map((a) => {
              return {
                label: a,
                value: a,
              };
            })}
            buttonTitle={"Select First Month"}
            getSelection={(data) => setFirstMonth(data)}
            width={globalWidth("8%")}
            margin={globalWidth("0.1%")}
            isOpened={(data) => setIsOpened(data)}
          />
          <DropWithButton
            list={months.map((a) => {
              return {
                label: a,
                value: a,
              };
            })}
            buttonTitle={"Select Second Month"}
            getSelection={(data) => setSecondMonth(data)}
            width={globalWidth("8%")}
            margin={globalWidth("0.1%")}
            isOpened={(data) => setIsOpened(data)}
          />
          <DropWithButton
            list={years}
            buttonTitle={"Select Year"}
            getSelection={(data) => setSelectedYear(data)}
            width={globalWidth("8%")}
            margin={globalWidth("0.1%")}
            isOpened={(data) => setIsOpened(data)}
          />
          <Button
            title="Submit"
            onPress={submit}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
          {salesData && salesData.length > 0 && (
            <DropWithButton
              list={teamData}
              buttonTitle={"Select Business"}
              getSelection={(data) => setSelectedTeam(data)}
              width={globalWidth("8%")}
              margin={globalWidth("0.1%")}
              isOpened={(data) => setIsOpened(data)}
            />
          )}
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
      {salesData && salesData.length > 0 && !isOpened && (
        <YTDCharts
          totalTeamsSales={totalTeamsSales}
          totalTeamTarget={totalTeamTarget}
          currencySymbol={salesData[0].currencySymbol}
          series={productsSeries}
          labels={productsLabels}
          targetData={teamTarget.map((a) => a.totalTargetValue)}
          salesData={teamSales.map((a) => a.salesValues)}
          productsSales={productsSales}
        />
      )}
      <View style={{ height: globalHeight("10%") }} />
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
            {
              width: globalWidth("3%"),
              justifyContent: "flex-start",
              alignSelf: "flex-end",
            },
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pickersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: globalWidth("45%"),
    paddingHorizontal: globalWidth("0.5%"),
  },
  buttonStyle: {
    width: globalWidth("8%"),
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  titleStyle: {
    fontSize: globalWidth("0.9%"),
    fontWeight: "bold",
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: globalWidth("1%"),
  },
  downloadContainer: {
    curseoir: "pointer",
    width: globalWidth("3%"),
    alignItems: "flex-start",
  },
  downloadContainer: {
    position: "absolute",
    right: globalWidth("3%"),
    top: globalHeight("0.25%"),
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

export const TeamYTDOptions = (navData) => {
  return {
    headerTitle: "TeamYTD",
  };
};

export default TeamYTD;
