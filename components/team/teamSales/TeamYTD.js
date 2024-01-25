import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import DropWithButton from "../../DropWithButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { months } from "../../helpers/months";
import { years } from "../../helpers/years";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";

import moment from "moment";

import * as salesAction from "../../../store/sales/salesActions";

import Colors from "../../../constants/Colors";
import Loader from "../../Loader";
import YTDCharts from "./YTDCharts";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const download = () => {};

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
});

export const TeamYTDOptions = (navData) => {
  return {
    headerTitle: "TeamYTD",
  };
};

export default TeamYTD;
