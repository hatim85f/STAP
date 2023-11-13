import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import Colors from "../constants/Colors";
import { isTablet } from "../constants/device";

// build a component to show the month shape in calendar

const MonthShape = (props) => {
  const {
    month,
    targetUnits,
    targetValue,
    currencyCode,
    productPrice,
    phasing,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> {month} </Text>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.title}>
          Target : <Text style={styles.number}> {targetUnits} </Text>
        </Text>
        <Text style={styles.title}>
          Value : <Text style={styles.number}> {targetValue} </Text>{" "}
          {currencyCode}
        </Text>
        <Text style={styles.title}>
          Price : <Text style={styles.number}> {productPrice} </Text>{" "}
          {currencyCode}
        </Text>
        <Text style={styles.title}>
          Phasing : <Text style={styles.number}> {phasing} </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: globalWidth("15%"),
    height: globalHeight("18%"),
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  lowerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
  },
  headerText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: globalWidth("2%"),
    fontStyle: "italic",
  },
  title: {
    fontFamily: "open-sans",
    color: Colors.font,
  },
  number: {
    color: Colors.primary,
    fontFamily: "open-sans",
  },
});

export const MonthShapeOptions = (navData) => {
  return {
    headerTitle: "MonthShape",
  };
};

export default MonthShape;
