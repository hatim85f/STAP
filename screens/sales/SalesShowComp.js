import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
  Platform,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Card from "../../components/Card";

import numberWithComa from "../../components/helpers/numberWithComa";
import AnimatedChevron from "../../components/AnimatedChevron";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import * as salesActions from "../../store/sales/salesActions";
import * as authActions from "../../store/auth/authActions";
import Loader from "../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SalesShowComp = (props) => {
  const { startDate, endDate } = props;

  const { sales } = useSelector((state) => state.sales);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [updateSales, setUpdateSales] = useState(true);

  const dispatch = useDispatch();

  const changeSalesFinal = async (id) => {
    setIsLoading(true);
    setLoadingMessage("Changing Sales Final Status");
    const start = await AsyncStorage.getItem("startDate");
    const end = await AsyncStorage.getItem("endDate");

    dispatch(salesActions.setIsFinal(id));
    setUpdateSales(true);
  };

  console.log(startDate, endDate);

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

  const gettingSales = async () => {
    const start = await AsyncStorage.getItem("startDate");
    const end = await AsyncStorage.getItem("endDate");

    dispatch(salesActions.getSales(start, end)).then(() => {
      setIsLoading(false);
    });
    setUpdateSales(false);
  };

  useEffect(() => {
    if (updateSales) {
      gettingSales();
    }
  }, [updateSales]);

  const openSales = (id) => {
    if (currentIndex === null) {
      dispatch(salesActions.openSales(id));
    }
  };

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.container}>
      {sales && sales.length > 0 && (
        <FlatList
          data={sales}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex(index === currentIndex ? null : index);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  openSales(item._id);
                }}
              >
                <Text style={styles.number}> {index + 1}) </Text>
                <Card style={styles.card}>
                  <View
                    style={[
                      styles.cardView,
                      {
                        borderBottomWidth: index === currentIndex ? 1 : 0,
                      },
                    ]}
                  >
                    <Text style={styles.cardName}>
                      {" "}
                      <Text style={{ color: Colors.font, fontStyle: "italic" }}>
                        Added in:{" "}
                      </Text>{" "}
                      {moment(item.addedIn).format("DD/MM/YY")}{" "}
                    </Text>
                    <Text style={styles.number}>
                      {" "}
                      {numberWithComa(
                        +parseFloat(item.totalValue).toFixed(2)
                      )}{" "}
                      {item.currencySymbol}{" "}
                    </Text>
                    <AnimatedChevron isOpen={index === currentIndex} />
                  </View>
                  <View style={styles.versionContainer}>
                    <Text style={styles.cardName}> {item.version} </Text>
                  </View>
                  {currentIndex === index && (
                    <View style={styles.salesContainer}>
                      <View
                        style={[
                          styles.details,
                          { marginTop: globalHeight("1.5%") },
                        ]}
                      >
                        <View style={styles.itemContainer}>
                          <Text
                            style={[
                              styles.itemHeader,
                              { color: Colors.primary, fontFamily: "headers" },
                            ]}
                          >
                            Date
                          </Text>
                        </View>
                        <View style={styles.itemDetails}>
                          <Text
                            style={[
                              styles.itemHeader,
                              { color: Colors.primary, fontFamily: "headers" },
                            ]}
                          >
                            Item
                          </Text>
                        </View>
                        <View style={styles.itemDetails}>
                          <Text
                            style={[
                              styles.itemHeader,
                              { color: Colors.primary, fontFamily: "headers" },
                            ]}
                          >
                            Client
                          </Text>
                        </View>
                        <View style={styles.itemContainer}>
                          <Text
                            style={[
                              styles.itemHeader,
                              { color: Colors.primary, fontFamily: "headers" },
                            ]}
                          >
                            Quantity
                          </Text>
                        </View>
                        <View style={styles.itemContainer}>
                          <Text
                            style={[
                              styles.itemHeader,
                              { color: Colors.primary, fontFamily: "headers" },
                            ]}
                          >
                            Value
                          </Text>
                        </View>
                      </View>
                      {item.salesData.map((sale, indx) => {
                        return (
                          <View style={styles.details} key={indx}>
                            <View style={styles.itemContainer}>
                              <Text style={styles.itemHeader}>
                                {moment(sale.date).format("DD/MM/YY")}{" "}
                              </Text>
                            </View>
                            <View style={styles.itemDetails}>
                              <Text style={styles.itemHeader}>
                                {sale.productName}
                              </Text>
                            </View>
                            <View style={styles.itemDetails}>
                              <Text style={styles.itemHeader}>
                                {sale.clientName}{" "}
                              </Text>
                            </View>
                            <View style={styles.itemContainer}>
                              <Text style={styles.itemHeader}>
                                {sale.discountType === "Fixed"
                                  ? sale.totalQuantity
                                  : sale.quantity +
                                    "+" +
                                    (sale.totalQuantity - sale.quantity)}
                              </Text>
                            </View>
                            <View style={styles.itemContainer}>
                              <Text style={styles.itemHeader}>
                                {numberWithComa(
                                  +parseFloat(sale.itemValue).toFixed(2)
                                )}{" "}
                                {item.currencySymbol}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                  <View style={styles.finalDetails}>
                    <CheckBox
                      checked={item.isFinal}
                      checkedColor={Colors.primary}
                      size={globalWidth("2%")}
                      style={styles.check}
                      uncheckedColor={Colors.haizyColor}
                      onPress={() => changeSalesFinal(item._id)}
                      title="Is Final ?"
                      checkedTitle="Final"
                      containerStyle={styles.checkContainer}
                      textStyle={[
                        styles.checkText,
                        {
                          color: item.isFinal ? Colors.primary : Colors.font,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.textDetails}>
                    {" "}
                    Added In:{" "}
                    <Text style={styles.data}>
                      {moment(item.addedIn).format("DD/MM/YY hh:mm")}{" "}
                    </Text>{" "}
                    By: <Text style={styles.data}> {item.addedByName} </Text>{" "}
                  </Text>
                  <Text style={styles.textDetails}>
                    {" "}
                    Last Opened:{" "}
                    <Text style={styles.data}>
                      {moment(item.lastOpened).format("DD/MM/YY hh:mm")}{" "}
                    </Text>{" "}
                    By: <Text style={styles.data}> {item.openedWith} </Text>{" "}
                  </Text>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      )}
      <View style={{ height: globalHeight("15%") }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    maxHeight: globalHeight("80%"),
    minHeight: globalHeight("80%"),
    width: "85%",
    alignSelf: "center",
    paddingTop: globalHeight("2%"),
  },
  number: {
    fontFamily: "numbers",
    fontSize: globalWidth("1.2%"),
    color: Colors.font,
    marginTop: globalHeight("1.5%"),
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: globalWidth("2%"),
    marginVertical: globalWidth("0.25%"),
    borderBottomColor: Colors.font,
  },
  cardName: {
    fontFamily: "headers",
    color: Colors.primary,
    fontSize: globalWidth("1.2%"),
  },
  salesContainer: {
    width: "95%",
    alignSelf: "center",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: globalHeight("1.5%"),
  },
  itemDetails: {
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  itemHeader: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "Helvetica",
    color: Colors.font,
    textAlign: "center",
  },
  card: {
    padding: 10,
    paddingBottom: 20,
  },
  finalDetails: {
    width: "95%",
    alignSelf: "center",
    alignItems: "flex-end",
  },
  checkContainer: {
    backgroundColor: "transparent",
    borderColor: Colors.primary,
    borderWidth: 2.5,
    borderRadius: 10,
    width: globalWidth("10%"),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: globalHeight("1.5%"),
    marginTop: globalHeight("1.5%"),
  },
  checkText: {
    fontFamily: "headers",
    fontSize: globalWidth("0.8%"),
  },
  textDetails: {
    fontFamily: "Helvetica",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
    fontStyle: "italic",
  },
  data: {
    color: Colors.primary,
  },
  versionContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
    paddingVertical: globalHeight("1%"),
  },
});

export const SalesShowCompOptions = (navData) => {
  return {
    headerTitle: "SalesShowComp",
  };
};

export default SalesShowComp;
