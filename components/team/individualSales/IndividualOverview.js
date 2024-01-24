import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import DateAndYearPicker from "../teamSales/DateAndYearPicker";

import * as salesActions from "../../../store/sales/salesActions";

import DropPicker from "../../DropPicker";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import Colors from "../../../constants/Colors";
import NativePicker from "../../NativePicker";
import { months } from "../../helpers/months";
import { years } from "../../helpers/years";
import Loader from "../../Loader";
import ShowSalesVersions from "../../sales/ShowSalesVersions";
import NativeContainer from "./NativeContainer";

// scenario: if the user is manager he should select which member he wants to see the data of
// if the user is a member he should see his own data
// use the same component for both scenarios which is in the same team overview screen

const IndividualOverview = (props) => {
  const { memberSales } = useSelector((state) => state.sales);

  const dispatch = useDispatch();

  // ===============================================SEARCH=====================================================

  const search = () => {
    setIsLoading(true);
    setLoadingMessage("Loading...");
    dispatch(
      salesActions.getSingleUserSales(
        selectedMember,
        months.findIndex((month) => month === selectedMonth) + 1,
        selectedYear
      )
    ).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  // ==============================================MANAGEMENT OF STATE====================================================
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [teamIsOpened, setTeamIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // ============================================RENDERING=====================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <NativeContainer
        getSelectedMember={(data) => setSelectedMember(data)}
        getSelectedMonth={(month) => setSelectedMonth(month)}
        getSelectedYear={(year) => setSelectedYear(year)}
        search={search}
      />
      {memberSales && memberSales.length > 0 && (
        <ShowSalesVersions
          salesVersions={memberSales}
          isOpened={isOpened}
          getIsLoading={(data) => setIsLoading(data)}
          getLoadingMessage={(message) => setLoadingMessage(message)}
          monthNumber={months.findIndex((month) => month === selectedMonth) + 1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
});

export const IndividualOverviewOptions = (navData) => {
  return {
    headerTitle: "IndividualOverview",
  };
};

export default IndividualOverview;
