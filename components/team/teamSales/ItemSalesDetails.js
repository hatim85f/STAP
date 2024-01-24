import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Easing,
  Animated,
} from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import numberWithComa from "../../helpers/numberWithComa";
import { Entypo } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import Colors from "../../../constants/Colors";
import TableComp from "../../TableComp";
import { Table, Row, Rows } from "react-native-table-component";

import * as salesActions from "../../../store/sales/salesActions";

const ItemSalesDetails = (props) => {
  const { sales, currencySymbol, monthNumber, year } = props;

  const [salesData, setSalesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showEditContainer, setShowEditContainer] = useState(false);

  const editontainerPosition = useRef(
    new Animated.Value(globalWidth("200%"))
  ).current;

  useEffect(() => {
    let itemSales = [];
    let itemTargets = [];

    if (sales && sales.length > 0) {
      const salesDetails = sales.map((item) => {
        const totalSales = item.salesData
          .map((a) => a.salesValue)
          .reduce((a, b) => a + b, 0);
        const targetData = item.salesData.map((a) => a.targetValue);
        const targetValuesData = targetData.reduce((a, b) => a + b, 0);
        itemTargets.push({
          userName: item.userName,
          targetValuesData,
          targetData,
        });
        const totalTarget = item.salesData
          .map((a) => a.targetValue)
          .reduce((a, b) => a + b, 0);

        return {
          userId: item.userId,
          userSalesId: item.userSalesId,
          userName: item.userName,
          designation: item.designation,
          salesData: item.salesData.sort((a, b) =>
            a.productNickName > b.productNickName ? 1 : -1
          ),
          totalSales: totalSales.toFixed(2),
          totalTarget: totalTarget.toFixed(2),
          achievement: (totalSales / totalTarget) * 100,
          profilePicture: item.profilePicture,
          isFinal: item.isFinal,
        };
      });

      setSalesData(salesDetails);
    }
  }, [sales]);

  console.log(salesData);

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

  // ==========================================================PREPARING FOR TABLE=============================================================

  const header = [
    "#",
    "Product",
    "Target Unit",
    "Target Value",
    "Sales Unit",
    "Sales Value",
    "Achievement",
  ];

  const widthArr = [
    globalWidth("2.5%"),
    globalWidth("15%"),
    globalWidth("8%"),
    globalWidth("8%"),
    globalWidth("8%"),
    globalWidth("8%"),
    globalWidth("10%"),
  ];

  // ================================================================ANIMATING EDIT BUTTONS=====================================================

  useEffect(() => {
    if (showEditContainer) {
      Animated.timing(editontainerPosition, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(editontainerPosition, {
        toValue: -globalWidth("200%"),
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showEditContainer]);

  const changeQuantity = (num, index) => {
    setShowEditContainer(true);
    let newSalesData = [...salesData];
    const item = newSalesData[currentIndex].salesData[index];

    if (num === "") {
      return;
    } else {
      item.quantity = parseInt(num);
      item.salesValue = item.quantity * item.price;
      item.achievement = (item.salesValue / item.targetValue) * 100;
      const personSales = newSalesData[currentIndex].salesData
        .map((a) => a.salesValue)
        .reduce((a, b) => a + b, 0);
      newSalesData[currentIndex].totalSales = parseInt(personSales).toFixed(1);
      newSalesData[currentIndex].achievement =
        (personSales / newSalesData[currentIndex].totalTarget) * 100;
    }

    setSalesData(newSalesData);
  };

  const dispatch = useDispatch();

  const updateSalesData = (userSalesId, index) => {
    dispatch(salesActions.editSalesData(userSalesId, salesData[currentIndex]));
    setCurrentIndex(null);
    setShowEditContainer(false);
  };

  const changeSinlgeIsFinal = (userSalesId, userId) => {
    dispatch(
      salesActions.changeSingleIsFinal(userSalesId, userId, monthNumber, year)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {salesData && salesData.length > 0 && (
          <View
            style={[
              styles.salesContainer,
              { backgroundColor: Colors.primary, height: globalHeight("2.5%") },
            ]}
          >
            <View style={{ width: "5%" }}>
              <Text style={[styles.number, { color: "white" }]}> # </Text>
            </View>
            <View
              style={[
                {
                  width: "40%",
                  alignItems: "flex-start",
                },
              ]}
            >
              <Text
                style={[
                  styles.name,
                  {
                    color: "white",
                    textDecorationLine: "none",
                    marginLeft: globalWidth("3%"),
                  },
                ]}
              >
                {" "}
                Member{" "}
              </Text>
            </View>
            <View style={{ width: "15%" }}>
              <Text style={[styles.salesData, { color: "white" }]}>
                {" "}
                Sales{" "}
              </Text>
            </View>
            <View style={{ width: "15%" }}>
              <Text style={[styles.salesData, { color: "white" }]}>
                {" "}
                Target{" "}
              </Text>
            </View>
            <View style={[styles.smallRow, { width: "15%" }]}>
              <Text style={[styles.achievement, { color: "white" }]}>
                {" "}
                Achievement{" "}
              </Text>
            </View>
            <View style={[styles.smallRow, { width: "10%" }]}>
              <Text style={[styles.achievement, { color: "white" }]}>
                {" "}
                Status{" "}
              </Text>
            </View>
          </View>
        )}
        {salesData &&
          salesData.length > 0 &&
          salesData.map((item, index) => {
            return (
              <View style={styles.mainItemContainer} key={index}>
                <View
                  style={[styles.salesContainer, styles.lowerSalesContainer]}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={styles.number}> {index + 1}) </Text>
                  </View>
                  <View
                    style={[
                      styles.smallRow,
                      {
                        width: "38%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "15%",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.profilePicture }}
                        style={styles.image}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setCurrentIndex(index === currentIndex ? null : index)
                      }
                      style={{
                        width: "85%",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.name}> {item.userName} </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "15%" }}>
                    <Text style={styles.salesData}>
                      {" "}
                      {currencySymbol} {numberWithComa(item.totalSales)}{" "}
                    </Text>
                  </View>
                  <View style={{ width: "15%" }}>
                    <Text style={styles.salesData}>
                      {" "}
                      {currencySymbol} {numberWithComa(item.totalTarget)}{" "}
                    </Text>
                  </View>
                  <View style={[styles.smallRow, { width: "15%" }]}>
                    <AchievementArrow achievement={item.achievement} />
                    <Text style={styles.achievement}>
                      {" "}
                      {item.achievement.toFixed(2)} %{" "}
                    </Text>
                  </View>
                  <View style={{ width: "10%", alignItems: "center" }}>
                    <CheckBox
                      checked={item.isFinal}
                      checkedColor={Colors.primary}
                      onPress={() =>
                        changeSinlgeIsFinal(item.userSalesId, item.userId)
                      }
                      title={item.isFinal ? "Final" : "Not Final"}
                    />
                  </View>
                </View>
                {index === currentIndex && (
                  <View style={styles.tableContainer}>
                    <Table
                      borderStyle={{
                        borderWidth: 2,
                        borderColor: Colors.primary,
                        borderRadius: 10,
                      }}
                      widthArr={widthArr}
                    >
                      <Row
                        data={header}
                        style={[
                          styles.head,
                          { backgroundColor: Colors.haizyColor },
                        ]}
                        textStyle={styles.text}
                        widthArr={widthArr}
                      />
                      {item.salesData.map((rowData, index) => {
                        return (
                          <Row
                            key={index}
                            data={[
                              index + 1,
                              rowData.productNickName,
                              numberWithComa(rowData.targetUnits.toFixed(0)),
                              numberWithComa(rowData.targetValue.toFixed(2)),
                              <Input
                                style={styles.input}
                                containerStyle={styles.inputContainer}
                                onChangeText={(num) =>
                                  changeQuantity(num, index)
                                }
                                keyboardType="numeric"
                                value={rowData.quantity.toString()}
                                defaultValue={rowData.quantity.toString()}
                              />,
                              numberWithComa(rowData.salesValue.toFixed(2)),
                              <View style={styles.smallRow}>
                                <AchievementArrow
                                  achievement={rowData.achievement}
                                />
                                <Text style={styles.achievement}>
                                  {rowData.achievement.toFixed(2) + "%"}
                                </Text>
                              </View>,
                            ]}
                            style={[
                              styles.rows,
                              {
                                backgroundColor:
                                  index % 2 === 0
                                    ? Colors.lightBG
                                    : Colors.white,
                              },
                            ]}
                            textStyle={styles.text}
                            widthArr={widthArr}
                          />
                        );
                      })}
                    </Table>
                    <Animated.View
                      style={[
                        styles.editButtonsContainer,
                        { transform: [{ translateX: editontainerPosition }] },
                      ]}
                    >
                      <Button
                        title="Cancel"
                        onPress={() => setShowEditContainer(false)}
                        buttonStyle={styles.editBtn}
                        titleStyle={styles.titleStyle}
                      />
                      <Button
                        title="Submit Edit"
                        onPress={() => updateSalesData(item.userSalesId, index)}
                        buttonStyle={styles.editBtn}
                        titleStyle={styles.titleStyle}
                      />
                    </Animated.View>
                  </View>
                )}
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
  mainItemContainer: {
    width: "100%",
    marginVertical: globalHeight("1%"),
    borderBottomColor: Colors.haizyColor,
    borderBottomWidth: 1.5,
    paddingBottom: globalHeight("1.5%"),
  },
  salesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: globalHeight("1%"),
    width: "90%",
    alignSelf: "center",
    borderRadius: 4,
    paddingHorizontal: globalWidth("0.5%"),
  },
  number: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
  },
  smallRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    height: globalWidth("3%"),
    width: globalWidth("3%"),
    borderRadius: globalWidth("1.5%"),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
    marginLeft: globalWidth("1%"),
    color: Colors.font,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: Colors.primary,
  },
  salesData: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
  },
  achievement: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
  },
  lowerSalesContainer: {
    marginVertical: 0,
    marginTop: globalHeight("1.5%"),
  },
  tableContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: globalHeight("1%"),
    marginBottom: globalHeight("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  rows: {
    justifyContent: "center",
    height: globalHeight("7.5%"),
    overflow: "visible",
    elevation: 10,
    zIndex: 1000,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
  },
  head: {
    height: globalHeight("5%"),
    // justifyContent: "center",
  },
  mainInputContainer: {
    width: globalWidth("4%"),
    height: globalHeight("4%"),
    marginVertical: globalHeight("1%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  input: {
    width: globalWidth("4%"),
    height: globalHeight("4%"),
    alignSelf: "center",
    marginVertical: globalHeight("1%"),
    fontSize: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    alignSelf: "center",
  },
  inputContainer: {
    width: globalWidth("4%"),
    height: globalHeight("5%"),
    marginVertical: globalHeight("1%"),
    alignSelf: "center",
  },
  editButtonsContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: globalHeight("1.5%"),
    paddingVertical: globalHeight("1.5%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  editBtn: {
    backgroundColor: Colors.primary,
    width: globalWidth("10%"),
    borderRadius: 10,
  },
  titleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: globalWidth("0.8%"),
    color: "white",
  },
});

export default ItemSalesDetails;
