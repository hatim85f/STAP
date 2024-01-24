import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import DateAndYearPicker from "./DateAndYearPicker";
import numberWithCommas from "../../helpers/numberWithComa";
import ItemSalesDetails from "./ItemSalesDetails";
import Loader from "../../Loader";

import * as authActions from "../../../store/auth/authActions";
import * as salesActions from "../../../store/sales/salesActions";

import { months } from "../../helpers/months";
import Colors from "../../../constants/Colors";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";

import moment from "moment";
import ShowSalesVersions from "../../sales/ShowSalesVersions";

// import { salesVersions } from "./draft";

const TeamOverview = (props) => {
  const { fullTeamAch } = useSelector((state) => state.team);
  const { salesVersions } = useSelector((state) => state.sales);

  const [selectedMonth, setSelectedMonth] = useState(
    moment(new Date()).format("MMMM")
  );
  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format("YYYY")
  );
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth() + 1);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const dispatch = useDispatch();

  // ==================================================GETTING USER BACK=====================================================
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");
        }

        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  // ====================================================GETTING SALES DETAILS==================================================

  useEffect(() => {
    if (selectedMonth) {
      setMonthNumber(months.indexOf(selectedMonth) + 1);
    }
  }, [selectedMonth, isOpened, selectedYear]);

  useEffect(() => {
    if (monthNumber && selectedYear) {
      setIsLoading(true);
      setLoadingMessage("Fetching Sales Details");
      dispatch(salesActions.getSalesVersions(monthNumber, selectedYear)).then(
        () => {
          setIsLoading(false);
        }
      );
    }
  }, [dispatch, monthNumber, selectedYear]);

  // ========================================================CHANGE IS FINAL===================================================

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

  // ======================================================RETURN JSX=========================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <DateAndYearPicker
        getMonth={(month) => changeMonth(month)}
        getYear={(year) => changeYear(year)}
        getIsOpened={(opened) => setIsOpened(opened)}
        month={selectedMonth}
        year={selectedYear}
      />

      {!isOpened && salesVersions && salesVersions.length > 0 && (
        <ShowSalesVersions
          salesVersions={salesVersions}
          isOpened={isOpened}
          getIsLoading={(data) => setIsLoading(data)}
          getLoadingMessage={(message) => setLoadingMessage(message)}
          monthNumber={months.findIndex((month) => month === selectedMonth) + 1}
          showCheckTotal
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dataMainContainer: {
    flex: 1,
    width: "98%",
    borderColor: Colors.haizyColor,
    borderWidth: 2.5,
    borderRadius: 10,
    padding: globalHeight("1%"),
    marginBottom: globalHeight("1%"),
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 10,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "98%",
    alignSelf: "center",
    // padding: globalHeight("1%"),
    backgroundColor: Colors.haizyColor,
    borderRadius: 10,
    marginTop: globalHeight("1%"),
    // paddingHorizontal: globalWidth("2%"),
    borderColor: Colors.font,
    borderWidth: 1,
    marginBottom: globalHeight("1%"),
  },
  versionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // paddingHorizontal: globalWidth("2%"),
  },
  businessLogo: {
    width: globalHeight("5%"),
    height: globalHeight("5%"),
    borderRadius: globalHeight("2.5%"),
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  businessName: {
    fontFamily: "robotoRegular",
    fontSize: globalHeight("2.5%"),
    color: Colors.font,
    textAlign: "center",
    marginTop: globalHeight("1%"),
    fontStyle: "italic",
  },
  versionName: {
    fontFamily: "HappyMonkey-Regular",
    fontSize: globalHeight("2.2%"),
    color: Colors.font,
    textAlign: "center",
    marginTop: globalHeight("1%"),
    fontStyle: "italic",
  },
  data: {
    fontFamily: "robotoRegular",
    fontSize: globalHeight("2%"),
    color: Colors.font,
    textAlign: "center",
    marginTop: globalHeight("1%"),
  },
  date: {
    color: Colors.primary,
  },
  userImage: {
    width: globalHeight("4.5%"),
    height: globalHeight("4.5%"),
    borderRadius: globalHeight("2.25%"),
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  addedBy: {
    fontFamily: "HappyMonkey-Regular",
    fontSize: globalHeight("1.8%"),
    color: Colors.font,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: globalHeight("1%"),
    marginLeft: globalWidth("1%"),
  },
  lowerDataContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginTop: globalHeight("1%"),
    borderColor: Colors.font,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingVertical: globalHeight("1%"),
  },
  header: {
    fontFamily: "HappyMonkey-Regular",
    fontSize: globalHeight("2.2%"),
    color: Colors.font,
    textAlign: "center",
    marginTop: globalHeight("1%"),
    fontStyle: "italic",
  },
  lowerSmallRow: {
    flexDirection: "row",
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: globalHeight("1%"),
  },
});

export default TeamOverview;
