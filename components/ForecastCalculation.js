import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import Colors from "../constants/Colors";
import * as Progress from "react-native-progress";

import { Octicons } from "@expo/vector-icons";
import DonutChart from "./charts/DonutChart";

const ForecastCalculation = (props) => {
  const { salesDetails } = props;

  //   =============================================MANAGING STATE=====================================================
  const [salesData, setSalesData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [pressIndex, setPressIndex] = useState(null);
  const [totalSalesValue, setTotalSalesValue] = useState(null);
  const [totalTargetValue, setTotalTargetValue] = useState(null);
  const [selectedSalesData, setSelectedSalesData] = useState([]);
  const [selectedTeamSales, setSelectedTeamSales] = useState(null);
  const [selectedTeamTarget, setSelectedTeamTarget] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setSalesData(salesDetails);
  }, [salesDetails]);

  // =====================================================CALCULATIONS=====================================================

  useEffect(() => {
    if (activeIndex !== null) {
      const selectedTeam = salesData && salesData[activeIndex];
      const teamSales = selectedTeam.salesData;
      setSelectedSalesData(teamSales);

      const teamTargetValue = selectedTeam.totalTargetValue;
      const teamSalesValue = selectedTeam.totalSalesValue;

      setSelectedTeamSales(teamSalesValue);
      setSelectedTeamTarget(teamTargetValue);
    }

    const salesValues = salesData
      .map((item) => item.totalSalesValue)
      .reduce((a, b) => a + b, 0);
    const targetValues = salesData
      .map((item) => item.totalTargetValue)
      .reduce((a, b) => a + b, 0);

    setTotalTargetValue(targetValues);
    setTotalSalesValue(salesValues);

    setTimeout(() => {
      setShowDetails(true);
    }, 1000);
  }, [activeIndex, salesData]);

  //   =====================================================PRESSING EFFECTS=====================================================

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    setPressIndex(null);
  };

  //   =========================================================ANIMATIONS========================================================

  const containerWidth = useRef(new Animated.Value(0)).current;
  const containerHeight = useRef(new Animated.Value(0)).current;

  const interpolateWidth = containerWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, globalWidth("72.5%")],
  });

  const interpolateHeight = containerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, globalHeight("80%")],
  });

  const containerStyle = {
    width: interpolateWidth,
    height: interpolateHeight,
    transform: [
      { translateX: containerWidth },
      { translateY: containerHeight },
    ],
  };

  const showItemsIn = () => {
    Animated.timing(containerWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(containerHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const showItemsOut = () => {
    setShowDetails(false);
    Animated.timing(containerHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(containerWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const changeIndex = (index) => {
    if (index === activeIndex) {
      showItemsOut();
      setTimeout(() => {
        setActiveIndex(null);
      }, 610);
    } else {
      setActiveIndex(index);
      showItemsIn();
    }
  };

  // ===================================================LIST ITEM COMPONENT=====================================================

  const dotColor = (achievement) => {
    if (achievement < 25) {
      return "#ff0055";
    } else if (achievement > 20 && achievement < 60) {
      return "#ffaa00";
    } else if (achievement > 60 && achievement < 100) {
      return "#00ff55";
    } else if (achievement > 100) {
      return "#00ff55";
    }
  };

  const changeSalesValue = (text, index) => {
    let newSelectedSalesData = [...selectedSalesData];
    newSelectedSalesData[index].quantity = parseInt(text);
    newSelectedSalesData[index].salesValue =
      parseInt(text) * newSelectedSalesData[index].price;
    newSelectedSalesData[index].achievement = parseInt(
      ((parseInt(text) * newSelectedSalesData[index].price) /
        newSelectedSalesData[index].targetValue) *
        100
    );

    setSelectedSalesData(newSelectedSalesData.map((a) => a));

    let newSalesData = [...salesData];
    newSalesData[activeIndex].salesData = newSelectedSalesData;

    const newSalesValue = newSelectedSalesData
      .map((a) => a.salesValue)
      .reduce((a, b) => a + b, 0);
    newSalesData[activeIndex].totalSalesValue = newSalesValue;

    const salesValues = salesData
      .map((item) => item.totalSalesValue)
      .reduce((a, b) => a + b, 0);
    const targetValues = salesData
      .map((item) => item.totalTargetValue)
      .reduce((a, b) => a + b, 0);

    setTotalTargetValue(targetValues);
    setTotalSalesValue(salesValues);

    const selectedTeam = salesData && salesData[activeIndex];
    const teamSales = selectedTeam.salesData;
    setSelectedSalesData(teamSales);

    const teamTargetValue = selectedTeam.totalTargetValue;
    const teamSalesValue = selectedTeam.totalSalesValue;

    setSelectedTeamSales(teamSalesValue);
    setSelectedTeamTarget(teamTargetValue);
  };

  console.log(salesData, "salesData");

  //   =====================================================RENDERING COMPONENTS=====================================================

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.itemContainer,
            {
              width: salesData.length * globalWidth("7%") + 10,
              maxWidth: globalWidth("72%"),
            },
          ]}
        >
          {salesData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  changeIndex(index);
                }}
                activeOpacity={0.7}
                onPressIn={handleTouchStart}
                onPressOut={handleTouchEnd}
                key={index}
                style={[
                  styles.buttonContainer,
                  pressIndex === index && styles.buttonPressed,
                ]}
              >
                <Image
                  source={{ uri: item.businessLogo }}
                  style={styles.image}
                />
                <Text style={styles.name}> {item.businessName} </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {activeIndex !== null && (
          <Animated.View style={[styles.dataContainer, containerStyle]}>
            <View style={styles.listContainer}>
              {selectedSalesData &&
                selectedSalesData.length > 0 &&
                showDetails && (
                  <FlatList
                    data={selectedSalesData}
                    style={{
                      maxHeight: globalHeight("78%"),
                      flex: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    scrollEventThrottle={16}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={styles.itemListContainer}>
                          <View style={styles.listRow}>
                            <View
                              style={[
                                styles.smallContainer,
                                {
                                  width: "40%",
                                },
                              ]}
                            >
                              <Octicons
                                name="dot-fill"
                                size={globalWidth("2.5%")}
                                color={dotColor(item.achievement)}
                              />
                              <Text style={styles.itemListName}>
                                {" "}
                                {item.productNickName}{" "}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.smallContainer,
                                {
                                  width: "60%",
                                },
                              ]}
                            >
                              <Input
                                style={styles.input}
                                defaultValue={item.quantity}
                                onChangeText={(text) =>
                                  changeSalesValue(text, index)
                                }
                                containerStyle={styles.containerInput}
                              />
                              <Text style={styles.percentValue}>
                                {" "}
                                / {parseInt(item.targetUnits).toFixed(0)}{" "}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.barContainer}>
                            <Progress.Bar
                              progress={parseFloat(item.achievement / 100)}
                              width="80%"
                              height={globalHeight("1.5%")}
                              color={dotColor(item.achievement)}
                              style={{
                                borderRadius: 50,
                                borderWidth: 0,
                                marginTop: globalHeight("1.5%"),
                                alignSelf: "center",
                              }}
                            />
                            <Text style={styles.percentValue}>
                              {" "}
                              {isNaN(item.achievement)
                                ? 0
                                : parseFloat(item.achievement).toFixed(0)}{" "}
                              %{" "}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                )}
            </View>
            <View style={styles.chartContainer}>
              <View style={styles.donutContainer}>
                <DonutChart
                  salesValue={totalSalesValue}
                  targetValue={totalTargetValue}
                />
                <Text style={styles.mainName}> Total </Text>
              </View>
              <View style={styles.donutContainer}>
                <DonutChart
                  salesValue={selectedTeamSales}
                  targetValue={selectedTeamTarget}
                  changed
                />
                <Text style={styles.mainName}>
                  {" "}
                  {salesData[activeIndex].businessName}{" "}
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
    paddingTop: globalHeight("5%"),
  },
  itemContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: Colors.font,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: Colors.font,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    width: globalWidth("7%"),
  },
  image: {
    width: globalWidth("4%"),
    height: globalWidth("4%"),
    borderRadius: globalWidth("2%"),
    borderColor: Colors.primary,
    borderWidth: 1,
    resizeMode: "contain",
  },
  name: {
    fontSize: globalHeight("1.6%"),
    color: Colors.font,
    fontFamily: "HelveticaNeue",
    fontStyle: "italic",
    marginTop: 5,
    textAlign: "center",
  },
  buttonPressed: {
    boxShadow: "0 0px #666",
    transform: "translateY(4px)",
  },
  dataContainer: {
    backgroundColor: Colors.haizyColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    shadowColor: Colors.font,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderColor: Colors.font,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: {
    width: "48%",
    maxHeight: globalHeight("80%"),
  },
  chartContainer: {
    width: "48%",
  },
  itemListContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  barContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  input: {
    width: globalWidth("5%"),
    height: globalHeight("3%"),
    borderWidth: 1,
    borderColor: Colors.font,
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
    fontFamily: "HelveticaNeue",
    color: Colors.font,
    fontSize: globalWidth("1%"),
    fontStyle: "italic",
  },
  containerInput: {
    width: "50%",
    height: globalHeight("3%"),
    padding: 0,
  },
  smallContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemListName: {
    marginLeft: globalWidth("1%"),
    fontFamily: "HelveticaNeue",
    color: Colors.font,
    fontSize: globalWidth("1.%"),
    fontStyle: "italic",
    fontWeight: "bold",
  },
  percentValue: {
    fontFamily: "numbers",
    color: Colors.font,
    fontSize: globalWidth("1.%"),
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: globalHeight("1%"),
  },
  donutContainer: {
    backgroundColor: "white",
    shadowColor: Colors.font,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderColor: Colors.font,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mainName: {
    fontFamily: "HelveticaNeue",
    color: Colors.font,
    fontSize: globalWidth("1.%"),
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: globalHeight("1%"),
  },
});

export const ForecastCalculationOptions = (navData) => {
  return {
    headerTitle: "ForecastCalculation",
  };
};

export default ForecastCalculation;
