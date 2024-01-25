import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as salesActions from "../../../store/sales/salesActions";
import NativeContainer from "./NativeContainer";
import Loader from "../../Loader";
import { months } from "../../helpers/months";
import YTDCharts from "../teamSales/YTDCharts";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  const dispatch = useDispatch();

  // ======================================================GETTING DATA===================================================

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

      setSalesData(salesData);
      setTargetData(targetData);
    }
  }, [individualYTD]);

  const firstMonthDate = window.localStorage.getItem("month");
  const secondMonthDate = window.localStorage.getItem("secondMonth");
  const year = window.localStorage.getItem("year");

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

  // ==============================================TOOLS DOWNLOAD===========================================

  const download = () => {};

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
        <View style={styles.toolsRow}>
          <TouchableOpacity onPress={download} style={styles.downloadContainer}>
            <MaterialCommunityIcons
              name="file-excel"
              size={globalWidth("2.5%")}
              color="#008000"
            />
          </TouchableOpacity>
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
  },
  downloadContainer: {
    curseoir: "pointer",
    width: globalWidth("3%"),
    alignItems: "flex-start",
  },
});

export default IndividualYTD;
