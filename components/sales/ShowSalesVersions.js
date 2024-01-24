import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import numberWithCommas from "../helpers/numberWithComa";
import moment from "moment";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import ItemSalesDetails from "../team/teamSales/ItemSalesDetails";

import * as salesActions from "../../store/sales/salesActions";

const ShowSalesVersions = (props) => {
  const {
    isOpened,
    salesVersions,
    getIsLoading,
    getLoadingMessage,
    showCheckTotal,
    monthNumber,
    year,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const dispatch = useDispatch();

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

  // ===============================================DELETE SALES VERSION========================================================

  const deleteSalesVersion = (versionName) => {
    setIsLoading(true);
    const salesVersion = salesVersions.find(
      (version) => version.versionName === versionName
    );

    setLoadingMessage("Deleting Sales Version");

    const salesIds = salesVersion.sales.map((sale) => sale.userSalesId);

    dispatch(salesActions.deleteSalesVersion(salesIds)).then(() => {
      setIsLoading(false);
    });
    setIsLoading(false);
  };

  // ========================================================CHANGE IS FINAL===================================================

  const changeIsFinal = (items) => {
    const userSalesIds = items.map((item) => item.userSalesId);
    const userIds = items.map((item) => item.userId);

    const selectedYear = window.localStorage.getItem("selectedYear");

    setIsLoading(true);
    setLoadingMessage("Updating Sales Versions");
    dispatch(salesActions.changeIsFinal(userSalesIds, userIds));
    dispatch(salesActions.getSalesVersions(monthNumber, selectedYear)).then(
      () => {
        setIsLoading(false);
      }
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getIsLoading(isLoading);
    getLoadingMessage(loadingMessage);
  }, [isLoading]);

  //   ========================================================RENDERING===================================================

  return (
    <View style={styles.container}>
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
              <View style={[styles.dataMainContainer]}>
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
                      {numberWithCommas(item.totalTargetValue.toFixed(0))}
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
                    month={monthNumber}
                    year={year}
                  />
                )}
                <View style={styles.rowContainer}>
                  <View style={{ width: "80%" }}>
                    {showCheckTotal && (
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
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteSalesVersion(item.versionName)}
                    style={{ width: "5%" }}
                  >
                    <MaterialIcons
                      name="delete-sweep"
                      size={globalWidth("3%")}
                      color="#ff0055"
                    />
                  </TouchableOpacity>
                </View>
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

export const ShowSalesVersionsOptions = (navData) => {
  return {
    headerTitle: "ShowSalesVersions",
  };
};

export default ShowSalesVersions;
