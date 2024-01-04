import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import DateAndYearPicker from "./DateAndYearPicker";
import numberWithCommas from "../../helpers/numberWithComa";
import ItemSalesDetails from "./ItemSalesDetails";
import Loader from "../../Loader";

import * as authActions from "../../../store/auth/authActions";
import * as salesActions from "../../../store/sales/salesActions";

import { months } from "../../helpers/months";
import Colors from "../../../constants/Colors";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";

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
  const [neededYear, setNeededYear] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);

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

    if (!isOpened) {
      setNeededYear(selectedYear);
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

  const changeIsFinal = (items) => {
    const userSalesIds = items.map((item) => item.userSalesId);
    const userIds = items.map((item) => item.userId);

    const year = window.localStorage.getItem("selectedYear");

    setIsLoading(true);
    setLoadingMessage("Updating Sales Versions");
    dispatch(salesActions.changeIsFinal(userSalesIds, userIds));
    dispatch(salesActions.getSalesVersions(monthNumber, year)).then(() => {
      setIsLoading(false);
    });
  };

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

  // =======================================================RETURNING ACHIEVEMENT ARROW =======================================

  const AchievementArrow = ({ achievement }) => {
    if (achievement >= 85) {
      return <Entypo name="arrow-up" size={globalHeight("3%")} color="green" />;
    } else if (achievement >= 50) {
      return (
        <Entypo name="arrow-up" size={globalHeight("3%")} color="orange" />
      );
    } else if (achievement >= 25) {
      return (
        <Entypo name="arrow-down" size={globalHeight("3%")} color="#999900" />
      );
    } else {
      return <Entypo name="arrow-down" size={globalHeight("3%")} color="red" />;
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
        <View style={styles.headerContainer}>
          <View style={{ width: "5%" }}>
            <Text style={styles.header}>SN</Text>
          </View>
          <View
            style={{
              width: "40%",
              alignItems: "flex-start",
              paddingLeft: "2%",
            }}
          >
            <Text style={styles.versionName}>Version Name</Text>
          </View>
          <View
            style={{
              width: "20%",
              alignItems: "flex-start",
              paddingLeft: "1.5%",
            }}
          >
            <Text style={styles.header}>Business</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.header}>Sales</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.header}>Target</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.header}>Achievement</Text>
          </View>
        </View>
      )}
      {salesVersions && salesVersions.length > 0 && !isOpened && (
        <FlatList
          data={salesVersions}
          keyExtractor={(item) => item._id}
          style={{
            flex: 1,
          }}
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[styles.dataMainContainer]}
                onPress={() => changeIsFinal(item.sales)}
              >
                <View style={styles.versionContainer}>
                  <View style={{ width: "5%" }}>
                    <Text style={styles.versionName}> {index + 1}) </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setCurrentIndex(index === currentIndex ? null : index)
                    }
                    style={{
                      width: "40%",
                      alignItems: "flex-start",
                      paddingLeft: "1.5%",
                    }}
                  >
                    <Text style={styles.versionName}> {item.versionName} </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: "20%",
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <Image
                      source={{ uri: item.businessLogo }}
                      style={styles.businessLogo}
                    />
                    <Text style={styles.header}> {item.businessName} </Text>
                  </View>
                  <View style={{ width: "10%" }}>
                    <Text style={styles.data}>
                      {" "}
                      {item.currencySymbol}{" "}
                      {numberWithCommas(item.totalSalesValue.toFixed(0))}{" "}
                    </Text>
                  </View>
                  <View style={{ width: "10%" }}>
                    <Text style={styles.data}>
                      {item.currencySymbol}{" "}
                      {numberWithCommas(item.totalTargetValue)}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "15%",
                      justifyContent: "center",
                    }}
                  >
                    <AchievementArrow achievement={item.totalAchievement} />
                    <Text
                      style={[
                        styles.data,
                        {
                          color:
                            item.totalAchievement >= 85
                              ? "green"
                              : item.totalAchievement >= 50
                              ? "orange"
                              : item.totalAchievement >= 25
                              ? "#999900"
                              : "red",
                        },
                      ]}
                    >
                      {" "}
                      {item.totalAchievement.toFixed(2)} %{" "}
                    </Text>
                  </View>
                </View>
                <View style={styles.lowerDataContainer}>
                  <View style={styles.lowerSmallRow}>
                    <Image
                      source={{ uri: item.addedByProfilePicture }}
                      style={styles.userImage}
                    />
                    <Text style={styles.addedBy}>
                      Added By:{" "}
                      <Text style={{ color: Colors.primary }}>
                        {item.addedBy}
                      </Text>{" "}
                    </Text>
                    <Text style={styles.addedBy}>
                      {" "}
                      / {item.addedByDesignation}{" "}
                    </Text>
                  </View>
                  <View style={styles.lowerSmallRow}>
                    <Text style={styles.addedBy}>
                      {" "}
                      Added In:{" "}
                      <Text style={styles.date}>
                        {" "}
                        {moment(item.addedIn).format("DD/MM/YY hh:mm")}{" "}
                      </Text>{" "}
                    </Text>
                  </View>
                  <View style={styles.lowerSmallRow}>
                    {item.addedIn !== item.updatedIn && (
                      <Text style={styles.addedBy}>
                        {" "}
                        Updated In:{" "}
                        <Text style={styles.date}>
                          {" "}
                          {moment(item.updatedIn).format("DD/MM/YY hh:mm")}{" "}
                        </Text>{" "}
                      </Text>
                    )}
                  </View>
                </View>
                {index === currentIndex && (
                  <ItemSalesDetails
                    sales={item.sales}
                    currencySymbol={item.currencySymbol}
                  />
                )}
                <CheckBox
                  checked={item.sales.every((sale) => sale.isFinal)}
                  title="Set as Final"
                  checkedTitle="Final Version"
                  onPress={() => changeIsFinal(item.sales)}
                  size={30}
                  checkedColor={Colors.primary}
                  uncheckedColor="#000"
                  style={{
                    cursor: "pointer",
                    marginTop: globalHeight("2%"),
                    backgroundColor: "red",
                    elevation: 10,
                  }}
                />
              </View>
            );
          }}
        />
      )}
      {!isOpened && (
        <View style={{ height: globalHeight("10%"), zIndex: -100 }} />
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
});

export default TeamOverview;
